fetch('../json/dataExample1.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(data => {
            generateProduct(data);
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));

function generateProduct(product) {
    const bestSellingContainer = document.getElementById('best-selling-container');
    const productDiv = document.createElement('div');
    productDiv.classList.add('best');

    const image = new Image();
    image.src = product.product_img;
    image.alt = product.product_img;

    image.addEventListener('load', () => {
        productDiv.innerHTML = `
            <img src="${product.product_img}" alt="${product.product_name}">
            <div class="best-caption">
                <div class="name-best" title="${product.product_name}">
                    <h3>${product.product_name}</h3>
                </div>
                <div class="price">
                    <h2>IDR ${product.price}</h2>
                </div>
            </div>
            <div class="buy-now">
                <button class="buy-button" onclick="window.location.href = 'detailProduct.html';">BUY NOW</button>
            </div>
        `;
        bestSellingContainer.appendChild(productDiv);
    })
}