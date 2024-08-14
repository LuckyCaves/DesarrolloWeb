
window.onload = function() {
    const suma = document.querySelector('#suma');
    const resta = document.querySelector('#resta');
    const enviar = document.querySelector('#enviar');
    const input = document.getElementById('entrada');
    let total = 0;
    let clickSuma = 0;
    // Now you can use button1 and button2 to manipulate the buttons as needed

    suma.addEventListener('click', () => {
        total++;
        document.querySelector('#numero').innerHTML = total;
        clickSuma++;
        document.querySelector('#clickCounter').innerHTML = "Contador <b>" + clickSuma + "</b>";
    }
    );
    
    resta.addEventListener('click', () => {
        total--;
        document.querySelector('#numero').innerHTML = total;
        clickSuma++;
        document.querySelector('#clickCounter').innerHTML = "Contador <b>" + clickSuma + "</b>";
        }
    );

    enviar.addEventListener('click', () => {
        
        const input = document.querySelector("#entrada");
        const valor = input.value;
        input.value = "";
        alert("Enviado");

        }
    );

    input.addEventListener('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            enviar.click();
        }
    });
    

}
