class ShoppingCart
{
    constructor(productos) {
        this.productsProxy = [];
        this.productsAdded = [];
        this.lista = productos;
    }

    addItem(productUuid, amount) 
    {
        const existingProduct = this.productsProxy.find(product => product.uuid === productUuid);

        if (existingProduct) 
            existingProduct.cantidad += amount;
        else {
            const newProduct = new ProductProxy(productUuid, amount);
            this.productsAdded.push(this.lista.getProductById(productUuid));
            this.productsProxy.push(newProduct);
        }
    }

    updateItem(productUuid, amount) 
    {
        const existingProduct = this.productsProxy.find(product => product.uuid === productUuid);

        if (!existingProduct) 
            throw new ShoppingCartException("Product not found in shopping cart");

        if(amount < 0)
            throw new ShoppingCartException("Amount must be greater or equal to 0");
        else if(amount === 0)
            this.removeItem(productUuid);
        else
            existingProduct.cantidad = amount;
    }

    removeItem(productUuid) 
    {
        const existingProductIndex = this.productsProxy.findIndex(product => product.uuid === productUuid);

        if (existingProductIndex === -1) 
            throw new ShoppingCartException("Product not found in shopping cart");

        this.productsProxy.splice(existingProductIndex, 1);
    }

    calculateTotal()
    {
        let total = 0;
        this.productsProxy.forEach(product => {
            let productInfo = this.lista.getProductById(product.uuid);
            total += productInfo.pricePerUnit * product.cantidad;
        });
        return total;
    }

}

class ProductProxy
{
    constructor(uuid, cantidad) {
        this.uuid = uuid;
        this.cantidad = cantidad;
    }
}

class ShoppingCartException
{
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}