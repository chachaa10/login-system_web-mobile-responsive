const form = document.getElementById("myForm");
const dialog = document.getElementById("successDialog");
const closeDialog = document.getElementById("closeDialog");

form.addEventListener("submit", async function (event) {
	event.preventDefault();
	const formData = new FormData(form);

	// Log form data to console
	for (let [key, value] of formData.entries()) {
		console.log(`${key}: ${value}`);
	}

	// Log sending confirmation
	console.log("Sending data...");

	dialog.showModal();
	dialog.classList.add("showing");
});

closeDialog.addEventListener("click", function () {
	dialog.classList.remove("showing");
	setTimeout(() => {
		dialog.close();
	}, 300);
});

