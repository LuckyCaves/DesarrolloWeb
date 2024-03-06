let producto1 = new Product("QuirozTejeda745966", "Producto 1", "NoHayImagen", "pieza", 15, 10, "Prueba1");
let producto2 = new Product("QuirozTejeda745966", "Producto 2", "NoHayImagen", "pieza", 10, 15, "Prueba2");
const productos = new Products()
productos.addProduct(producto1)
productos.addProduct(producto2)
console.table(productos.getProducts()) 
let shopCart = new ShoppingCart()
shopCart.addItem("5386dc0a-9274-417d-b44d-14888ad03c98", 1); 