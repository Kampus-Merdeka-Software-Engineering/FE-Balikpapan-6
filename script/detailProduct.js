function img(anything) {
    document.querySelector('.slide').src = anything;
}

function change(change) {
    const line = document.querySelector('.home');
    line.style.background = change;
}

const quantityLabel = document.getElementById('quantityLabel');
const totalPriceLabel = document.getElementById('totalPrice');
let qty = 1;
let totalPrice = 150000;

function updateLabel() {
    quantityLabel.textContent = qty.toString();
    totalPriceLabel.textContent = (qty * totalPrice).toString(); 
}

document.querySelector('.increment').addEventListener('click', function () {
    qty++;
    updateLabel();
});

document.querySelector('.decrement').addEventListener('click', function () {
    if (qty > 0) {
        qty--;
        updateLabel();
    }
});

const colorButtons = document.querySelectorAll('.color-child');

colorButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        colorButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});


function order() {
    Swal.fire({
        title: 'Your order is in process',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#72383D',
        cancelButtonText: 'Add to Cart',
        cancelButtonColor: '#72383D',
        confirmButtonText: 'Checkout Now'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '../html/troliCheckout.html';
        } else {
            window.location.href = '../html/troliCheckout.html';
        }
    });
}