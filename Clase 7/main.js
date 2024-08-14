let url = "https://api.npoint.io/8d879f3eabe74d0ecc95";
let url2 = "https://jsonplaceholder.typicode.com/users";
let datos = {var1: "Hola1", var_2: "Mundo"};

function guardarEnJSON(datos, urlJSON)
{
    let xhr = new XMLHttpRequest();

    xhr.open("POST", urlJSON, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(datos));
    xhr.onload = function()
    {
        if(xhr.status != 200)
        {
            alert(chr.status)
        }
        if(xhr.status == 200)
        {
            console.log("Guardado:", xhr.responseText);
        }
    }
}

function obtenerEnJSON(urlJSON, id){

    let xhr = new XMLHttpRequest();

    if(id != undefined)
    {
        urlJSON += "/" + id;
    }

    xhr.open("GET", urlJSON, true);
    xhr.send();
    xhr.onload = function()
    {
        if(xhr.status != 200)
        {
            alert("Error:", xhr.status, " Usuario no existente")
        }
        else if(xhr.status == 200)
        {
            let datosUsuario = JSON.parse(xhr.responseText);
            document.getElementById("correo").innerHTML = datosUsuario.name + " " + datosUsuario.email;
            console.log(datosUsuario);
        }
    }

}