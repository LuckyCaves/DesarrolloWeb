class Products
{

    constructor()
    {
        this.products = [];
    }

    addProduct(product)
    {
        this.products.push(product);
    }

    getProducts()
    {
        return this.products;
    }

    getProductById(uuid)
    {
        return this.products.find(product => product.uuid === uuid);
    }

    createProduct(product)
    {
        this.addProduct(product);
    }

    updateProduct(uuid, updatedProduct)
    {
        this.deleteProduct(uuid);
        this.addProduct(updatedProduct);
    }

    deleteProduct(uuid)
    {
        let index = this.products.findIndex(product => product.uuid === uuid);
        this.products.splice(index, 1);
    }

}