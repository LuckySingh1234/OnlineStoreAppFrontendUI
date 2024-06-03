$(document).ready(function() {
    let signedInUser = localStorage.getItem('signedInUser');
    if (signedInUser !== null) {
        window.location = "index.html";
        return;
    }
});

function signIn() {
    const errorMessage = document.getElementById('signInErrorMessage');
    errorMessage.textContent = '';

    var email = document.getElementById("signin_email").value
    if (email.trim()==null || email.trim()==""|| email===" ") {
        errorMessage.textContent = 'Please specify your email';
        return;
    }

    var password = document.getElementById("signin_password").value
    if (password.trim()==null || password.trim()==""|| password===" ") {
        errorMessage.textContent = 'Please specify your password';
        return;
    }
    
    const users = getArrayFromLocalStorage('users');

    let signedInUser;

    let alreadyExists = false;
    let passwordMatched = false;
    users.forEach(function(existingUser) {
        if (existingUser.email === email) {
            alreadyExists = true;
            if (existingUser.password === password) {
                passwordMatched = true;
                signedInUser = {
                    'email': existingUser.email,
                    'password': existingUser.password,
                    'name': existingUser.name,
                    'mobile': existingUser.mobile,
                    'address': existingUser.address
                }
            }
        }
    });
    if (!alreadyExists) {
        errorMessage.textContent = 'Email id is not registered';
        return;
    }
    if (!passwordMatched) {
        errorMessage.textContent = 'Password is incorrect';
        return;
    }

    saveArrayToLocalStorage("signedInUser", JSON.stringify(signedInUser));

    document.getElementById('signin_email').value = '';
    document.getElementById('signin_password').value = '';

    window.location = "index.html";
}

function getArrayFromLocalStorage(key) {
    let jsonString = localStorage.getItem(key);
    if (!jsonString) {
        return [];
    }
    return JSON.parse(jsonString);
}

function saveArrayToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}
