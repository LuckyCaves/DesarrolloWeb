function getProducts(pageNumber)
{
    cleanProductsCard();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/products', true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    if(pageNumber !== undefined)
        xhr.setRequestHeader('page', pageNumber);

    xhr.onload = function() {
        if (xhr.status === 200) {
            // Request was successful
            const response = JSON.parse(xhr.responseText);
            response.forEach(function(product) {
                addProductCard(product);
            });
        } else {
            // Request failed
            console.error('Request failed. Status:', xhr.status);
        }
    };

    xhr.onerror = function() {
        // An error occurred during the request
        console.error('Request error');
    };

    xhr.send();
}

function cleanProductsCard()
{
    let productsContainer = document.getElementsByClassName('row')[0];
    while(productsContainer.firstChild)
    {
        productsContainer.removeChild(productsContainer.firstChild);
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

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    cardBody.appendChild(imgProduct);
    cardBody.appendChild(productName);
    cardBody.appendChild(productDescription);

    card.appendChild(cardBody);

    productCard.appendChild(card);

    let productsContainer = document.getElementsByClassName('row')[0];
    productsContainer.appendChild(productCard);

}

window.onload = function()
{

    let navItems = document.querySelectorAll('li.nav-item a');

    navItems.forEach((el) => {
        el.addEventListener('click',() => {
            if (!el.classList.contains('active')) {
                navItems.forEach((others) => {
                //Remove the update to innerHTML for all of the items however you plan on doing that, I would suggest just adding or removing a class to update their style
                    others.classList.remove('active');
                });
                el.classList.add('active');
            };
        });
    });

    getProducts(1);
};