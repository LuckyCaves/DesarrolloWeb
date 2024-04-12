function getSessionCart()
{

    let cart = [];

    if(sessionStorage.getItem('cart') !== undefined)
        cart = JSON.parse(sessionStorage.getItem('cart'));

    console.log(cart);

    return cart;

}

function addProductsCart(cart)
{

    let i = 0;
    cart._products.forEach(product => {
        addProductCard(product, cart._productProxies[i]);
        i++;
    });

}

function addProductCard(product, proxie)
{

    let productCart = document.createElement('div');
    productCart.id = 'productCart';
    productCart.className = 'media';

    let body = document.createElement('div');
    body.className = 'media-body';

    let title = document.createElement('h4');
    title.textContent = product._title;

    let button = document.createElement('button');

    let trash = document.createElement('i');
    trash.className = 'fa-solid fa-trash';
    trash.setAttribute('style', 'color: white;');

    button.appendChild(trash);
    title.appendChild(button);

    let paymentContainer = document.createElement('div');
    paymentContainer.id = 'payment-container';

    let inputQuantity = document.createElement('div');
    inputQuantity.id = 'inputQuantity';
    inputQuantity.className = 'input-group mb-3';

    let input_group_quantity = document.createElement('span');
    input_group_quantity.className = 'input-group-text';
    input_group_quantity.textContent = 'Cantidad:';

    let inputQ = document.createElement('input');
    inputQ.type = 'number';
    inputQ.className = 'form-control';
    inputQ.id = 'Quantity';
    inputQ.required = true;
    inputQ.value = proxie.amount;

    inputQuantity.appendChild(input_group_quantity);
    inputQuantity.appendChild(inputQ);

    let inputPrice = document.createElement('div');
    inputPrice.id = 'inputQuantity';
    inputPrice.className = 'input-group mb-3';

    let input_group_price = document.createElement('span');
    input_group_price.className = 'input-group-text';
    input_group_price.textContent = 'Precio:';

    let inputP = document.createElement('input');
    inputP.type = 'number';
    inputP.className = 'form-control';
    inputP.id = 'Quantity';
    inputP.required = true;
    inputP.value = product._pricePerUnit;

    let moneda = document.createElement('span');
    moneda.id = 'moneda';
    moneda.className = 'input-group-text';
    moneda.textContent = 'MXN:';

    inputPrice.appendChild(input_group_price);
    inputPrice.appendChild(inputP);
    inputPrice.appendChild(moneda);

    paymentContainer.appendChild(inputQuantity);
    paymentContainer.appendChild(inputPrice);

    body.appendChild(title);
    body.appendChild(paymentContainer);

    let image = document.createElement('img');
    image.src = product._imageUrl;

    productCart.appendChild(body);
    productCart.appendChild(image);

    let cartContainer = document.getElementById('productos');

    cartContainer.appendChild(productCart);

}

window.onload = function()
{
    let cart = getSessionCart();
    addProductsCart(cart);
};