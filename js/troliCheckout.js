async function fetchColor () {
    try {
        const response = await fetch('../json/color.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching JSON:', error);
        return {};
    }
}

async function generateTroli () {
    let customerId = sessionStorage.getItem('customer_id');
    let orderResponse = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/order/getOrderByCustomerId/` + customerId);
    let order = await orderResponse.json();
    order = order.data;
    
    let orderItemResponse = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/orderItem/getOrderItemsByOrderId/` + order[0].order_id);
    let orderItem = await orderItemResponse.json();
    orderItem = orderItem.data;

    const color = await fetchColor();
    
    let totalPrice = 0;
    const productContainer = document.getElementById('productContainer');
    const totalPriceContainer = document.getElementById('totalPrice');

    for (let i in orderItem) {
        let productResponse = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/product/getProductById/` + orderItem[i].product_id);
        let data = await productResponse.json();
        data = data.data;

        totalPrice = totalPrice + orderItem[i].order_qty * data.price;

        const productDiv = document.createElement('div');
        productDiv.classList.add('item');
        
        const backgroundColor = color[data.color] || "gray";
    
        const image = new Image();
        image.src = data.product_img;
        image.alt = data.product_img;
    
        image.addEventListener('load', () => {
            productDiv.innerHTML = `
                <div class="itemContent1">
                    <img src="${data.product_img}" alt="${data.product_img}">
                </div>
                <div class="itemContent2">
                    <div class="detailCheckout">
                        <div class="prod-name">${data.product_name}</div>
                        <div class="prod-price">${orderItem[i].order_qty} Pcs</div>
                        <div class="prod-price">IDR ${data.price}</div>
                        <div class="prod-color">
                            <div class="color">${data.color} <span class="color-child" style="background-color: ${backgroundColor};"></span></div>
                        </div>
                        <div class="cancel-order">
                            <button class="cancel-order-button" onclick="deleteOrder(${orderItem[i].order_item_id})">Delete Order</button>
                        </div>
                    </div>
                </div>
            `;
            productContainer.appendChild(productDiv);
        })
    }

    const totalPriceDiv = document.createElement('div');
    totalPriceDiv.innerHTML = `<h3><span class="total-price">Total Price: </span>IDR ${totalPrice}</h3>`
    totalPriceContainer.appendChild(totalPriceDiv);

    $('#orderTotalPrice').val(totalPrice);
}

async function deleteOrder (orderItemId) {
    let json = {}
    json.order_item_id = orderItemId;

    let productResponse = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/orderItem/deleteOrderItem`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json)
    });
    let data = await productResponse.json();

    Swal.fire({
        title: 'Order Item Deleted!',
        icon: 'success',
    }).then(() => {
        location.reload();
    });
}

async function checkout () {
    let customerId = sessionStorage.getItem('customer_id');
    let orderResponse = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/order/getOrderByCustomerId/` + customerId);
    let order = await orderResponse.json();
    order = order.data;

    let newInvoice = {}
    newInvoice.order_id = order[0].order_id;
    newInvoice.payment_amount = parseInt($('#orderTotalPrice').val());
    
    let invoiceResponse = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/invoice/createInvoice`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInvoice)
    })
    const invoiceData = await invoiceResponse.text();
    let invoice = JSON.parse(invoiceData);
    invoice = invoice.invoice;
    if (typeof invoice === 'undefined') {
        invoice = JSON.parse(invoiceData);
        invoice = invoice.checkInvoice;
        invoice = invoice[0];
    }
    
    let checkShipment = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/shipment/getShipmentByInvoiceId/` + invoice.invoice_id);
    let checkShipmentVal = await checkShipment.json();
    checkShipmentVal = checkShipmentVal.data;

    let shipmentData = checkShipmentVal; 

    if (!shipmentData || shipmentData.length === 0) {
        let newShipment = {}
        newShipment.invoice_id = invoice.invoice_id;
        newShipment.address = $('#address').val();
        newShipment.city = $('#city').val();
        newShipment.province = $('#province').val();
    
        let shipmentResponse = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/shipment/createShipment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newShipment)
        })
        shipmentData = await shipmentResponse.text();
    }


    sessionStorage.setItem("invoice_id", invoice.invoice_id);
    window.location.href = 'payment.html';
}

generateTroli();