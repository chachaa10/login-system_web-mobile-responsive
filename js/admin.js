document.addEventListener("DOMContentLoaded", () => {
	const adminId = sessionStorage.getItem("adminId");
	if (!adminId) {
		location.href = "login.html";
		return;
	}

	const body = document.getElementById("mainContent");
	const tbody = document.getElementById("studentsList");

	async function loadStudents() {
		const res = await fetch("http://localhost:3001/api/students");
		const students = res.ok ? await res.json() : [];

		if (!students.length) {
			tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center" class="no-data">No data</td>
        </tr>
      `;
			body.classList.remove("hidden");
			return;
		}

		tbody.innerHTML = students
			.map((s) => {
				const student_id = s.student_id ?? "No data";
				const first_name = s.first_name ?? "No data";
				const middle_name = s.middle_name ?? "";
				const last_name = s.last_name ?? "No data";
				const email = s.email ?? "No data";
				const course = s.course ? s.course.toUpperCase() : "No data";
				const year_level =
					s.year_level === 4
						? "4th Year"
						: s.year_level === 3
						? "3rd Year"
						: s.year_level === 2
						? "2nd Year"
						: s.year_level === 1
						? "1st Year"
						: "No data";
				return `
          <tr>
            <td><strong>${student_id}</strong></td>
            <td>${last_name}, ${first_name} ${
					middle_name ? " " + middle_name : ""
				}</td>
            <td>${email}</td>
            <td>${course}</td>
            <td>${year_level}</td>
            <td class="action-buttons">
              <button class="edit-btn"   data-student-id="${student_id}">Edit</button>
              <button class="delete-btn" data-student-id="${student_id}">Delete</button>
            </td>
          </tr>
        `;
			})
			.join("");

		body.classList.remove("hidden");
	}

	// Search Filter
	searchInput.addEventListener("input", () => {
		const term = searchInput.value.trim().toLowerCase();
		const keywords = term.split(/\s+/); // split by space

		const old = tbody.querySelector(".no-data");
		if (old) old.remove();

		const rows = tbody.querySelectorAll("tr");
		if (!term) {
			rows.forEach((r) => (r.style.display = ""));
			return;
		}

		let anyVisible = false;
		rows.forEach((row) => {
			const text = row.textContent.toLowerCase();
			const matchesAll = keywords.every((kw) => text.includes(kw));

			if (matchesAll) {
				row.style.display = "";
				anyVisible = true;
			} else {
				row.style.display = "none";
			}
		});

		if (!anyVisible) {
			tbody.insertAdjacentHTML(
				"beforeend",
				`
      <tr>
        <td colspan="6" class="no-data" style="text-align:center">
          No matching records
        </td>
      </tr>
    `
			);
		}
	});

	// delegate delete clicks
	tbody.addEventListener("click", (e) => {
		if (!e.target.classList.contains("delete-btn")) return;
		const studentId = e.target.dataset.studentId;
		const deleteModal = document.getElementById("deleteModal");
		deleteModal.showModal();

		document.getElementById("cancelDelete").onclick = () => {
			deleteModal.close();
		};
		document.getElementById("confirmDelete").onclick = async () => {
			const resp = await fetch(
				`http://localhost:3001/api/students/${studentId}`,
				{ method: "DELETE" }
			);
			if (resp.ok) {
				deleteModal.close();
				loadStudents();
			} else {
				console.error("Delete failed", resp.status);
			}
		};
	});

	document.getElementById("logoutButton").addEventListener("click", () => {
		sessionStorage.removeItem("adminId");
		location.href = "login.html";
	});

	loadStudents();
});
