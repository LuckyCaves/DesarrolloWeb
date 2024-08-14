let producto3 = new Product("QuirozTejeda745966", "Producto 3", "NoHayImagen", "pieza", 20, 5, "Prueba3");
let producto4 = new Product("QuirozTejeda745966", "Producto 4", "NoHayImagen", "pieza", 25, 3, "Prueba4");
let producto5 = new Product("QuirozTejeda745966", "Producto 5", "NoHayImagen", "pieza", 30, 2, "Prueba5");
let producto6 = new Product("QuirozTejeda745966", "Producto 6", "NoHayImagen", "pieza", 35, 1, "Prueba6");

const productos = new Products()
console.log("Productos iniciales:");
console.table(productos.getProducts());
productos.addProduct(producto3);
productos.addProduct(producto4);
productos.addProduct(producto5);
productos.addProduct(producto6);

console.log("Productos después de agregar 4 elementos:");
console.table(productos.getProducts());

producto3 = new Product("QuirozTejeda745966", "Nuevo Nombre 1", "NoHayImagen", "pieza", 20, 5, "Prueba3");
producto4 = new Product("QuirozTejeda745966", "Nuevo Nombre 2", "NoHayImagen", "pieza", 25, 3, "Prueba4");
productos.updateProduct(productos.getProducts()[0].uuid, producto3);
productos.updateProduct(productos.getProducts()[1].uuid, producto4);

console.log("Productos después de actualizar nombres:");
console.table(productos.getProducts());

productos.deleteProduct(productos.getProducts()[0].uuid);

console.log("Productos después de eliminar un producto:");
console.table(productos.getProducts());

try{
    producto5.setUuid("234234");
}
catch(e){
    console.log(e);
}

try{
    producto5.setTitle("");
}
catch(e){
    console.log(e);
}
try{
    producto5.setDescription("");
}
catch(e){
    console.log(e);
}
try{
    producto5.setImageUrl("");
}
catch(e){
    console.log(e);
}
try{
    producto5.setUnit("");
}
catch(e){
    console.log(e);
}
try{
    producto5.setStock(-1);
}
catch(e){
    console.log(e);
}
try{
    producto5.setPricePerUnit(-1);
}
catch(e){
    console.log(e);
}
try{
    producto5.setCategory("")
}
catch(e){
    console.log(e);
};

let cart = new ShoppingCart(productos);
cart.addItem(producto3.uuid, 10);
cart.addItem(producto4.uuid, 5);
cart.addItem(producto6.uuid, 1);

console.log("Carrito de compras después de agregar 3 elementos:");
console.table(cart.productsProxy);
console.table(cart.productsAdded);

cart.updateItem(producto3.uuid, 2);

console.log("Carrito de compras después de actualizar cantidad:");
console.table(cart.productsProxy);
console.table(cart.productsAdded);

cart.removeItem(producto4.uuid);

console.log("Carrito de compras después de eliminar un producto:");
console.table(cart.productsProxy);
console.table(cart.productsAdded);

console.log("Total en el carrito de compras:", cart.calculateTotal());
