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

    var email = document.getElementById("signup_email").value
    if (email.trim()==null || email.trim()==""|| email===" ") {
        errorMessage.textContent = 'Please specify your email';
        return;
    }

    var password = document.getElementById("signup_password").value
    if (password.trim()==null || password.trim()==""|| password===" ") {
        errorMessage.textContent = 'Please specify your password';
        return;
    }
    
    var name = document.getElementById("name").value
    if (name.trim()==null || name.trim()==""|| name===" ") {
        errorMessage.textContent = 'Please specify your name';
        return;
    }

    var mobile = document.getElementById("mobile").value
    if (mobile.trim()==null || mobile.trim()==""|| mobile===" ") {
        errorMessage.textContent = 'Please specify your mobile number';
        return;
    }
    if(mobile.trim().length<10 || mobile.trim().length>10) {
        errorMessage.textContent = 'Mobile number should be of 10 digits';
        return;
    }

    var address = document.getElementById("address").value
    if (address.trim()==null || address.trim()==""|| address===" ") {
        errorMessage.textContent = 'Please specify your address';
        return;
    }

    const users = getArrayFromLocalStorage('users');

    let alreadyExists = false;
    users.forEach(function(existingUser) {
        if (existingUser.email === email) {
            errorMessage.textContent = 'User with same email already exists.';
            alreadyExists = true;
            return;
        }
    });
    if (alreadyExists) {
        return;
    }

    const user = {
        'email': email,
        'password': password,
        'name': name,
        'mobile': mobile,
        'address': address
    }

    addElementToArrayInLocalStorage('users', user);

    document.getElementById('signup_email').value = '';
    document.getElementById('signup_password').value = '';
    document.getElementById('name').value = '';
    document.getElementById('mobile').value = '';
    document.getElementById('address').value = '';

    window.location = "signin.html"
}

function getArrayFromLocalStorage(key) {
    let jsonString = localStorage.getItem(key);
    if (!jsonString) {
        return [];
    }
    return JSON.parse(jsonString);
}

function saveArrayToLocalStorage(key, array) {
    let jsonString = JSON.stringify(array);
    localStorage.setItem(key, jsonString);
}

function addElementToArrayInLocalStorage(key, element) {
    let array = getArrayFromLocalStorage(key);
    array.push(element);
    saveArrayToLocalStorage(key, array);
}
