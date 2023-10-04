async function generateProduct1() {
    let response = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/product/getProductsByCategory/FORMAL`);
    let data = await response.json();
    data = data.data;

    generateProduct(data, 'productList1');
}

async function generateProduct2() {
    let response = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/product/getProductsByCategory/JACKET`);
    let data = await response.json();
    data = data.data;

    generateProduct(data, 'productList2');
}

async function generateProduct3() {
    let response = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/product/getProductsByCategory/PANTS`);
    let data = await response.json();
    data = data.data;

    generateProduct(data, 'productList3');
}

async function generateProduct4() {
    let response = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/product/getProductsByCategory/JEWELRY`);
    let data = await response.json();
    data = data.data;

    generateProduct(data, 'productList4');
}

async function generateProduct5() {
    let response = await fetch(`https://be-balikpapan-6-production.up.railway.app/api/product/getProductsByCategory/SHIRT`);
    let data = await response.json();
    data = data.data;

    generateProduct(data, 'productList5');
}

function generateProduct(data, id) {
    const productContainer = document.getElementById(id);

    let index = 0;
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
        index++;
        if (index == 5) {
            break;
        }
    }
}

function directToDisplayProductSpecific (category) {
    sessionStorage.setItem('category', category);
    window.location.href = "displayProductSpecific.html";
}

generateProduct1();
generateProduct2();
generateProduct3();
generateProduct4();
generateProduct5();