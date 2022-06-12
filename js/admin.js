let studentList = [
    {
        studentId: 0,
        firstName: "John",
        lastName: "Doe",
        dob: "01.01.1990",
        gender: "male",
        department: "Art",
        email_id: "johndoe@example.org",
        joiningDate: "2016-10-01"
    },
    {
        studentId: 1,
        firstName: "Josephine",
        lastName: "Doe",
        dob: "01.01.1980",
        gender: "female",
        department: "Computer Science",
        email_id: "josephinedoe@example.org",
        joiningDate: "2016-07-01"
    },
    {
        studentId: 2,
        firstName: "Jo",
        lastName: "Doe",
        dob: "01.01.1985",
        gender: "other",
        department: "Computer Science",
        email_id: "jodoe@example.org",
        joiningDate: "2016-07-01"
    },
    {
        studentId: 3,
        firstName: "Johan",
        lastName: "Doe",
        dob: "01.01.2000",
        gender: "male",
        department: "Computer Science",
        email_id: "johandoe@example.org",
        joiningDate: "2016-10-01"
    },
    {
        studentId: 4,
        firstName: "Johana",
        lastName: "Doe",
        dob: "01.01.1995",
        gender: "female",
        department: "Computer Science",
        email_id: "johanadoe@example.org",
        joiningDate: "2016-07-01"
    }
];
let staffList = [
    {
        staffId: 0,
        firstName: "Josi",
        lastName: "Doe",
        dob: "01.01.1985",
        gender: "female",
        emailId: "josi@staff.example.org"
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

function getStudents() {
    return studentList;
}

function getStaff() {
    return staffList;
}

function loadStudentList(students) {
    let studentTable = document.getElementById("student-table-body");

    //document.getElementById("student-table-body").innerHTML = "";
    studentTable.innerHTML = "";

    //let students = getStudents();

    for (let student of students) {
        let studentRow = studentTable.insertRow();
        studentRow.insertCell(0).innerText = student.studentId;
        studentRow.insertCell(1).innerText = student.firstName;
        studentRow.insertCell(2).innerText = student.lastName;
        studentRow.insertCell(3).innerText = student.dob;
        studentRow.insertCell(4).innerText = student.gender;
        studentRow.insertCell(5).innerText = student.department;
        studentRow.insertCell(6).innerText = student.email_id;
        studentRow.insertCell(7).innerText = student.joiningDate;

    }

}


function loadStaffList() {
    let staffTable = document.getElementById("staff-table-body");

    staffTable.innerHTML = "";


    let staffList = getStaff();

    for (let staff of staffList) {
        let staffRow = staffTable.insertRow();
        staffRow.insertCell(0).innerText = staff.staffId;
        staffRow.insertCell(1).innerText = staff.firstName;
        staffRow.insertCell(2).innerText = staff.lastName;
        staffRow.insertCell(3).innerText = staff.dob;
        staffRow.insertCell(4).innerText = staff.gender;
        staffRow.insertCell(5).innerText = staff.emailId;
    }

}

let maxDOB;
let minDOB;
let minJoiningDate;

function setup() {
    // dob validation
    let dobDatepicker = document.getElementById("add-student-dob");

    maxDOB = new Date();
    maxDOB.setFullYear(maxDOB.getFullYear() - 17);

    minDOB = new Date();
    minDOB.setFullYear(minDOB.getFullYear() - 60);

    dobDatepicker.max = maxDOB.toISOString().split("T")[0];
    dobDatepicker.min = minDOB.toISOString().split("T")[0];

    // joining date validation
    let joiningDateDatepicker = document.getElementById("add-student-joining-date");
    minJoiningDate = new Date();
    minJoiningDate.setFullYear(2015);
    joiningDateDatepicker.min = minJoiningDate.toISOString().split("T")[0];

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

function applyFilters() {
    // All filters get applied to the student data
    let students = getStudents();
    students = filterByDepartment(students);
    students = filterBySemester(students);
    loadStudentList(students);
}

setup();
loadStudentList(getStudents());
loadStaffList();

function studentOptionsClick(buttonId) {
    let action = document.getElementById("action");
    let actionButton = document.getElementById("action-" + buttonId)

    if (!actionButton.hidden) {
        actionButton.hidden = true;
        action.hidden = true;
        return;
    }

    let divs = action.getElementsByTagName("div");
    for (let div of divs) {
        div.hidden = true;
    }

    actionButton.hidden = false;
    action.hidden = false;
}

function staffOptionsClick(buttonId) {
    let action = document.getElementById("action-staff");
    let actionButton = document.getElementById("action-" + buttonId + "-staff")

    if (!actionButton.hidden) {
        actionButton.hidden = true;
        action.hidden = true;
        return;
    }

    let divs = action.getElementsByTagName("div");
    for (let div of divs) {
        div.hidden = true;
    }

    actionButton.hidden = false;
    action.hidden = false;
}


function addStudent() {
    let addForm = document.forms.addStudentForm;

    let formData = new FormData(addForm);

    let studentData = {};
    formData.forEach(function (value, key) {
        console.log(key + ": " + value);
        studentData[key] = value
    });

    console.log(studentData);
    if (!studentData.studentId || !studentData.firstName || !studentData.email_id) {
        console.error("required data is missing");
        return;
    }

    if (studentData.dob < maxDOB || studentData.dob > minDOB) {
        console.error("dob error");
        alert("dob error");
        return;
    }

    if (studentData.joiningDate < minJoiningDate) {
        console.error("joining date error");
        alert("joining date error");
        return;
    }


    studentList.push(studentData);
    loadStudentList(getStudents());

}

function updateStudent() {
    console.log("update student");
}

function deleteStudent() {
    console.log("delete student");
}


function addStaff() {
    console.log("add staff");
}

const TYPE_STUDENT = "student";
const TYPE_STAFF = "staff";

function showInfo(type) {
    let studentInfo = document.getElementById("student-info");
    let staffInfo = document.getElementById("staff-info");

    if (type === TYPE_STUDENT) {
        staffInfo.hidden = true;
        studentInfo.hidden = false;
    } else if (type === TYPE_STAFF) {
        studentInfo.hidden = true;
        staffInfo.hidden = false;
    }
}
