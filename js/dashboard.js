// Get logged-in student's ID from session storage
const studentId = sessionStorage.getItem("studentId");

// Redirect to login if no session
if (!studentId) {
	window.location.href = "login.html";
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
		).textContent = `${student.first_name} ${student.last_name}`;
		document.getElementById("studentId").textContent = student.student_id;
		document.getElementById("studentEmail").textContent = student.email;
		document.getElementById("studentCourse").textContent = student.course;
		document.getElementById("studentYear").textContent = student.year_level;
		document.getElementById("studentMobile").textContent =
			student.mobile_number;
	} catch (error) {
		console.error("Error:", error);
		alert("Failed to load student data");
	}
}

// Load data when page loads
loadStudentData();

// Check login status
function checkAuth() {
	const studentId = sessionStorage.getItem("studentId");
	if (!studentId) {
		window.location.href = "login.html";
	}
}

// Run check on page load
checkAuth();

document.getElementById("logoutButton").addEventListener("click", () => {
	sessionStorage.removeItem("studentId");
	window.location.href = "login.html";
});
