const calificaciones = [
  [6, 8, 5, 5, 10],
  [6, 5, 7, 3, 8],
  [5, 5, 8, 1, 4],
  [6, 9, 8, 10, 5],
  [5, 8, 5, 7, 9]
];

// Función para determinar si un grupo aprobó
function fnAprobado(grupo, promedio) {
  console.log(`El grupo ${grupo} aprobó con un promedio de ${promedio}`);
}

function fnReprobado(grupo, promedio) {
  console.log(`El grupo ${grupo} reprobó con un promedio de ${promedio}`);
}

function getPromedio(arr) {
  const sum = arr.reduce((acc, curr) => acc + curr, 0);
  return sum / arr.length;
}

function getCalificaciones(calificaciones, fnReprobado, fnAprobado, getPromedio) {
  calificaciones.forEach((grupo, index) => {
    const promedio = getPromedio(grupo);
    if (promedio >= 6) {
      fnAprobado(index + 1, promedio);
    } else {
      fnReprobado(index + 1, promedio);
    }
  });
  console.log("¡Calificaciones calculadas!");
}

console.log("Llamando función Calificaciones. Las calificaciones por grupo recibidas fueron");
console.log(calificaciones);
getCalificaciones(calificaciones, fnReprobado, fnAprobado, getPromedio);
