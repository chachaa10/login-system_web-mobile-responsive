document.getElementById("myForm").addEventListener("submit", async (e) => {
	e.preventDefault();

	// Get form data
	const formData = new FormData(e.target);
	const data = Object.fromEntries(formData.entries());

	try {
		const response = await fetch("http://localhost:3001/api/students", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) throw new Error("Registration failed");

		// Show success dialog
		document.getElementById("successDialog").showModal();
		e.target.reset();
	} catch (error) {
		console.error("Error:", error);
		alert("Registration failed. Please try again.");
	}
});

// Close dialog handler
document.getElementById("closeDialog").addEventListener("click", () => {
	document.getElementById("successDialog").close();
	window.location.href = "index.html"; // Redirect to login
});

function capitalizeWords(str) {
	return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

document.querySelectorAll("input[autocapitalize]").forEach((input) => {
	input.addEventListener("blur", function () {
		this.value = capitalizeWords(this.value);
	});
});
