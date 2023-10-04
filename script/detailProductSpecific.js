async function generateProduct(category) {
    let response = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/product/getProductsByCategory/` + category);
    let data = await response.json();
    data = data.data;

    $('#category-title').text(category);
    const productContainer = document.getElementById('productList');
    for (let i in data) {
        const productDiv = document.createElement('div');
        productDiv.classList.add('item');

        const image = new Image();
        image.src = data[i].product_img;
        image.alt = data[i].product_img;

        image.addEventListener('load', () => {
            productDiv.innerHTML = `
                <div class="item-image">
                    <img src="${data[i].product_img}" alt="${data[i].product_img}">
                </div>
                <div class="item-name" title="${data[i].product_name}">${data[i].product_name}</div>
                <div class="item-price">IDR ${data[i].price}</div>
                <div class="item-button">
                    <button class="prod-button" onclick="sessionStorage.setItem('product_id', '${data[i].product_id}'); window.location.href = 'detailProduct.html';">Add to Cart</button>
                </div>
            `;
            productContainer.appendChild(productDiv);
        });
    }
}

generateProduct(sessionStorage.getItem('category'));