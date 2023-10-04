document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    submitForm();
});

async function submitForm() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    let response1 = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/user/getAllUser`);
    let data = await response1.json();
    data = data.data;

    for (let i in data) {
        if (data[i].email === email && data[i].password === password) {
            let response2 = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/customer/getCustomerByUserId/` + data[i].user_id);
            let customer = await response2.json();
            customer = customer.data;
            sessionStorage.clear();
            sessionStorage.setItem('customer_id', customer[0].customer_id);
            window.location.href = "landing.html";
        }
    }
    Swal.fire({
        title: 'Email or Password is invalid',
        icon: 'error',
    });
}