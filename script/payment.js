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

function paid() {
    Swal.fire({
        title: 'Payment Complete',
        icon: 'success',
        showConfirmButton: true,
    }).then(() => {
        window.location.href = '../html/landing.html';
    });
}