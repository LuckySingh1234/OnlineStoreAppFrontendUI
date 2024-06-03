$(document).ready(function() {
    let signedInUserJsonString = localStorage.getItem('signedInUser');
    let signedInUser = JSON.parse(signedInUserJsonString);

    const myCartBtn = document.getElementById('mycartbtn');
    const signInBtn = document.getElementById('signinbtn');
    const profileBtn = document.getElementById('profileBtn');
    const signUpBtn = document.getElementById('signupbtn');

    const name = document.getElementById('name');
    const mobile = document.getElementById('mobile');
    const email = document.getElementById('email');

    if (signedInUser !== null) {
        myCartBtn.style.display = 'block';
        signInBtn.style.display = 'none';
        signUpBtn.style.display = 'none';
        profileBtn.style.display = 'block';

        name.innerHTML = signedInUser.name;
        mobile.innerHTML = signedInUser.mobile;
        email.innerHTML = signedInUser.email;
    } else {
        myCartBtn.style.display = 'none';
        signInBtn.style.display = 'block';
        signUpBtn.style.display = 'block';
        profileBtn.style.display = 'none';
    }
});

function signOut() {
    localStorage.removeItem('signedInUser');
    window.location = '/signin.html'
}
