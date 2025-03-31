// Fetch all students
async function loadStudents() {
	const response = await fetch("http://localhost:3001/api/students");
	const students = await response.json();

	const studentList = document.getElementById("studentList");
	studentList.innerHTML = students
		.map(
			(student) => `
    <div>
      ${student.name} - ${student.email}
      <button onclick="deleteStudent(${student.id})">Delete</button>
    </div>
  `
		)
		.join("");
}

// Delete student
async function deleteStudent(id) {
	await fetch(`http://localhost:3001/api/students/${id}`, {
		method: "DELETE",
	});
	loadStudents();
}

// Initial load
loadStudents();
