$(document).ready(function() {
    let signedInUser = localStorage.getItem('signedInUser');
    if (signedInUser !== null) {
        window.location = "index.html";
        return;
    }
});

function signUp() {
    const errorMessage = document.getElementById('signUpErrorMessage');
    errorMessage.textContent = '';

    var email = document.getElementById("signup_email").value.trim();
    if (!isValidEmail(email)) {
        errorMessage.textContent = 'Customer Email does not match the pattern';
        return;
    }

    var password = document.getElementById("signup_password").value.trim();
    if (!isValidPassword(password)) {
        errorMessage.textContent = 'Customer Password is Invalid';
        return;
    }

    var fullName = document.getElementById("fullName").value.trim();
    if (!isValidName(fullName)) {
        errorMessage.textContent = 'Customer Name does not match the pattern';
        return;
    }

    var mobile = document.getElementById("signup_mobile").value.trim();
    if (!isValidMobile(mobile)) {
        errorMessage.textContent = 'Customer Mobile Number does not match the pattern';
        return;
    }

    var address = document.getElementById("address").value.trim();
    if (!isValidAddress(address)) {
        errorMessage.textContent = 'Customer Address is Invalid';
        return;
    }

    const formData = {
        email: email,
        password: password,
        fullName: fullName,
        mobile: mobile,
        address: address
    }
    var apiUrl = 'http://localhost:8080/OnlineStoreAppBackendAPI/webapi/myresource/addCustomer';

    $.ajax({
        url: apiUrl,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            if (response.success === 'true') {
                document.getElementById('signup_email').value = '';
                document.getElementById('signup_password').value = '';
                document.getElementById('fullName').value = '';
                document.getElementById('signup_mobile').value = '';
                document.getElementById('address').value = '';

                window.location = "signin.html"
            } else {
                errorMessage.textContent = response.errorMessage;
            }
        },
        error: function(xhr, status, error) {
            // Handle error
            errorMessage.textContent = 'Error: ' + error;
        }
    });
}

function isValidName(fullName) {
    const fullNameRegex = /^[A-Za-z\s]{1,20}$/;
    return fullNameRegex.test(fullName);
}

function isValidMobile(mobile) {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    return password !== "";
}

function isValidAddress(address) {
    return address !== "";
}
