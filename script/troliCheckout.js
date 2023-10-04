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

    const productContainer = document.getElementById('productContainer');

    for (let i in orderItem) {
        let productResponse = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/product/getProductById/` + orderItem[i].product_id);
        let data = await productResponse.json();
        data = data.data;

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
        generateTroli();
    });
}

generateTroli();