async function loadProductDetail () {
    let id = sessionStorage.getItem('product_id');
    let response = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/product/getProductById/` + id);
    let data = await response.json();
    data = data.data;
    
    $('#prodImg').attr('src', data.product_img);
    $('#prodName').text(data.product_name);
    $('#prodPrice').text("IDR " + data.price);
    $('#prodColor').text("Color: " + data.color);
    $('#totalPrice').text(data.price);
    $('.color-child').css('background-color', data.color);
    $('#inpProdId').val(data.product_id);
    $('#inpQty').val(1);
    $('#inpTotalPrice').val(data.price);
    $('#inpActPrice').val(data.price);
}

function order () {
    Swal.fire({
        title: 'Your order is in process',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#72383D',
        cancelButtonText: 'Add to Cart',
        cancelButtonColor: '#72383D',
        confirmButtonText: 'Checkout Now'
    }).then(async (result) => {
        let json = {}
        json.customer_id = parseInt(sessionStorage.getItem('customer_id'));
        json.product_id = parseInt(sessionStorage.getItem('product_id'));
        json.order_qty = parseInt($('#inpQty').val());
        json = JSON.stringify(json)

        let productResponse = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/orderItem/createOrderItem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: json
        });
        let data = await productResponse.json();
        if (result.isConfirmed) {
            window.location.href = '../html/troliCheckout.html';
        } else if (!result.isConfirmed) {
            window.history.back()
        }
    });
}

function incrementQuantity() {
    let quantityLabel = document.getElementById("quantityLabel");
    let inpQty = document.getElementById("inpQty");
    let inpPrice = document.getElementById("inpActPrice");
    let totalPrice = document.getElementById("totalPrice");

    let currentQuantity = parseInt(quantityLabel.innerText);
    let price = parseFloat(inpPrice.value);
    let newQuantity = currentQuantity + 1;
    let newTotalPrice = newQuantity * price;

    quantityLabel.innerText = newQuantity;
    inpQty.value = newQuantity;
    totalPrice.innerText = newTotalPrice;
    $('#inpTotalPrice').val(newTotalPrice);
}

function decrementQuantity() {
    let quantityLabel = document.getElementById("quantityLabel");
    let inpQty = document.getElementById("inpQty");
    let inpPrice = document.getElementById("inpActPrice");
    let totalPrice = document.getElementById("totalPrice");
    
    let currentQuantity = parseInt(quantityLabel.innerText);
    let price = parseFloat(inpPrice.value);
    
    if (currentQuantity > 1) {
        let newQuantity = currentQuantity - 1;
        let newTotalPrice = newQuantity * price;
        
        quantityLabel.innerText = newQuantity;
        inpQty.value = newQuantity;
        totalPrice.innerText = newTotalPrice;
        $('#inpTotalPrice').val(newTotalPrice);
    }
}

loadProductDetail ();
document.querySelector(".increment").addEventListener("click", incrementQuantity);
document.querySelector(".decrement").addEventListener("click", decrementQuantity);