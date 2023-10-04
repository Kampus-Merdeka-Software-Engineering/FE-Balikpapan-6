async function generateProduct() {
    let response = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/product/getProducts`);
    let data = await response.json();
    data = data.data;

    const bestSellingContainer = document.getElementById('best-selling-container');

    data.sort(() => getRandomSortValue());
    for (let i=0; i<8; i++) {
        const productDiv = document.createElement('div');
        productDiv.classList.add('best');
    
        const image = new Image();
        image.src = data[i].product_img;
        image.alt = data[i].product_img;
    
        image.addEventListener('load', () => {
            productDiv.innerHTML = `
                <div class="item-image">
                    <img src="${data[i].product_img}" alt="${data[i].product_img}">
                </div>
                <div class="best-caption">
                    <div class="name-best" title="${data[i].product_name}">
                        <h3>${data[i].product_name}</h3>
                    </div>
                    <div class="price">
                        <h2>IDR ${data[i].price}</h2>
                    </div>
                </div>
                <div class="buy-now">
                    <button class="buy-button" onclick="sessionStorage.setItem('product_id', '${data[i].product_id}'); window.location.href = 'detailProduct.html';">BUY NOW</button>
                </div>
            `;
            bestSellingContainer.appendChild(productDiv);
        })
    }
}

function getRandomSortValue() {
    return Math.random() * 2 - 1;
}

generateProduct();