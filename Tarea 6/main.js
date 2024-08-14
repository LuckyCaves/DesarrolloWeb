
// Ejercicio 1

let libros = [];

for (let i = 0; i < 10; i++) {
    const id = i + 1;
    const año = Math.floor(Math.random() * (2020 - 2000 + 1)) + 2000;
    const autor = "Autor " + Math.floor(Math.random() * 100 + 1);
    const fecha = new Date(`${año}-01-01T12:00:00.000Z`);

    libros.push({ id, año, autor, fecha });
}

console.table(libros);

const librosJSON = JSON.stringify(libros);
console.log(librosJSON);


//Ejercicio 2

const nuevoLibro = { id: 0, año: 2022, autor: "Nuevo Autor", fecha: new Date() };
libros.unshift(nuevoLibro);

function reverseOrder(arr) {
  return arr.reverse();
}

const librosInversos = reverseOrder(libros);
libros = [];

console.table(librosInversos);

//Ejercicio 3

const librosCopy = librosInversos.slice();

function quitarLibro(id, arr) {
    const index = arr.findIndex(book => book.id === id);
    if (index !== -1) {
        arr.splice(index, 1);
    }
}

function librosYear(year, arr) {
    return arr.filter(book => book.año <= year);
}

quitarLibro(1, librosCopy);
console.table(librosYear(2021, librosCopy));

// Ejercicio 4
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

libros = [];
for (let i = 0; i < 20; i++) {
  const clave = getRandomNumber(100, 999);
  const palabras = getRandomNumber(1000, 100000);
  libros.push({clave, palabras});
}


const nuevolibro = { clave: getRandomNumber(100, 999), palabras: getRandomNumber(1000, 100000) };
libros.splice(7, 0, nuevolibro);

libros.sort((a, b) => a.clave - b.clave);

function estadisticas(libros, opcion) {
  switch (opcion) {
    case 'T':
      let totalPalabras = 0;
      for (const libro of libros) {
        totalPalabras += libro.palabras;
      }
      return `Suma total de palabras: ${totalPalabras}`;
    case 'P':
      let totalpalabras = 0;
      for (const libro of libros) {
        totalpalabras += libro.palabras;
      }
      const promedioPalabras = totalpalabras / libros.length;
      return `Palabras promedio: ${promedioPalabras}`;
    case 'MX':
        let maxLibro = libros[0];
        for (const libro of libros) {
            if (libro.palabras > maxLibro.palabras) {
                maxLibro = libro;
            }
        }
        return `Libro con más palabras: ${maxLibro.clave}-${maxLibro.palabras}`;
    case 'MN':
        let minLibro = libros[0];
        for (const libro of libros) {
            if (libro.palabras < minLibro.palabras) {
                minLibro = libro;
            }
        }
        return `Libro con menos palabras: ${minLibro.clave}-${minLibro.palabras}`;
    default:
        return 'Opcion Invalida';
    }
}

console.log(estadisticas(libros, 'T')); 
console.log(estadisticas(libros, 'P')); 
console.log(estadisticas(libros, 'MX'));
console.log(estadisticas(libros, 'MN'));
