document.addEventListener("DOMContentLoaded", () => {
	// Get logged-in admin's ID from session storage
	const adminId = sessionStorage.getItem("adminId");

	// Redirect to login if no session
	if (!adminId) {
		window.location.href = "login.html";
		return; // Important: Stop further execution
	}

	async function loadStudents() {
		try {
			const studentData = await fetch(
				"http://localhost:3001/api/students"
			);
			if (!studentData.ok) throw new Error("Failed to load data");
			const students = await studentData.json();

			const tbody = document.getElementById("studentsList");
			tbody.innerHTML = students
				.map(
					({
						student_id,
						first_name,
						middle_name,
						last_name,
						email,
						course,
						year_level,
					}) => `
                <tr>
                    <td><strong>${student_id}</strong></td>
                    <td>${last_name}, ${first_name} ${middle_name}</td>
                    <td>${email}</td>
                    <td>${course.toUpperCase()}</td>
                    <td>Year ${year_level}</td>
                    <td class="action-buttons">
                        <button class="edit-btn" onclick="openEditModal(${student_id})">Edit</button>
                        <button class="delete-btn" onclick="deleteStudent(${student_id})">Delete</button>
                    </td>
                </tr>
            `
				)
				.join("");
		} catch (error) {
			console.error("Error:", error);
			alert("Failed to load student data");
			// window.location.href = "login.html"; // Redirect on error also
			return;
		}
	}

	// Modal handling
	function openEditModal(studentId) {
		const student = student.find((s) => s.id === studentId);
		if (student) {
			document.getElementById("editName").value = student.name;
			document.getElementById("editEmail").value = student.email;
			document.getElementById("editCourse").value = student.course;
			document.getElementById("editYear").value = student.year_level;
			document.getElementById("editModal").style.display = "block";
		}
	}

	function closeEditModal() {
		document.getElementById("editModal").style.display = "none";
	}

	// Event listeners
	document
		.querySelector(".cancel-btn")
		.addEventListener("click", closeEditModal);
	document.querySelector(".save-btn").addEventListener("click", () => {
		// Handle save logic here
		closeEditModal();
	});

	// Initial render
	loadStudents();

	document.getElementById("logoutButton").addEventListener("click", () => {
		sessionStorage.removeItem("adminId");
		window.location.href = "login.html";
	});
});
