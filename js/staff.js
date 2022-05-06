let students = [
    {
        firstName: "joe", lastName: "doe", courses: ["design", "programming1"]
    },
    {
        firstName: "johanna", lastName: "doe", courses: ["math", "programming1"]
    }
]


function getStudents(){
    return students;
}

function courseInfo(name) {

    document.getElementById("studentList").hidden = false;

    let studentTable = document.getElementById("student-table-body");

    studentTable.innerHTML = "";

    let students = getStudents();

    for (let student of students) {
        if(student.courses.includes(name)){
            let studentRow = studentTable.insertRow();
            studentRow.insertCell(0).innerText = student.firstName;
            studentRow.insertCell(1).innerText = student.lastName;
        }

    }
}