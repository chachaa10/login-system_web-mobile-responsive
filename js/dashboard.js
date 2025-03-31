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
			const studentData = await fetch(
				`http://localhost:3001/api/students/${studentId}`
			);
			if (!studentData.ok) throw new Error("Failed to load data");

			const {
				first_name,
				middle_name,
				last_name,
				student_id,
				email,
				course,
				year_level,
				mobile_number,
			} = await studentData.json();

			// Populate data
			document.getElementById(
				"studentName"
			).textContent = `${first_name} ${middle_name} ${last_name}`;
			document.getElementById("studentId").textContent = student_id;
			document.getElementById("studentEmail").textContent = email;
			document.getElementById("studentCourse").textContent = course;
			document.getElementById("studentYear").textContent = year_level;
			document.getElementById("studentMobile").textContent =
				mobile_number;

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
