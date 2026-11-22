

document.getElementById("adminForm").addEventListener("submit", function(event) {
    let isValid = true;

   
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("roleError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("confirmPasswordError").textContent = "";
    document.getElementById("termsError").textContent = "";

  
    let fullName = document.getElementById("fullName").value.trim();
    if (fullName === "") {
        document.getElementById("nameError").textContent = "Full name is required.";
        isValid = false;
    }

    let email = document.getElementById("email").value.trim();
    if (email === "" || !email.includes("@") || !email.includes(".")) {
        document.getElementById("emailError").textContent = "Valid email address is required.";
        isValid = false;
    }

    let phone = document.getElementById("phone").value.trim();
    if (phone === "") {
        document.getElementById("phoneError").textContent = "Phone number is required.";
        isValid = false;
    } else if (isNaN(phone) || phone.length < 11) {
        document.getElementById("phoneError").textContent = "Enter a valid phone number (at least 11 digits).";
        isValid = false;
    }

    let role = document.getElementById("role").value;
    if (role === "") {
        document.getElementById("roleError").textContent = "Please select an admin role.";
        isValid = false;
    }


    let password = document.getElementById("password").value;
    if (password === "") {
        document.getElementById("passwordError").textContent = "Password is required.";
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById("passwordError").textContent = "Password must be at least 6 characters.";
        isValid = false;
    }

   
    let confirmPassword = document.getElementById("confirmPassword").value;
    if (confirmPassword === "") {
        document.getElementById("confirmPasswordError").textContent = "Please confirm your password.";
        isValid = false;
    } else if (password !== confirmPassword) {
        document.getElementById("confirmPasswordError").textContent = "Passwords do not match.";
        isValid = false;
    }

    let terms = document.getElementById("terms").checked;
    if (!terms) {
        document.getElementById("termsError").textContent = "You must agree to the admin terms.";
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    } else {
        alert("Admin registration successful!");
    }
});
