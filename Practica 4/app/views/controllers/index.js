let cart = getSessionCart();

function changePage(pageNumber)
{
    getProducts(pageNumber, moveDown);

    if(pageNumber === 1)
    {
        document.getElementById('2').parentElement.className = "page-item";
        document.getElementById('1').parentElement.className = "page-item active";
    }
    else
    {
        document.getElementById('1').parentElement.className = "page-item";
        document.getElementById('2').parentElement.className = "page-item active";
    }
}

function moveDown()
{
    window.scrollTo(0, document.getElementById('productos').offsetTop);

}

function getProducts(pageNumber, functionToExecute)
{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/products', true);
    
    xhr.setRequestHeader('Content-Type', 'application/json');
    if(pageNumber !== undefined)
    {
        deleteListener();
        cleanProductsCard();
        xhr.setRequestHeader('page', pageNumber);
    }

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            response.forEach(function(product) {
                addProductCard(product);
            });

            if(functionToExecute !== undefined)
                functionToExecute();

            addListener();

        } else {
            console.error('Request failed. Status:', xhr.status);
        }
    };

    xhr.onerror = function() {
        console.error('Request error');
    };

    xhr.send();
}

function cleanProductsCard()
{
    let productsContainer = document.getElementsByClassName('row')[0];
    while(productsContainer.firstChild)
    {
        productsContainer.innerHTML = '';
    }
}

function addProductCard(product)
{
    let productCard = document.createElement('div');
    productCard.id = "card-container";
    productCard.className = 'col-lg-3 col-lg-3 col-md-4 col-sm-6 d-flex align-items-stretch';

    let card = document.createElement('div');
    card.className = 'card h-100';

    let imgProduct = document.createElement('img');
    imgProduct.src = "http://localhost:3000" + product._imageUrl;
    imgProduct.className = 'card-img-top';
    imgProduct.alt = product._title;

    let productName = document.createElement('h4');
    productName.className = 'card-title';
    productName.textContent = product._title;

    let productDescription = document.createElement('p');
    productDescription.className = 'card-text';
    productDescription.textContent = product._description;

    let button = document.createElement('button');
    button.id = 'addCart';
    button.className = 'btn btn-primary';
    button.textContent = 'Agregar al carrito';
    button.setAttribute('data-product-id', product._uuid);
    button.type = 'button';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modalCart');

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    cardBody.appendChild(imgProduct);
    cardBody.appendChild(productName);
    cardBody.appendChild(productDescription);
    cardBody.appendChild(button);

    card.appendChild(cardBody);

    productCard.appendChild(card);

    let productsContainer = document.getElementsByClassName('row')[0];
    productsContainer.appendChild(productCard);

}

function addListener()
{
    let botonesAgregarCarrito = document.querySelectorAll('#addCart');
    let confirmButton = document.getElementById('confirmarBtn');
    
    botonesAgregarCarrito.forEach(function(boton){
        boton.addEventListener('click', addCartListener)});

    confirmButton.addEventListener('click', confirmButtonListener);
}

let addCartListener = function()
{
    let productId = this.getAttribute('data-product-id');
    let confirmButton = document.getElementById('confirmarBtn');
    confirmButton.setAttribute('data-product-id', productId);
}

let confirmButtonListener = function()
{
    let productId = this.getAttribute('data-product-id');
    let cantidad = document.getElementById('quantity').value;
    let cart = new ShoppingCart(getSessionCart());
    try{
        cart.addItem(productId, cantidad);
        alert("Producto agregado al carrito");
    }
    catch(e){
        alert(e.errorMessage);
    }
}

function deleteListener()
{
    let botonesAgregarCarrito = document.querySelectorAll('#addCart');
    let confirmButton = document.getElementById('confirmarBtn');

    botonesAgregarCarrito.forEach(function(boton){
        boton.removeEventListener('click', addCartListener)
    });

    confirmButton.removeEventListener('click', confirmButtonListener);
}


window.onload = function()
{
    getProducts(1);

    
    document.getElementById('1').addEventListener('click', function(event){
        event.preventDefault(); 
        changePage(1);
    });
    document.getElementById('2').addEventListener('click', function(event){
        event.preventDefault();
        changePage(2);
    });
};