function readUsers(con_auth) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/users', true);

    if(con_auth)
        xhr.setRequestHeader('x-auth', "PASS123");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200)
        {
            alert("Los usuarios fueron leídos");
            console.table(JSON.parse(xhr.responseText));
        }
        else if(xhr.readyState === 4)
        {
            alert('No autorizado');
        }
    };

    xhr.send();
}