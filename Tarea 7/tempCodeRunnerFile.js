function tarea1() {
  return new Promise((resolve) => {
    let contador = 1;
    const intervalo = setInterval(() => {
      console.log(`Hola ${contador}`);
      contador++;
      if (contador > 10) {
        clearInterval(intervalo);
        resolve();
      }
    }, 1000);
  });
}

function tarea2() {
  return new Promise((resolve) => {
    let contador = 1;
    const intervalo = setInterval(() => {
      console.log(`Mundo ${contador}`);
      contador++;
      if (contador > 5) {
        clearInterval(intervalo);
        resolve();
      }
    }, 2000);
  });
}

function tarea3() {
  console.log("fin");
}

Promise.all([tarea1(), tarea2()]).then(() => {
  tarea3();
});