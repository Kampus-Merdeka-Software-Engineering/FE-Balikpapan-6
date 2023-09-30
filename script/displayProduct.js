fetch('../json/dataExample2.json')
    .then(response => response.json())
    .then(data => {
        let index = 0;
        data.forEach(data => {
            if (index < 5) {
                generateProduct1(data);
                generateProduct2(data);
                generateProduct3(data);
            }
            index++;
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));

function generateProduct1(data) {
    const productContainer = document.getElementById('productList1');
    const productDiv = document.createElement('div');
    productDiv.classList.add('item');

    const image = new Image();
    image.src = data.product_img;
    image.alt = data.product_img;

    image.addEventListener('load', () => {
        productDiv.innerHTML = `
            <div class="item-image">
                <img src="${data.product_img}" alt="${data.product_img}">
            </div>
            <div class="item-name" title="${data.product_name}">${data.product_name}</div>
            <div class="item-price">IDR ${data.price}</div>
            <div class="item-button">
                <button class="prod-button" onclick="window.location.href = 'detailProduct.html';">Add to Cart</button>
            </div>
        `;
        productContainer.appendChild(productDiv);
    })

}

function generateProduct2(data) {
    const productContainer = document.getElementById('productList2');
    const productDiv = document.createElement('div');
    productDiv.classList.add('item');

    const image = new Image();
    image.src = data.product_img;
    image.alt = data.product_img;

    image.addEventListener('load', () => {
        productDiv.innerHTML = `
            <div class="item-image">
                <img src="${data.product_img}" alt="${data.product_img}">
            </div>
            <div class="item-name" title="${data.product_name}">${data.product_name}</div>
            <div class="item-price">IDR ${data.price}</div>
            <div class="item-button">
                <button class="prod-button" onclick="window.location.href = 'detailProduct.html';">Add to Cart</button>
            </div>
        `;
        productContainer.appendChild(productDiv);
    })
}

function generateProduct3(data) {
    const productContainer = document.getElementById('productList3');
    const productDiv = document.createElement('div');
    productDiv.classList.add('item');

    const image = new Image();
    image.src = data.product_img;
    image.alt = data.product_img;

    image.addEventListener('load', () => {
        productDiv.innerHTML = `
            <div class="item-image">
                <img src="${data.product_img}" alt="${data.product_img}">
            </div>
            <div class="item-name" title="${data.product_name}">${data.product_name}</div>
            <div class="item-price">IDR ${data.price}</div>
            <div class="item-button">
                <button class="prod-button" onclick="window.location.href = 'detailProduct.html';">Add to Cart</button>
            </div>
        `;
        productContainer.appendChild(productDiv);
    })
}