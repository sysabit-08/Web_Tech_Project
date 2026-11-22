let user1Name = "Rahim Ahmed";
let user1Email = "rahim@gmail.com";
let user1Password = "Rahim@123";

let user2Name = "Karim Hossain";
let user2Email = "karim@gmail.com";
let user2Password = "Karim@123";

let user3Name = "Tanvir Hasan";
let user3Email = "tanvir@gmail.com";
let user3Password = "Tanvir@123";

let user4Name = "Nusrat Jahan";
let user4Email = "nusrat@gmail.com";
let user4Password = "Nusrat@123";

const MAX_LOGIN_ATTEMPTS = 3;
const MAX_OTP_ATTEMPTS = 3;
const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const NAME_CHARS = "abcdefghijklmnopqrstuvwxyz .'-";

let failedAttempts = 0;
let currentOtp = "";
let otpUser = 0;
let otpEmail = "";
let otpAttempts = 0;
let otpCounter = 0;
let verifiedUser = 0;
let ticketCounter = 0;


function findUser(email) {
    let e = email.toLowerCase();
    if (e === user1Email) {
        return 1;
    } else if (e === user2Email) {
        return 2;
    } else if (e === user3Email) {
        return 3;
    } else if (e === user4Email) {
        return 4;
    } else {
        return 0;
    }
}

function getName(n) {
    if (n === 1) {
        return user1Name;
    } else if (n === 2) {
        return user2Name;
    } else if (n === 3) {
        return user3Name;
    } else if (n === 4) {
        return user4Name;
    } else {
        return "";
    }
}

function getEmail(n) {
    if (n === 1) {
        return user1Email;
    } else if (n === 2) {
        return user2Email;
    } else if (n === 3) {
        return user3Email;
    } else if (n === 4) {
        return user4Email;
    } else {
        return "";
    }
}

function getPassword(n) {
    if (n === 1) {
        return user1Password;
    } else if (n === 2) {
        return user2Password;
    } else if (n === 3) {
        return user3Password;
    } else if (n === 4) {
        return user4Password;
    } else {
        return "";
    }
}

function setPassword(n, newPassword) {
    if (n === 1) {
        user1Password = newPassword;
    } else if (n === 2) {
        user2Password = newPassword;
    } else if (n === 3) {
        user3Password = newPassword;
    } else if (n === 4) {
        user4Password = newPassword;
    }
}


function isDigits(text) {
    if (text.length === 0) {
        return false;
    }
    for (let i = 0; i < text.length; i++) {
        if (DIGITS.indexOf(text.slice(i, i + 1)) === -1) {
            return false;
        }
    }
    return true;
}

function isValidEmail(email) {
    let atPos = email.indexOf("@");
    if (atPos < 1) {
        return false;
    }
    if (email.indexOf(" ") !== -1) {
        return false;
    }
    let domain = email.slice(atPos + 1, email.length);
    if (domain.indexOf("@") !== -1) {
        return false;
    }
    let dotPos = domain.indexOf(".");
    if (dotPos < 1) {
        return false;
    }
    if (dotPos === domain.length - 1) {
        return false;
    }
    return true;
}

function hasLetterAndNumber(text) {
    let hasLetter = false;
    let hasNumber = false;
    for (let i = 0; i < text.length; i++) {
        let ch = text.slice(i, i + 1).toLowerCase();
        if (LETTERS.indexOf(ch) !== -1) {
            hasLetter = true;
        }
        if (DIGITS.indexOf(ch) !== -1) {
            hasNumber = true;
        }
    }
    return hasLetter && hasNumber;
}

function isValidName(name) {
    if (name.length < 3) {
        return false;
    }
    for (let i = 0; i < name.length; i++) {
        let ch = name.slice(i, i + 1).toLowerCase();
        if (NAME_CHARS.indexOf(ch) === -1) {
            return false;
        }
    }
    return true;
}


function showMessage(text, type) {
    document.getElementById("systemMessageText").innerHTML =
        "<span class='msg-" + type + "'>" + text + "</span>";
}

function setError(inputId, text) {
    document.getElementById(inputId + "Error").innerHTML = text;
}

function clearError(inputId) {
    document.getElementById(inputId + "Error").innerHTML = "";
}


function checkLoginEmail() {
    let email = document.getElementById("loginEmail").value.trim();
    clearError("loginEmail");
    if (email !== "" && !isValidEmail(email)) {
        setError("loginEmail", "Enter a valid email (example: name@gmail.com).");
    }
}

function loginUser() {
    clearError("loginEmail");
    clearError("loginPassword");

    if (failedAttempts >= MAX_LOGIN_ATTEMPTS) {
        showMessage("Too many failed attempts. Please use Forgot Password below.", "error");
        return;
    }

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value;
    let valid = true;

    if (email === "") {
        setError("loginEmail", "Email is required.");
        valid = false;
    } else if (!isValidEmail(email)) {
        setError("loginEmail", "Enter a valid email (example: name@gmail.com).");
        valid = false;
    }

    if (password === "") {
        setError("loginPassword", "Password is required.");
        valid = false;
    } else if (password.length < 6) {
        setError("loginPassword", "Password must be at least 6 characters.");
        valid = false;
    }

    if (valid === false) {
        showMessage("Please fix the errors and try again.", "error");
        return;
    }

    let userNumber = findUser(email);

    if (userNumber === 0 || getPassword(userNumber) !== password) {
        failedAttempts++;
        let attemptsLeft = MAX_LOGIN_ATTEMPTS - failedAttempts;

        if (attemptsLeft > 0) {
            showMessage("Incorrect email or password. " + attemptsLeft + " attempt(s) left.", "error");
        } else {
            showMessage("Too many failed attempts. Login is blocked. Please use Forgot Password below.", "error");
        }
    } else {
        failedAttempts = 0;
        //next page (service.html)
        window.location.href = "service.html";
    }
}


function sendOtp() {
    clearError("resetEmail");

    verifiedUser = 0;
    document.getElementById("resetArea").innerHTML = "";

    let email = document.getElementById("resetEmail").value.trim();

    if (email === "") {
        setError("resetEmail", "Email is required.");
    } else if (!isValidEmail(email)) {
        setError("resetEmail", "Enter a valid email (example: name@gmail.com).");
    } else if (findUser(email) === 0) {
        setError("resetEmail", "No account found with this email.");
    } else {
        otpUser = findUser(email);
        otpEmail = getEmail(otpUser);
        openOtpModal();
    }
}

function openOtpModal() {
    otpCounter = otpCounter + 1;
    currentOtp = "" + (100000 + (otpCounter * 48271) % 900000);
    otpAttempts = 0;

    let html = "";
    html += "<div class='popup'>";
    html += "<div class='popup-content'>";
    html += "<h3>Verify OTP</h3>";
    html += "<p>An OTP was sent to <b>" + otpEmail + "</b>.</p>";
    html += "<p>Demo mode: your OTP is <b>" + currentOtp + "</b></p>";
    html += "<label for='otpInput'>Enter OTP</label>";
    html += "<input type='text' id='otpInput' maxlength='6' placeholder='6-digit code'>";
    html += "<span class='error' id='otpInputError'></span>";
    html += "<br><br>";
    html += "<button type='button' onclick='verifyOtp()'>Verify OTP</button>";
    html += "<button type='button' onclick='openOtpModal()'>Resend OTP</button>";
    html += "<button type='button' onclick='cancelOtp()'>Cancel</button>";
    html += "</div>";
    html += "</div>";

    document.getElementById("otpArea").innerHTML = html;
    showMessage("OTP sent to " + otpEmail + ".", "info");
}

function closeOtpModal() {
    document.getElementById("otpArea").innerHTML = "";
    currentOtp = "";
}

function cancelOtp() {
    closeOtpModal();
    showMessage("Password reset cancelled.", "info");
}

function verifyOtp() {
    clearError("otpInput");
    let entered = document.getElementById("otpInput").value.trim();

    if (entered === "") {
        setError("otpInput", "Please enter the OTP.");
    } else if (entered.length !== 6 || !isDigits(entered)) {
        setError("otpInput", "OTP must be exactly 6 digits.");
    } else if (entered !== currentOtp) {
        otpAttempts++;
        let attemptsLeft = MAX_OTP_ATTEMPTS - otpAttempts;

        if (attemptsLeft <= 0) {
            closeOtpModal();
            showMessage("Too many wrong OTP attempts. Please request a new OTP.", "error");
        } else {
            setError("otpInput", "Incorrect OTP. " + attemptsLeft + " attempt(s) left.");
        }
    } else {
        verifiedUser = otpUser;
        closeOtpModal();
        openResetArea();
        showMessage("OTP verified. Set your new password below the Forgot Password form.", "success");
    }
}

//The reset form is created only after the OTP is verified
function openResetArea() {
    let html = "";
    html += "<h3>Reset Your Password</h3>";
    html += "<div class='formBox'>";
    html += "<table>";
    html += "<tr>";
    html += "<td><label for='newPassword'>New Password</label></td>";
    html += "<td><input type='password' id='newPassword' placeholder='Enter new password'>";
    html += "<span class='error' id='newPasswordError'></span></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td><label for='confirmPassword'>Confirm Password</label></td>";
    html += "<td><input type='password' id='confirmPassword' placeholder='Re-enter new password'>";
    html += "<span class='error' id='confirmPasswordError'></span></td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td></td>";
    html += "<td><button type='button' onclick='resetPassword()'>Reset Password</button></td>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";

    document.getElementById("resetArea").innerHTML = html;
}

function resetPassword() {
    clearError("newPassword");
    clearError("confirmPassword");

    if (verifiedUser === 0) {
        showMessage("Please verify your OTP first.", "error");
        return;
    }

    let newPassword = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let valid = true;

    if (newPassword === "") {
        setError("newPassword", "New password is required.");
        valid = false;
    } else if (newPassword.length < 6 || !hasLetterAndNumber(newPassword)) {
        setError("newPassword", "Use at least 6 characters with a letter and a number.");
        valid = false;
    } else if (newPassword === getPassword(verifiedUser)) {
        setError("newPassword", "New password cannot be the same as the old password.");
        valid = false;
    }

    if (confirmPassword === "") {
        setError("confirmPassword", "Please confirm your new password.");
        valid = false;
    } else if (newPassword !== confirmPassword) {
        setError("confirmPassword", "Passwords do not match.");
        valid = false;
    }

    if (valid === false) {
        showMessage("Please fix the errors and try again.", "error");
        return;
    }

    setPassword(verifiedUser, newPassword);
    failedAttempts = 0;
    document.getElementById("loginEmail").value = getEmail(verifiedUser);
    document.getElementById("loginPassword").value = "";
    document.getElementById("resetEmail").value = "";
    document.getElementById("resetArea").innerHTML = "";
    verifiedUser = 0;

    showMessage("Password reset successful. Please log in with your new password.", "success");
}


function updateCount() {
    let text = document.getElementById("issue").value;
    document.getElementById("issueCount").innerHTML = text.length + "/200";
}

function showRequestHint() {
    let type = document.getElementById("requestType").value;

    if (type === "Emergency Roadside Assistance") {
        document.getElementById("requestHint").innerHTML =
            "Please include your exact location and the vehicle problem.";
    } else if (type === "General Query") {
        document.getElementById("requestHint").innerHTML =
            "Write your question clearly so we can answer quickly.";
    } else {
        document.getElementById("requestHint").innerHTML = "";
    }
}

function submitSupport() {
    clearError("supportName");
    clearError("supportPhone");
    clearError("requestType");
    clearError("issue");

    let name = document.getElementById("supportName").value.trim();
    let phone = document.getElementById("supportPhone").value.trim();
    let type = document.getElementById("requestType").value;
    let issue = document.getElementById("issue").value.trim();
    let valid = true;

    if (name === "") {
        setError("supportName", "Full name is required.");
        valid = false;
    } else if (!isValidName(name)) {
        setError("supportName", "Enter a valid name (letters only, minimum 3 characters).");
        valid = false;
    }

    // Bangladeshi mobile number: 11 digits, starts with 01, third digit is 3-9
    if (phone === "") {
        setError("supportPhone", "Phone number is required.");
        valid = false;
    } else if (phone.length !== 11 || !isDigits(phone) ||
               phone.slice(0, 2) !== "01" ||
               "3456789".indexOf(phone.slice(2, 3)) === -1) {
        setError("supportPhone", "Enter a valid number (example: 01712345678).");
        valid = false;
    }

    if (type === "") {
        setError("requestType", "Please select a request type.");
        valid = false;
    }

    if (issue === "") {
        setError("issue", "Please describe your issue.");
        valid = false;
    } else if (issue.length < 10) {
        setError("issue", "Please write at least 10 characters.");
        valid = false;
    }

    if (valid === false) {
        showMessage("Please fix the errors and try again.", "error");
        return;
    }

    ticketCounter = ticketCounter + 1;
    let ticketId = "SUP-" + (1000 + ticketCounter);

    if (type === "Emergency Roadside Assistance") {
        showMessage("Emergency request received! Ticket " + ticketId +
            ". Our team will call " + phone + " shortly.", "success");
    } else {
        showMessage("Query submitted. Ticket " + ticketId +
            ". We will get back to you soon.", "success");
    }

    document.getElementById("supportName").value = "";
    document.getElementById("supportPhone").value = "";
    document.getElementById("requestType").value = "";
    document.getElementById("issue").value = "";
    updateCount();
    showRequestHint();
}


function pageLoaded() {
    showMessage("Welcome! Please log in to continue.", "info");
    console.log("Login page loaded");
}

document.getElementById("loginBtn")
    .addEventListener("click", loginUser);

document.getElementById("loginEmail")
    .addEventListener("change", checkLoginEmail);

document.getElementById("sendOtpBtn")
    .addEventListener("click", sendOtp);

document.getElementById("requestType")
    .addEventListener("change", showRequestHint);

document.getElementById("issue")
    .addEventListener("input", updateCount);

document.getElementById("supportBtn")
    .addEventListener("click", submitSupport);

window.addEventListener("load", pageLoaded);