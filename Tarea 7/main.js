// let t1 = false;
// let t2 = false;

// function tarea1(numero) {
//   setTimeout(() => {
//     console.log(`Hola ${numero}`);
//     if (numero < 10) {
//       tarea1(numero + 1);
//     }
//     else
//     {
//       t1 = true;
//     }
//   }, 1000);
// }

// function tarea2(cantidad) {
//   setTimeout(() => {
//     console.log(`Mundo ${cantidad}`);
//     if (cantidad < 5) {
//       tarea2(cantidad + 1);
//     }
//     else
//     {
//       t2 = true;
//     }
//   }, 2000);
// }

// function tarea3() {
  
//   if(t1 && t2)
//   {
//     console.log("fin");
//   }
//   else
//   {
//     setTimeout(() => {
//       tarea3();
//     }, 1000);
//   }
// }
// tarea1(1);
// tarea2(1);
// tarea3();

function espera(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function tarea1() {
  for (let i = 1; i <= 10; i++) {
    console.log(`Hola ${i}`);
    await espera(1000);
  }
}

async function tarea2() {
  for (let i = 1; i <= 5; i++) {
    console.log(`Mundo ${i}`);
    await espera(2000);
  }
}

async function tarea3() {
  console.log("Fin");
}

async function ejecutarTareas() {
  const tarea1Promise = tarea1();
  const tarea2Promise = tarea2();

  await Promise.all([tarea1Promise, tarea2Promise]).then(() => tarea3());
}

ejecutarTareas();



// function tarea1() {
//   return new Promise((resolve) => {
//     let contador = 1;
//     const intervalo = setInterval(() => {
//       console.log(`Hola ${contador}`);
//       contador++;
//       if (contador > 10) {
//         clearInterval(intervalo);
//         resolve();
//       }
//     }, 1000);
//   });
// }

// function tarea2() {
//   return new Promise((resolve) => {
//     let contador = 1;
//     const intervalo = setInterval(() => {
//       console.log(`Mundo ${contador}`);
//       contador++;
//       if (contador > 5) {
//         clearInterval(intervalo);
//         resolve();
//       }
//     }, 2000);
//   });
// }

// function tarea3() {
//   console.log("fin");
// }

// Promise.all([tarea1(), tarea2()]).then(() => {
//   tarea3();
// });