document.getElementById("registForm").addEventListener("submit", function (event) {
    event.preventDefault();
    submitForm();
});

async function submitForm () {
    let fullName = document.getElementById("fullName").value;
    let birthDate = document.getElementById("birthDate").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let birthDateObj = new Date(birthDate);
    let formattedBirthDate = birthDateObj.toISOString();
    formattedBirthDate = formattedBirthDate.replace("Z", "+00:00");

    let json = {};
    json.name = fullName;
    json.birthdate = formattedBirthDate;
    json.email = email;
    json.username = username;
    json.password = password;

    let response = await fetch(`http://be-balikpapan-6-production.up.railway.app/api/user/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json)
    });
    let data = await response.json();

    Swal.fire({
        title: 'New user registered!',
        icon: 'success',
    }).then(() => {
        window.location.href = '../html/loginpage.html';
    });

}

const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

confirmPasswordInput.addEventListener("input", () => {

    const passwordValue = passwordInput.value;
    const confirmPasswordValue = confirmPasswordInput.value;

    if (passwordValue !== confirmPasswordValue) {
        confirmPasswordInput.classList.add("password-mismatch");
    } else {
        confirmPasswordInput.classList.remove("password-mismatch");
    }
});