const cardNumberInput = document.querySelector('.card-number-input');
const cardNumberBox = document.querySelector('.card-number-box');

cardNumberInput.addEventListener('input', () => {
    const cleanedValue = cardNumberInput.value.replace(/[^\d]/g, '');
    const formattedValue = cleanedValue.replace(/(\d{4}(?=\d))/g, '$1 ');
    cardNumberBox.innerText = formattedValue;
});

document.querySelector('.card-holder-input').oninput = () => {
    document.querySelector('.card-holder-name').innerText = document.querySelector('.card-holder-input').value;
}

document.querySelector('.month-input').oninput = () => {
    document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
}

document.querySelector('.year-input').oninput = () => {
    document.querySelector('.exp-year').innerText = document.querySelector('.year-input').value;
}

document.querySelector('.cvv-input').onmouseenter = () => {
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
}

document.querySelector('.cvv-input').onmouseleave = () => {
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
}

document.querySelector('.cvv-input').oninput = () => {
    document.querySelector('.cvv-box').innerText = document.querySelector('.cvv-input').value;
}

async function paid() {
    let customerId = parseInt(sessionStorage.getItem('customer_id'));

    let json = {}
    json.customer_id = customerId;
    json.card_no = parseInt($('#card_no').val());
    json.card_holder = $('#card_holder').val();
    json.expiration_month = $('#expiration_month').val();
    json.expiration_year = $('#expiration_year').val();
    json.cvv = parseInt($('#cvv').val());

    let pmResponse = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/paymentMethod/createPaymentMethod`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json)
    })
    let pm = await pmResponse.json();
    pm = pm.data;

    let orderResponse = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/order/getOrderByCustomerId/` + customerId);
    let order = await orderResponse.json();
    order = order.data;
    order = order[0];

    let cp = {};
    cp.order_id = order.order_id;

    let orderCompleteResponse = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/order/orderComplete`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cp)
    })
    let orderComplete = await orderCompleteResponse.json();

    Swal.fire({
        title: 'Payment Complete',
        icon: 'success',
        showConfirmButton: true,
    }).then(() => {
        window.location.href = 'landing.html';
    });

    window.location.href = 'landing.html';
}