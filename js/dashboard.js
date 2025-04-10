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
			document.getElementById("username").textContent = `${first_name}`;

			// Personal Information
			document.getElementById(
				"full-name"
			).textContent = `${last_name}, ${first_name} ${middle_name}`;
			document.getElementById("email").textContent = email;
			document.getElementById("gender").textContent =
				gender.charAt(0).toUpperCase() + gender.slice(1);
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

			// Calculate age
			const today = new Date();
			const age = today.getFullYear() - birthdateObj.getFullYear();
			document.getElementById("age").textContent = `${age} Years Old`;

			// Address Information
			document.getElementById("street-address").textContent =
				street_address;
			document.getElementById("city").textContent = city;
			document.getElementById("state").textContent = state;
			document.getElementById("zip-code").textContent = zip_code;

			// Student Information
			document.getElementById("student-id").textContent = student_id;
			// Add course name
			const courseMap = {
				BSA: "Bachelor of Science in Accountancy",
				BSIS: "Bachelor of Science in Information Systems",
				BSAIS: "Bachelor of Science in Accounting Information System",
				BSAT: "Bachelor of Science in Accounting Technology",
				BSCE: "Bachelor of Science in Civil Engineering",
				BSBA: "Bachelor of Science in Business Administration",
				BSHRM: "Bachelor of Science in Hotel and Restaurant Management",
				BSHM: "Bachelor of Science in Hospitality Management",
				BAEL: "Bachelor of Arts in English Language",
				BSPSYCH: "Bachelor of Science in Psychology",
				BSCRIM: "Bachelor of Science in Criminology",
				BEED: "Bachelor of Elementary Education",
				BSED: "Bachelor of Secondary Education",
				BPED: "Bachelor of Physical Education",
			};
			document.getElementById("course").textContent =
				courseMap[course.toUpperCase()];
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
			).textContent = `${year_level}${suffix} Year`;

			// Remove the hidden class after successful data loading
			mainContent.classList.remove("hidden");
		} catch (error) {
			console.error("Error:", error);
			alert("Failed to load student data");
			sessionStorage.removeItem("studentId");
			window.location.href = "login.html"; // Redirect on error also
			return;
		}
	}

	// Load data when page loads
	loadStudentData();

	document.getElementById("logoutButton").addEventListener("click", () => {
		sessionStorage.removeItem("studentId");
		window.location.href = "login.html";
	});
});
