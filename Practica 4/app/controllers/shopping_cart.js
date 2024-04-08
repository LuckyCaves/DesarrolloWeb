"use strict";

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
    
    constructor() {
        this.products = [];
        this._productProxies = [];
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
        
        let newItem = new ProductProxy(productUuid, amount);
        let oldItem = this.productProxies.find(item => item.productUuid === productUuid);

        if (oldItem) {
            oldItem.amount += newItem.amount; // Update existing value by adding both amounts.
        } else {
            this.productProxies.push(newItem); // Add item to shopping cart.
        }
    }

    updateItem(productUuid, newAmount) {
        if (newAmount == 0) removeItem(productUuid);
        if (newAmount < 0) throw ShoppingCartException("Number of items to add must be a positive number.");

        let oldItem = this.productProxies.find(item => item.productUuid === productUuid);
        if (!oldItem) {
            throw ShoppingCartException("Product was not found in shopping cart, unable to update.");
        }

        oldItem.amount = newAmount;
    }

    removeItem(productUuid) {
        let itemIndex = this.productProxies.findIndex(item => item.productUuid === productUuid);
        if (itemIndex < 0) {
            throw ShoppingCartException("Product was not found in shopping cart, unable to remove.");
        }
        this.productProxies.splice(itemIndex, 1); // Remove specified item.
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

module.exports = ShoppingCart;