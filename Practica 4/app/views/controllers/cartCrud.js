function getSessionCart()
{
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    if(cart == null)
    {
        cart = new ShoppingCart();
    }

    return cart;
}


function getAllProducts(cart)
{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/products', true);
    
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            cart._products = response;
            setSessionCart(cart);
        } else {
            console.error('Request failed. Status:', xhr.status);
        }
    };

    xhr.send();
}

function setSessionCart(cart)
{
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

class ShoppingCartException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class ProductProxy {
    constructor(productUuid, amount) {
        this.productUuid = productUuid;
        this.amount = amount;
    }    
}

class ShoppingCart {
    
    constructor(cart) {
        if(cart !== undefined) {
            this.products = cart._products;
            this._productProxies = cart._productProxies;
        }
        else
        {
            this.products = [];
            this._productProxies = [];
        }
        getAllProducts(this);
    }

    get productProxies() {
        return this._productProxies;
    }

    set productProxies(value) {
        throw new ShoppingCartException("Unable to modify proxies directly, use the corresponding methods instead.");
    }

    get products() {
        return this._products;
    }

    set products(value) {
        this._products = [];
        if (typeof value === 'string') {
            value = JSON.parse(value);
        }
        if (Array.isArray(value)) {
            for (let product of value) {
                this._products.push(Product.createFromObject(product));
            }
        } else {
            this._products.push(Product.createFromObject(value));
        }
    }

    addItem(productUuid, amount) {
        if (amount == 0) return; // Ignore empty items
        if (amount < 0) throw ShoppingCartException("Number of items to add must be a positive number.");
        if (productUuid == undefined) throw ShoppingCartException("ProductUuid not received.");
        
        let newItem = new ProductProxy(productUuid, parseInt(amount));
        let oldItem = this.productProxies.find(item => item.productUuid === productUuid);

        if (oldItem) {
            oldItem.amount += parseInt(newItem.amount); // Update existing value by adding both amounts.
        } else {
            this.productProxies.push(newItem); // Add item to shopping cart.
        }

        setSessionCart(this);
    }

    updateItem(productUuid, newAmount) {
        if (newAmount == 0) removeItem(productUuid);
        if (newAmount < 0) throw ShoppingCartException("Number of items to add must be a positive number.");

        let oldItem = this.productProxies.find(item => item.productUuid === productUuid);
        if (!oldItem) {
            throw ShoppingCartException("Product was not found in shopping cart, unable to update.");
        }

        oldItem.amount = newAmount;

        setSessionCart(this);
    }

    removeItem(productUuid) {
        let itemIndex = this.productProxies.findIndex(item => item.productUuid === productUuid);
        if (itemIndex < 0) {
            throw ShoppingCartException("Product was not found in shopping cart, unable to remove.");
        }
        this.productProxies.splice(itemIndex, 1); // Remove specified item.

        setSessionCart(this);
    }

    calculateTotal() {
        let total = 0;
        for (let productProxy of this.productProxies) {
            let product = this.products.find(item => item.uuid === productProxy.productUuid);
            total += (product.pricePerUnit * productProxy.amount);
        }
        return total;
    }
}