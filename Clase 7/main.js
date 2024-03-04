let url = "https://api.npoint.io/8d879f3eabe74d0ecc95";
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
            console.log("Guardado");
        }
    }
}