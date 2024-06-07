document.addEventListener('DOMContentLoaded', (event) => {
    renderManagers();    
});

function renderManagers() {
    const tableBody = document.querySelector('#managerAdminTable tbody');
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    var apiUrl = 'http://localhost:8080/OnlineStoreAppBackendAPI/webapi/myresource/getManagers';

    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(response) {
            // Handle the success response
            if (response === null) {
                const managerAdminContent = document.getElementById('managerAdminContent');
                managerAdminContent.innerHTML = `<h2 style="margin-top: 6rem; text-align: center;">No Managers Registered in Store</h2>`;
            } else {
                response.reverse();
                response.forEach(item => {
                    const managerAdminTableBody = document.querySelector('#managerAdminTable tbody');
                    const managerAdminTableBodyHtml = `
                        <tr class="managerRow">
                            <td class="email">${item.email}</td>
                            <td class="password">${item.password}</td>
                            <td class="py-2"><button class="editBtn btn btn-warning btn-sm" style="width: 75px;" onclick="updateManager(this)">Edit</button></td>
                            <td class="py-2"><button class="removeBtn btn btn-danger btn-sm" style="width: 75px;" onclick="removeManagerViaTable(this)">Remove</button></td>
                        </tr>
                    `;
                    managerAdminTableBody.innerHTML += managerAdminTableBodyHtml;
                });
            }
        },
        error: function(xhr, status, error) {
            // Handle the error response
        }
    });
}

function viewManager() {
    clearPreviousAlerts();

    const managerId = document.getElementById('managerId').value.trim();
    if (!isValidManagerId(managerId)) {
        const alert = document.getElementById('failure-alert');
        alert.innerText = 'Manager Id does not match the pattern';
        alert.style.display = 'block';
        return;
    }

    var apiUrl = 'http://localhost:8080/OnlineStoreAppBackendAPI/webapi/myresource/getManagerById';
    var formData = {
        managerId: managerId
    };

    $.ajax({
        url: apiUrl,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            if (response.success === 'true') {
                document.getElementById('managerId').value = response.managerId;
                document.getElementById('fullName').value = response.fullName;
                document.getElementById('mobile2').value = response.mobile;
                document.getElementById('email2').value = response.email;
                document.getElementById('password').value = response.password;
                document.getElementById('address').value = response.address;
            } else {
                const alert = document.getElementById('failure-alert');
                alert.innerText = response.errorMessage;
                alert.style.display = 'block';
            }
        },
        error: function(xhr, status, error) {
            // Handle error
            const alert = document.getElementById('failure-alert');
            alert.innerText = 'Error: ' + error;
            alert.style.display = 'block';
        }
    });
}

function addManager() {
    clearPreviousAlerts();

    const managerId = document.getElementById('managerId').value.trim();
    if (managerId !== '') {
        const alert = document.getElementById('failure-alert');
        alert.innerText = 'You cannot provide Manager Id while adding manager';
        alert.style.display = 'block';
        return;
    }

    const fullName = document.getElementById('fullName').value.trim();
    if (!isValidName(fullName)) {
        const alert = document.getElementById('failure-alert');
        alert.innerText = 'Manager Name does not match the pattern';
        alert.style.display = 'block';
        return;
    }

    const mobile = document.getElementById('mobile2').value.trim();
    if (!isValidMobile(mobile)) {
        const alert = document.getElementById('failure-alert');
        alert.innerText = 'Manager Mobile Number does not match the pattern';
        alert.style.display = 'block';
        return;
    }

    const email = document.getElementById('email2').value.trim();
    if (!isValidEmail(email)) {
        const alert = document.getElementById('failure-alert');
        alert.innerText = 'Manager Email does not match the pattern';
        alert.style.display = 'block';
        return;
    }

    const password = document.getElementById('password').value.trim();
    if (!isValidPassword(password)) {
        const alert = document.getElementById('failure-alert');
        alert.innerText = 'Manager Password is Invalid';
        alert.style.display = 'block';
        return;
    }

    const address = document.getElementById('address').value.trim();
    if (!isValidAddress(address)) {
        const alert = document.getElementById('failure-alert');
        alert.innerText = 'Manager Address is Invalid';
        alert.style.display = 'block';
        return;
    }

    var apiUrl = 'http://localhost:8080/OnlineStoreAppBackendAPI/webapi/myresource/addManager';
    var formData = {
        managerId: managerId,
        fullName: fullName,
        mobile: mobile,
        email: email,
        password: password,
        address: address
    };

    $.ajax({
        url: apiUrl,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            if (response.success === 'true') {
                document.getElementById('managerId').value = "";
                document.getElementById('fullName').value = "";
                document.getElementById('mobile2').value = "";
                document.getElementById('email2').value = "";
                document.getElementById('password').value = "";
                document.getElementById('address').value = "";
                const alert = document.getElementById('success-alert');
                alert.innerText = "Manager Added Successfully";
                alert.style.display = 'block';
                renderManagers();
            } else {
                const alert = document.getElementById('failure-alert');
                alert.innerText = response.errorMessage;
                alert.style.display = 'block';
            }
        },
        error: function(xhr, status, error) {
            // Handle error
            const alert = document.getElementById('failure-alert');
            alert.innerText = 'Error: ' + error;
            alert.style.display = 'block';
        }
    });
}

function editManager() {
    clearPreviousAlerts();
    const managerId = document.getElementById('managerId').value.trim();
    if (!isValidManagerId(managerId)) {
        const alert = document.getElementById('failure-alert');
        alert.innerText = 'Manager Id does not match the pattern';
        alert.style.display = 'block';
        return;
    }

    const fullName = document.getElementById('fullName').value.trim();
    if (!isValidName(fullName)) {
        const alert = document.getElementById('failure-alert');
        alert.innerText = 'Manager Name does not match the pattern';
        alert.style.display = 'block';
        return;
    }

    const mobile = document.getElementById('mobile2').value.trim();
    if (!isValidMobile(mobile)) {
        const alert = document.getElementById('failure-alert');
        alert.innerText = 'Mobile Number should contain only 10 digits';
        alert.style.display = 'block';
        return;
    }

    const email = document.getElementById('email2').value.trim();
    if (!isValidEmail(email)) {
        const alert = document.getElementById('failure-alert');
        alert.innerText = 'Manager E-mail is invalid';
        alert.style.display = 'block';
        return;
    }

    const password = document.getElementById('password').value.trim();
    if (!isValidPassword(password)) {
        const alert = document.getElementById('failure-alert');
        alert.innerText = 'Manager Password is Invalid';
        alert.style.display = 'block';
        return;
    }

    const address = document.getElementById('address').value.trim();
    if (!isValidAddress(address)) {
        const alert = document.getElementById('failure-alert');
        alert.innerText = 'Manager Address is Invalid';
        alert.style.display = 'block';
        return;
    }

    var apiUrl = 'http://localhost:8080/OnlineStoreAppBackendAPI/webapi/myresource/editManager';
    var formData = {
        managerId: managerId,
        fullName: fullName,
        mobile: mobile,
        email: email,
        password: password,
        address: address
    };

    $.ajax({
        url: apiUrl,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            if (response.success === 'true') {
                document.getElementById('managerId').value = "";
                document.getElementById('fullName').value = "";
                document.getElementById('mobile2').value = "";
                document.getElementById('email2').value = "";
                document.getElementById('password').value = "";
                document.getElementById('address').value = "";
                const alert = document.getElementById('success-alert');
                alert.innerText = "Manager Edited Successfully";
                alert.style.display = 'block';
                renderManagers();
            } else {
                const alert = document.getElementById('failure-alert');
                alert.innerText = response.errorMessage;
                alert.style.display = 'block';
            }
        },
        error: function(xhr, status, error) {
            // Handle error
            const alert = document.getElementById('failure-alert');
            alert.innerText = 'Error: ' + error;
            alert.style.display = 'block';
        }
    });
}

function removeManager() {
    clearPreviousAlerts();

    const managerId = document.getElementById('managerId').value.trim();
    if (!isValidManagerId(managerId)) {
        const alert = document.getElementById('failure-alert');
        alert.innerText = 'Manager Id does not match the pattern';
        alert.style.display = 'block';
        return;
    }

    var apiUrl = 'http://localhost:8080/OnlineStoreAppBackendAPI/webapi/myresource/removeManager';
    var formData = {
        managerId: managerId
    };

    $.ajax({
        url: apiUrl,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            if (response.success === 'true') {
                document.getElementById('managerId').value = "";
                document.getElementById('fullName').value = "";
                document.getElementById('mobile2').value = "";
                document.getElementById('email2').value = "";
                document.getElementById('password').value = "";
                document.getElementById('address').value = "";
                const alert = document.getElementById('success-alert');
                alert.innerText = "Manager Removed Successfully";
                alert.style.display = 'block';
                renderManagers();
            } else {
                const alert = document.getElementById('failure-alert');
                alert.innerText = response.errorMessage;
                alert.style.display = 'block';
            }
        },
        error: function(xhr, status, error) {
            // Handle error
            const alert = document.getElementById('failure-alert');
            alert.innerText = 'Error: ' + error;
            alert.style.display = 'block';
        }
    });
}
 function removeManagerViaTable(removeViaTableBtn) {
    clearPreviousAlerts();

    const managerRow = removeViaTableBtn.closest('.managerRow');
    const managerIdElement = managerRow.querySelector('.managerId');
    const managerId = managerIdElement.textContent;

    var apiUrl = 'http://localhost:8080/OnlineStoreAppBackendAPI/webapi/myresource/removeManager';
    var formData = {
        managerId: managerId
    };

    $.ajax({
        url: apiUrl,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            if (response.success === 'true') {
                document.getElementById('managerId').value = "";
                document.getElementById('fullName').value = "";
                document.getElementById('mobile2').value = "";
                document.getElementById('email2').value = "";
                document.getElementById('password').value = "";
                document.getElementById('address').value = "";
                const alert = document.getElementById('success-alert');
                alert.innerText = "Manager Removed Successfully";
                alert.style.display = 'block';
                renderManagers();
            } else {
                const alert = document.getElementById('failure-alert');
                alert.innerText = response.errorMessage;
                alert.style.display = 'block';
            }
        },
        error: function(xhr, status, error) {
            // Handle error
            const alert = document.getElementById('failure-alert');
            alert.innerText = 'Error: ' + error;
            alert.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
 }

function updateManager(editBtn) {
    clearPreviousAlerts();

    const managerRow = editBtn.closest('.managerRow');
    
    const managerIdElement = managerRow.querySelector('.managerId');
    const managerId = managerIdElement.textContent;
    document.getElementById('managerId').value = managerId;

    const fullNameElement = managerRow.querySelector('.fullName');
    const fullName = fullNameElement.textContent;
    document.getElementById('fullName').value = fullName;

    const mobileElement = managerRow.querySelector('.mobile');
    const mobile = mobileElement.textContent.trim();
    document.getElementById('mobile2').value = mobile;

    const emailElement = managerRow.querySelector('.email');
    const email = emailElement.textContent;
    document.getElementById('email2').value = email;

    const passwordElement = managerRow.querySelector('.password');
    const password = passwordElement.textContent;
    document.getElementById('password').value = password;

    const addressElement = managerRow.querySelector('.address');
    const address = addressElement.textContent;
    document.getElementById('address').value = address;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function clearPreviousAlerts() {
    const successAlert = document.getElementById('success-alert');
    successAlert.style.display = 'none';

    const failureAlert = document.getElementById('failure-alert');
    failureAlert.style.display = 'none';
}

function dismissAlert(alertId) {
    var alert = document.getElementById(alertId);
    setTimeout(function() {
        alert.style.display = 'none';
    });
}

function isValidManagerId(managerId) {
    const managerIdRegex = /^C#[0-9]{5}$/;
    return managerIdRegex.test(managerId);
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
