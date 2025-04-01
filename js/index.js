const body = document.getElementById("mainContent");

// Redirect if already logged in
if (sessionStorage.getItem("studentId")) {
	window.location.href = "dashboard.html";
} else {
	body.classList.remove("hidden");

	const loginForm = document.getElementById("loginForm");
	loginForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;

		try {
			const response = await fetch(
				"http://localhost:3001/api/students/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Login failed");
			}

			// Store user ID in session storage
			sessionStorage.setItem("studentId", data.student.student_id);
			window.location.href = "dashboard.html";
		} catch (error) {
			console.error("Login error:", error);
			// Display error message in the error container
			document.getElementById("loginError").textContent =
				"Invalid Email or Password";

			setTimeout(() => {
				document.getElementById("loginError").textContent = "";
			}, 3000);
		}
	});
}
