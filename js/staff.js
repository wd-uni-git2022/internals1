let students = [
    {
        studentId: 0,
        firstName: "John",
        lastName: "Doe",
        dob: "01.01.1990",
        gender: "male",
        department: "Art",
        email_id: "johndoe@example.org",
        joiningDate: "2016-10-01",
        courses: ["design", "programming1"]
    },
    {
        studentId: 1,
        firstName: "Josephine",
        lastName: "Doe",
        dob: "01.01.1980",
        gender: "female",
        department: "Computer Science",
        email_id: "josephinedoe@example.org",
        joiningDate: "2016-07-01",
        courses: ["math", "programming1"]
    },
    {
        studentId: 2,
        firstName: "Jo",
        lastName: "Doe",
        dob: "01.01.1985",
        gender: "other",
        department: "Computer Science",
        email_id: "jodoe@example.org",
        joiningDate: "2016-07-01",
        courses: ["math", "programming1"]
    },
    {
        studentId: 3,
        firstName: "Johan",
        lastName: "Doe",
        dob: "01.01.2000",
        gender: "male",
        department: "Computer Science",
        email_id: "johandoe@example.org",
        joiningDate: "2016-10-01",
        courses: ["math", "programming1"]
    },
    {
        studentId: 4,
        firstName: "Johana",
        lastName: "Doe",
        dob: "01.01.1995",
        gender: "female",
        department: "Computer Science",
        email_id: "johanadoe@example.org",
        joiningDate: "2016-07-01",
        courses: ["design", "programming1"]
    }
];

let departments = [
    "Art",
    "Computer Science"
];

let semesters = {
    Winter: {
        startMonth: 10,
        endMonth: 2
    },
    Summer: {
        startMonth: 4,
        endMonth: 9
    }
};


const DEFAULT_DEPARTMENT_SELECTION = "Choose department";
const DEFAULT_SEMESTER_SELECTION = "Choose semester";

let selectedCourse = "";

function getStudents() {
    return students;
}

function filterByDepartment(students) {
    let value = document.getElementById("department").value;
    console.log("selected department: " + value);
    if (value === DEFAULT_DEPARTMENT_SELECTION) {
        return students;
    } else {
        return students.filter(student => student.department === value);
    }
}


function filterBySemester(students) {
    let value = document.getElementById("semester").value;
    console.log("selected semester: " + value);
    if (value === DEFAULT_SEMESTER_SELECTION) {
        return students;
    } else {
        let semesterStart = semesters[value].startMonth;
        let semesterEnd = semesters[value].endMonth;


        return students.filter(student => {
            let joiningDateMonth = student.joiningDate.split("-")[1]; // or getMonth()
            console.log(joiningDateMonth)
            if(semesterStart > semesterEnd){
                return joiningDateMonth >= semesterStart || joiningDateMonth <= semesterEnd;
            }else{
                return joiningDateMonth >= semesterStart && joiningDateMonth <= semesterEnd;
            }

        });
    }
}

function loadStudentList(students) {
    let studentTable = document.getElementById("student-table-body");
    studentTable.innerHTML = "";

    for (let student of students) {
        let studentRow = studentTable.insertRow();
        studentRow.insertCell(0).innerText = student.firstName;
        studentRow.insertCell(1).innerText = student.lastName;
    }

}

function applyFilters() {
    // All filters get applied to the student data
    let students = getStudents().filter(student => student.courses.includes(selectedCourse));
    students = filterByDepartment(students);
    students = filterBySemester(students);
    loadStudentList(students);
}

function setup() {
    // dropdown department
    let dropdownDepartment = document.getElementById("department");
    let defaultOption = document.createElement("option");
    defaultOption.text = DEFAULT_DEPARTMENT_SELECTION;
    dropdownDepartment.add(defaultOption)
    departments.forEach(department => {
        let option = document.createElement("option");
        option.value = department;
        option.text = department;
        dropdownDepartment.add(option);
    });

    // dropdown semester
    let dropdownSemester = document.getElementById("semester");
    let defaultOptionSemester = document.createElement("option");
    defaultOptionSemester.text = DEFAULT_SEMESTER_SELECTION;
    dropdownSemester.add(defaultOptionSemester)
    Object.keys(semesters).forEach(semester =>{
        let option = document.createElement("option");
        option.value = semester;
        option.text = semester;
        dropdownSemester.add(option);
    });
}

setup();

function courseInfo(name) {

    selectedCourse = name;
    document.getElementById("studentList").hidden = false;

    let studentTable = document.getElementById("student-table-body");

    studentTable.innerHTML = "";

    let students = getStudents();



    for (let student of students) {
        if (student.courses.includes(selectedCourse)) {
            let studentRow = studentTable.insertRow();
            studentRow.insertCell(0).innerText = student.firstName;
            studentRow.insertCell(1).innerText = student.lastName;
        }

    }
}