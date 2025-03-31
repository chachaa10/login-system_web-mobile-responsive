document.addEventListener("DOMContentLoaded", () => {
	const mainContent = document.getElementById("mainContent");

	// Get logged-in student's ID from session storage
	const studentId = sessionStorage.getItem("studentId");

	// Redirect to login if no session
	if (!studentId) {
		window.location.href = "login.html";
		return; // Important: Stop further execution
	}

	// Fetch student data
	async function loadStudentData() {
		try {
			const response = await fetch(
				`http://localhost:3001/api/students/${studentId}`
			);
			if (!response.ok) throw new Error("Failed to load data");

			const student = await response.json();

			// Populate data
			document.getElementById(
				"studentName"
			).textContent = `${student.first_name} ${student.middle_name} ${student.last_name}`;
			document.getElementById("studentId").textContent =
				student.student_id;
			document.getElementById("studentEmail").textContent = student.email;
			document.getElementById("studentCourse").textContent =
				student.course;
			document.getElementById("studentYear").textContent =
				student.year_level;
			document.getElementById("studentMobile").textContent =
				student.mobile_number;

			// Remove the hidden class after successful data loading
			mainContent.classList.remove("hidden");
		} catch (error) {
			console.error("Error:", error);
			alert("Failed to load student data");
			window.location.href = "login.html"; // Redirect on error also
		}
	}

	// Load data when page loads
	loadStudentData();

	document.getElementById("logoutButton").addEventListener("click", () => {
		sessionStorage.removeItem("studentId");
		window.location.href = "login.html";
	});
});
