document.addEventListener("DOMContentLoaded", () => {
	// Get logged-in admin's ID from session storage
	const adminId = sessionStorage.getItem("adminId");

	// Redirect to login if no session
	if (!adminId) {
		window.location.href = "login.html";
		return; // Important: Stop further execution
	}

	const body = document.getElementById("mainContent");

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
                        <button class="edit-btn" id="editButton" data-student-id="${student_id}">Edit</button>
                        <button class="delete-btn" id="openDeleteModal" data-student-id="${student_id}">Delete</button>
                    </td>
                </tr>
            `
				)
				.join("");

			body.classList.remove("hidden");

			const deleteButton = document.getElementById("openDeleteModal");
			const deleteModal = document.getElementById("deleteModal");
			deleteButton.addEventListener("click", () => {
				deleteModal.showModal();
				const cancelButton = document.getElementById("cancelDelete");

				cancelButton.addEventListener("click", () => {
					deleteModal.close();
				});

				const studentId = deleteButton.getAttribute("data-student-id");

				const confirmButton = document.getElementById("confirmDelete");
				confirmButton.addEventListener("click", async () => {
					try {
						const response = await fetch(
							`http://localhost:3001/api/students/${studentId}`,
							{
								method: "DELETE",
							}
						);
						if (!response.ok) {
							throw new Error("Failed to delete student");
						}
						deleteModal.close();
						loadStudents();
					} catch (error) {
						console.error("Error:", error);
						alert("Failed to delete student");
					}
				});
			});
		} catch (error) {
			console.error("Error:", error);
			alert("Failed to load student data");
			// window.location.href = "login.html"; // Redirect on error also
			return;
		}
	}

	// Initial render
	loadStudents();

	document.getElementById("logoutButton").addEventListener("click", () => {
		sessionStorage.removeItem("adminId");
		window.location.href = "login.html";
	});
});
