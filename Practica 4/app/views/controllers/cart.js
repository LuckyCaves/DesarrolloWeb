function showProductsCart(cart)
{

    let i = 0;
    cart._productProxies.forEach(product => {
        let productData = cart._products.find(productC => productC._uuid == product.productUuid);
        addProductCard(productData , product);
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
    button.id = 'trashButton';
    button.className = 'btn btn-danger';

    button.addEventListener('click', function(){
        let cart = new ShoppingCart(getSessionCart());
        cart.removeItem(proxie.productUuid);
        window.location.reload();
    });

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
    inputQuantity.setAttribute('data-product-id', proxie.productUuid);

    let input_group_quantity = document.createElement('span');
    input_group_quantity.className = 'input-group-text';
    input_group_quantity.textContent = 'Cantidad:';

    let inputQ = document.createElement('input');
    inputQ.type = 'number';
    inputQ.className = 'form-control';
    inputQ.id = 'Quantity';
    inputQ.required = true;
    inputQ.disabled = true;
    inputQ.value = proxie.amount;

    let spanEdit = document.createElement('span');
    spanEdit.className = 'input-group-text';
    spanEdit.id = 'spanEdit';

    addEditButton(spanEdit);

    inputQuantity.appendChild(input_group_quantity);
    inputQuantity.appendChild(inputQ);
    inputQuantity.appendChild(spanEdit);

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
    inputP.disabled = true;
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

function addEditButton(spanEdit)
{

    let buttonEdit = document.createElement('button');
    buttonEdit.id = 'editButton';
    buttonEdit.className = 'btn btn-success';

    buttonEdit.addEventListener('click', function(){
        let parent = spanEdit.parentElement;
        let input = parent.querySelector('input');
        input.disabled = false;
        addConfirmButtons(spanEdit);
    });

    let pencil = document.createElement('i');
    pencil.className = 'fa-solid fa-pencil';
    pencil.setAttribute('style', 'color: white;');

    buttonEdit.appendChild(pencil);
    spanEdit.appendChild(buttonEdit);

}

function addConfirmButtons(spanConfirm)
{
    spanConfirm.innerHTML = '';

    let buttonConfirm = document.createElement('button');
    buttonConfirm.id = 'checkButton';
    buttonConfirm.className = 'btn btn-success';

    buttonConfirm.addEventListener('click', function(){
        let parent = spanConfirm.parentElement;
        let input = parent.querySelector('input');
        let value = parseInt(input.value);
        input.disabled = true;

        let cart = new ShoppingCart(getSessionCart());
        let productUuid = parent.getAttribute('data-product-id');

        if(isNaN(value))
        {
            value = cart._productProxies.find(product => product.productUuid == productUuid).amount;
            alert('No se introdujo un valor válido.');
        }
        else if(value == 0)
            cart.removeItem(productUuid);
        else if(value < 0)
        {
            value = cart._productProxies.find(product => product.productUuid == productUuid).amount;
            alert('La cantidad no puede ser negativa.');
        }
        else
            cart.updateItem(productUuid, value);

        setSessionCart(cart);
        window.location.reload();
    });

    let check = document.createElement('i');
    check.className = 'fa-solid fa-check';
    check.setAttribute('style', 'color: white;');

    buttonConfirm.appendChild(check);

    let buttonCancel = document.createElement('button');
    buttonCancel.id = 'xButton';
    buttonCancel.className = 'btn btn-danger';

    buttonCancel.addEventListener('click', function(){
        let parent = spanConfirm.parentElement;
        let input = parent.querySelector('input');
        input.disabled = true;

        let cart = new ShoppingCart(getSessionCart());
        let productUuid = parent.getAttribute('data-product-id');

        input.value = cart._productProxies.find(product => product.productUuid == productUuid).amount;

        setSessionCart(cart);
        window.location.reload();
    });

    let x = document.createElement('i');
    x.className = 'fa-solid fa-x';
    x.setAttribute('style', 'color: white;');

    buttonCancel.appendChild(x);

    spanConfirm.appendChild(buttonConfirm);
    spanConfirm.appendChild(buttonCancel);

}

function addSummaryCard()
{

    let summary = document.getElementById('summary');

    let title = document.createElement('h4');
    title.textContent = 'Resumen de compra';
    summary.appendChild(title);

    let cart = new ShoppingCart(getSessionCart());

    cart._productProxies.forEach(product => {
        let productData = cart._products.find(productC => productC._uuid == product.productUuid);

        let p = document.createElement('p');
        p.textContent = productData._title + ': ' + product.amount + ' x $' + productData._pricePerUnit;

        summary.appendChild(p);
    });

    let total = document.createElement('p');
    total.textContent = 'Total: $' + cart.calculateTotal();

    let buttonComprar = document.createElement('button');
    buttonComprar.className = 'btn btn-primary';
    buttonComprar.textContent = 'Comprar';

    let br = document.createElement('br');
    
    let buttonCancelar = document.createElement('button');
    buttonCancelar.className = 'btn btn-danger';
    buttonCancelar.textContent = 'Cancelar';

    summary.appendChild(total);
    summary.appendChild(buttonComprar);
    summary.appendChild(br);
    summary.appendChild(buttonCancelar);

}


window.onload = function()
{
    let cart = new ShoppingCart(getSessionCart());
    showProductsCart(cart);
    addSummaryCard();
};