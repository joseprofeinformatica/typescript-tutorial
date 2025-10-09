console.log(sumar(1,2))

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

function suma(x:number,y:number){
    let xx = x;
    let yy = y;
    return xx+yy
}
//ARRAYS

let numeros: number[] = [3,5,8,11];
let numeros2: number[] = [15,21,27];
let fsuma = suma(1,2)

let mixto: (number|string)[]=[3,"Jose",5,"Juan"];

let array2d: number[][] = [[1,2,3],[4,5,6],[7,8,9]];

if(array2d[0] != undefined){
    console.log(array2d[0][0])
}


console.log(`La posición 0 del array numeros es: ${numeros[0]}`)
console.log(`La posición 0 del array array2d es: ${array2d[0]!=undefined ? array2d[0][0]: 0}`)

let numeros3 = [...numeros,...numeros2]

console.log(numeros3)
numeros3[0] = 10;
console.log(numeros3)
console.log(numeros)


//MÉTODOS PARA TRABAJAR CON ARRAYS

let anumeros = [1,3,5,7,9]
//PUSH
anumeros.push(11) //[1,3,5,7,9,11]
console.log(anumeros)
//POP
anumeros.pop() //[1,3,5,7,9]
console.log(anumeros)

anumeros.push(13,15,17);
console.log(anumeros)

// UNSHIFT - SHIFT
anumeros.unshift(0)
console.log(anumeros)

console.log(anumeros.shift())

// ACCESO, REMPLAZO 

anumeros[0]=-1;
console.log(anumeros[0])
console.log(anumeros[anumeros.length])

//BÚSQUEDA DE ELEMENTOS

let frutas = ["manzana", "pera", "platano","mandarina","manzana","platano"]

//INDEXOF
console.log(frutas.indexOf("platano"))

//INCLUDES
console.log(frutas.includes("pera"))

//FIND: busqueda primer elemento que cumple una determinada condición

console.log(frutas.find((value)=>{return value.length>5;}))

//FINDINDEX
console.log(frutas.findIndex((value)=>{return value.length>5;}))

//FOREACH -> RECORRE TODOS LOS ELEMENTOS

frutas.forEach((valor:string)=>{valor.length >5 ? console.log(valor):null})

// MAP -> TRANSFORMAR LOS ELEMENTOS DE UN ARRAY SIN MODIFICAR EL ORIGINAL

let frutasUpper = frutas.map((fruta:string)=>{return fruta.toUpperCase()})
console.log(frutasUpper)

//FILTER -> FILTRAR LOS ELEMENTOS DE UN ARRAY

let frutasFiltradas = frutas.filter((frutas:string)=>{return frutas.length>6})
console.log(frutasFiltradas)

//REDUCE -> ACUMULAR EL VALOR

let numerosEnteros = [11,1,2,3,4,5,6,7]

numerosEnteros.reduce((acc:number,elementoActual:number)=>{return acc=acc+elementoActual})

let miNombre = ["Jose", "Antonio", "Rodriguez", "Torres"]

let nombreConcatenado = miNombre.reduce((elementoAnterior,elementoActual)=>{return elementoAnterior+=" "+elementoActual})
console.log(nombreConcatenado)


console.log(numerosEnteros.sort((a:number,b:number)=>{return a-b}))

console.log(miNombre.slice(0,2))

console.log(numeros.join(" "))


//TUPLAS

let nombreEdad: [string,number]
nombreEdad = ["Jose",17]
console.log(`Mi nombre es ${nombreEdad[0]}`)
console.log(`Mi edad es ${nombreEdad[1]}`)


//FUNCIONES DECLARAS

/**
 * Función para sumar dos elementos
 * @param a primer parámetro a sumar
 * @param b segundo parámetro a sumar
 * @returns numero sumado
 */
function sumar (a:number,b:number):number{
    return a+b;
}

let suma2numeros = sumar(10,20);

//NO TIENE HOISTING
const fRestar = function (a:number,b:number){return a-b}

console.log(fRestar(5,2))

let arrayNombres=["Jose","Juan","Pedro","Manuel"]
const printElemento = function (elemento:string){console.log(elemento)}
const printElemento2 = (elemento:string)=>{console.log(elemento)}

arrayNombres.forEach(printElemento2)


function saludar (nombre:string,apellido?:string){
    //IF-ELSE
    if(apellido!=undefined){
        console.log(`Hola ${nombre} ${apellido}`)
    }else{
        console.log(`Hola ${nombre}`) 
    }

    // OPERADOR TERNARIO
    apellido!=undefined ? console.log(`Hola ${nombre} ${apellido}`) :console.log(`Hola ${nombre}`) 
    
    
    console.log(`Hola ${nombre} ${apellido ?? ""}`)

}
