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
        // let newProduct = new Product(product.uuid, product.title, product.description, product.imageUrl, product.unit, product.stock, product.pricePerUnit, product.category);
        this.addProduct(product);
    }

    updateProduct(uuid, updatedProduct)
    {
        this.deleteProduct(uuid);
        // let newProduct = new Product(updatedProduct.uuid, updatedProduct.title, updatedProduct.description, updatedProduct.imageUrl, updatedProduct.unit, updatesProduct.stock, updatedProduct.pricePerUnit, updatedProduct.category);
        this.addProduct(updatedProduct);
    }

    deleteProduct(uuid)
    {
        let index = this.products.findIndex(product => product.uuid === uuid);
        this.products.splice(index, 1);
    }

}