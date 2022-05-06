// Hard coded values for demonstration purposes
const USERNAME_ADMIN = "Admin";
const PASSWORD_ADMIN = "Admin";

const USERNAME_STAFF = "Staff";
const PASSWORD_STAFF = "Staff";

let invalidLoginAttempts = 0;
const MAX_LOGIN_ATTEMPTS = 3;

function checkAdminCredentials() {
    let adminUsername = document.getElementById("admin-username").value;
    let adminPassword = document.getElementById("admin-password").value;

    if (adminUsername === USERNAME_ADMIN && adminPassword === PASSWORD_ADMIN) {
        window.location.href = "/admin.html";
    } else {
        invalidLogin();
    }


}

function checkStaffCredentials() {
    let staffUsername = document.getElementById("staff-username").value;
    let staffPassword = document.getElementById("staff-password").value;

    if (staffUsername === USERNAME_STAFF && staffPassword === PASSWORD_STAFF) {
        window.location.href = "/staff.html";
    } else {
        invalidLogin();
    }

}

function invalidLogin() {
    alert("Login credentials incorrect.");

    invalidLoginAttempts++;
    if (invalidLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
        disableLogin();
    }
}

function disableLogin() {
    document.getElementById("admin-username").disabled = true;
    document.getElementById("admin-password").disabled = true;
    document.getElementById("admin-login-button").disabled = true;

    document.getElementById("staff-username").disabled = true;
    document.getElementById("staff-password").disabled = true;
    document.getElementById("staff-login-button").disabled = true;

}