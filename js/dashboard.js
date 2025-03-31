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
				birthdate,
				gender,
				street_address,
				city,
				state,
				zip_code,
			} = await studentData.json();

			// Populate data
			document.getElementById(
				"full-name"
			).textContent = `${first_name} ${middle_name} ${last_name}`;
			document.getElementById("student-id").textContent = student_id;
			document.getElementById("email").textContent = email;
			document.getElementById("course").textContent =
				course.toUpperCase();

			// Add suffix to year level
			const suffix =
				year_level === 4
					? "th"
					: year_level === 3
					? "rd"
					: year_level === 2
					? "nd"
					: year_level === 1
					? "st"
					: "";
			document.getElementById(
				"year-level"
			).textContent = `${year_level}${suffix}`;
			document.getElementById("mobile-number").textContent =
				mobile_number;

			// Format birthdate
			const birthdateObj = new Date(birthdate);
			const formattedBirthdate = birthdateObj.toLocaleDateString(
				"en-US",
				{
					month: "short",
					day: "numeric",
					year: "numeric",
				}
			);
			document.getElementById("birthdate").textContent =
				formattedBirthdate;

			document.getElementById("gender").textContent =
				gender.charAt(0).toUpperCase() + gender.slice(1);

			// Populate address
			document.getElementById("street-address").textContent =
				street_address;
			document.getElementById("city").textContent = city;
			document.getElementById("state").textContent = state;
			document.getElementById("zip-code").textContent = zip_code;

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
