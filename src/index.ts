
//Declaración de variables
const z = "Fran";

if(true){
    var x="Maria";
    let y="Jose"; // y tiene un ámbito de bloque
}
x="Pepito"; // x tiene un ámbito global, por eso puedo modificar el valor asignado en el if

// Tanto x como y me permite reasignar su valor


console.log(x)


// TIPOS DE DATOS

/**
 * string
 * number
 * boolean
 */

let nombre = "Jose Antonio";
let edad = 18.2;
let mayorEdad = true;


/**
 * Tipos de datos especiales
 * 
 * any
 * unknown
 * void
 */

// Any provocaría un error en tiempo de compilación
let cualquierCosa:any = "Hola";
cualquierCosa=2;
cualquierCosa=true;
cualquierCosa="HOLA"

console.log(cualquierCosa.toLowerCase())

// Uso del tipo unknown
let tipoDatoDesconocido:unknown;

tipoDatoDesconocido = "Nombre"
tipoDatoDesconocido = 18;

if (typeof(tipoDatoDesconocido) == "string"){
    console.log(tipoDatoDesconocido.toUpperCase());
}

console.log("Tu nombre es: " + nombre)
console.log(`Tus nombre es ${nombre}`) 