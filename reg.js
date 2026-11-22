let form = document.getElementById("regForm");
let termsBox = document.getElementById("terms");
let submitBtn = document.getElementById("submitBtn");

let msgBox = document.createElement("p");
msgBox.id = "formMsg";
form.appendChild(msgBox);

submitBtn.disabled = true;

termsBox.addEventListener("change", function () {
    if (termsBox.checked) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
})

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let dob = document.getElementById("dob").value;
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value;
    let vehicleModel = document.getElementById("vehicleModel").value.trim();
    let vehicleType = document.getElementById("vehicleType").value;

    if (name === "" ||email === "" ||dob === "" ||phone === "" ||password === "" ||vehicleModel === "" ||vehicleType === "") {
        msgBox.textContent = "Please fill in all fields before creating an account.";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        msgBox.textContent = "Please enter a valid email address containing @ and dot(.)";
        return;
    }

    let isOnlyDigits = true;
    for (let i = 0; i < phone.length; i++) {
        if (phone[i] < "0" || phone[i] > "9") {
            isOnlyDigits = false;
            break;
        }
    }

    if (phone.length !== 11 || !isOnlyDigits) {
        msgBox.textContent = "Phone number must be exactly 11 digits.";
        return;
    }

    if (password.length < 8) {
        msgBox.textContent = "Password must be at least 8 characters long.";
        return;
    }

    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;

    for (let i = 0; i < password.length; i++) {
        let ch = password[i];
        if (ch >= "A" && ch <= "Z") {
            hasUpper = true;
        } else if (ch >= "a" && ch <= "z") {
            hasLower = true;
        } else if (ch >= "0" && ch <= "9") {
            hasNumber = true;
        }
    }

    if (!hasUpper || !hasLower || !hasNumber) {
        msgBox.textContent = "Password must contain at least one uppercase letter, one lowercase letter, and one number.";
        return;
    }

    if (!termsBox.checked) {
        msgBox.textContent = "Please agree to the terms and conditions first.";
        return;
    }

    msgBox.textContent = "Account created successfully for " + name + ".";

    form.reset();
    submitBtn.disabled = true;
});
