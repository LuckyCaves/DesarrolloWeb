function productoMasCaro() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/products', true);

    xhr.setRequestHeader('task', "1");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200)
        {
            document.getElementById("productos").innerHTML = xhr.responseText;
        }
        else if(xhr.readyState === 4)
        {
            console.log("Error: " + xhr.status);
        }
    };

    xhr.send();
}

function productoPrecioPromedio() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/products', true);

    xhr.setRequestHeader('task', "2");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200)
        {
            document.getElementById("productos").innerHTML = xhr.responseText;
        }
        else if(xhr.readyState === 4)
        {
            console.log("Error: " + xhr.status);
        }
    };

    xhr.send();
}

function obtenerProductos() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/products', true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200)
        {
            document.getElementById("productos").innerHTML = xhr.responseText;
        }
        else if(xhr.readyState === 4)
        {
            console.log("Error: " + xhr.status);
        }
    };

    xhr.send();
}