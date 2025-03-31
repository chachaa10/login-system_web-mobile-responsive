document.getElementById("loginForm").addEventListener("submit", async (e) => {
	e.preventDefault();

	const response = await fetch("http://localhost:3001/api/students");
	const students = await response.json();

	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	const student = students.find(
		(s) => s.email === email && s.password === password
	);

	if (student) {
		sessionStorage.setItem("studentId", student.id);
		window.location.href = "dashboard.html";
	} else {
		alert("Invalid credentials!");
	}
});
