function httpGet(Url, callback)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            callback(JSON.parse(xhr.responseText));
        }
    }

    xhr.open("GET", Url, true);
    xhr.send(null);
}

function httpPost(Url, datos)
{
    var xhr = new XMLHttpRequest();

    xhr.open("POST", Url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(datos));
}

function showProducts()
{
    httpGet("http://localhost:3000/products", handleProduct);
}

function handleProduct(products)
{

    let table = document.getElementById("tableBody");
    
    for(let i = 0; i < products.length; i++)
    {
        let row = table.insertRow(i);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = products[i].name;
        cell2.innerHTML = products[i].sku;
        cell3.innerHTML = products[i].price;
    }
}

function addProduct(product)
{
    httpPost("http://localhost:3000/products", product);
}

function getProduct(param)
{
    httpGet("http://localhost:3000/products/?" + param, handleProduct);
}

showProducts();
const nuevoProducto = {"name": "Producto 4", "sku": "PROD-4", "price": 400};