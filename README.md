# Introducción a Typescript 
- TypeScript es un lenguaje de programación desarrollado por Microsoft. 
- Es un superset de JavaScript por lo que amplía las capacidades de JavaScript añadiendo tipado estático, clases, interfaces, decoradores, y otras herramientas pensadas para el desarrollo a gran escala. 
- Todo código JavaScript es válido en TypeScript, y al transpilarlo se transforma en JavaScript pudiendo ser ejecutado en navegadores o entornos como Node.js.

## Ventajas de TypeScript:

- **Detección temprana de errores**: gracias al tipado estático, muchos errores se detectan en tiempo de compilación y no en ejecución.

- **Mayor mantenibilidad**: el código es más fácil de entender y modificar, especialmente en proyectos grandes.

- **Productividad**: los editores como Visual Studio Code ofrecen autocompletado, refactorización y documentación instantánea.

- **Orientado a objetos**: permite trabajar con clases, interfaces y herencia de manera más estructurada.

- **Compatibilidad con JavaScript**: puedes migrar proyectos poco a poco, ya que cualquier archivo .js es válido en TypeScript.

# Sintaxis básica

## Declaración de variables: let, var y const
En TypeScript (igual que en JS), podemos declarar variables usando var, let o const. La diferencia principal está en ámbito (scope), redeclaración y mutabilidad.

- var: tiene ámbito de función, no de bloque y permite redeclarar variables. Sufre hoisting (la declaración se sube al inicio de la función).

- let: tiene ámbito de bloque  `{}`. No permite redeclarar variables en el mismo bloque. Puede modificarse pero no redeclararse.

- const: tiene ámbito de bloque `{}` y no se puede reasignar una vez declarada. Debe inicializarse al ser declarada. 

``` Typescript
// --------- VAR ---------V
var nombreVar = "Ana";
console.log(nombreVar); // Ana

var nombreVar = "Luis"; // ✅ Se puede redeclarar
console.log(nombreVar); // Luis

if (true) {
  var edadVar = 30;
  console.log("Dentro del if:", edadVar); // 30
}
console.log("Fuera del if:", edadVar); // 30 → var ignora el bloque


// --------- LET ---------

let nombreLet = "Ana";
// let nombreLet = "Luis"; // ❌ Error: no se puede redeclarar
nombreLet = "Luis"; // ✅ Se puede reasignar
console.log(nombreLet); // Luis

if (true) {
  let edadLet = 25;
  console.log("Dentro del if:", edadLet); // 25
}
// console.log("Fuera del if:", edadLet); // ❌ Error: edadLet no existe fuera del bloque

// --------- CONST ---------
const PI = 3.1416;
// PI = 3.14; // ❌ Error: no se puede reasignar

const persona = { nombre: "Ana", edad: 25 };
persona.nombre = "Luis"; // ✅ Se puede modificar el contenido del objeto
console.log("Persona:", persona); // { nombre: 'Luis', edad: 25 }

// persona = { nombre: "Luis", edad: 30 }; // ❌ Error: no se puede reasignar la referencia
```


## Tipos de datos primitivos
Typescript tiene tres tipos de datos primitivos `string`, `number` y `bolean`

```typescript
let nombre: string = "Ana";
let edad: number = 25;
let activo: boolean = true;
```

## Tipos de datos speciales
- **any**: desactiva la verificación de tipos, permitiendo almacenar cualquier valor y realizar cualquier operación sin que el compilador genere un error de tipo.

```typescript
let valor: any;

valor = 123;
valor = "texto";
valor = true;

// ❌ En tiempo de compilación no daría error pero sí daría error en tiempo de ejecución porque el último valor es de tipo boolean.

console.log(valor.toUpperCase()); // Error

```

- **unknown**: similar a any, pero obliga a comprobar el tipo antes de usarlo. Cuando declaras una variable como unknown, no le estás restringiendo qué puede almacenar, porque unknown literalmente significa “puede ser cualquier cosa”. La restricción de unknown no está en la asignación, sino en el uso posterior de ese valor.

```typescript
let valor: unknown;

valor = 123;
valor = "texto";
valor = true;


// ❌ No puedes usarlo como string directamente
console.log(valor.toUpperCase()); // Error

// ✅ Primero debes comprobar el tipo
if (typeof valor === "string") {
  console.log(valor.toUpperCase()); 
}
```


- **void**: usado en funciones que no devuelven nada.

## Concatenar cadenas
Existen diferentes formas de concatenar cadenas de texto:

- Usando el operador +
- Usando plantilla de literales (template literals)

```typescript
const nombre = "Ana";
const apellido = "García";

let nombreCompleto = nombre + " " + apellido;
console.log(nombreCompleto); // Ana García

let nombreCompleto = `${nombre} ${apellido}`;
console.log(nombreCompleto); // Ana García
}
```
`


## Inferencia de tipos
La inferencia de tipos es la capacidad de TypeScript para determinar automáticamente el tipo de una variable, función o expresión sin que tengas que especificarlo explícitamente.

En otras palabras, TypeScript “adivina” el tipo basándose en el valor que le asignas.

```typescript
let numero = 42; // TypeScript infiere que 'numero' es de tipo number. No es necesario escribir :number

// Si intentamos realizar alguna operación incompatible:

numero = "hola"; // ❌ Error: Type 'string' no se puede asignar a type 'number'
```

La inferencia de tipos también se traslada a los arrays y las funciones:

```typescript
let frutas = ["manzana", "pera", "uva"]; 
// TypeScript infiere: string[]
frutas.push("naranja"); // ✅ correcto
// frutas.push(5);      // ❌ Error: number no se puede asignar a string

function suma(a: number, b: number) {
  return a + b; // TypeScript infiere que el retorno es number
}

let resultado = suma(3, 4); // resultado: number
```

## Operadores

### Operadores de comparación y lógicos

| Operador | Nombre | Ejemplo | Resultado |
|-----------|---------|----------|------------|
| `==` | Igualdad (sin tipo) | `"5" == 5` | `true` |
| `===` | Igualdad estricta | `"5" === 5` | `false` |
| `!=` | Desigualdad (sin tipo) | `"5" != 5` | `false` |
| `!==` | Desigualdad estricta | `"5" !== 5` | `true` |
| `<`, `>`, `<=`, `>=` | Comparación numérica | `5 > 3` | `true` |
| `&&` | AND lógico | `a && b` | Devuelve `b` si `a` es verdadero |
| `\|\|` | OR lógico | `a \|\| b` | Devuelve `a` si es verdadero |
| `!` | Negación lógica | `!true` | `false` |

### Operadores aritméticos

| Operador | Significado | Ejemplo | Resultado |
|-----------|--------------|----------|-----------|
| `+` | Suma o concatenación | `3 + 2`, `"a" + "b"` | `5`, `"ab"` |
| `-`, `*`, `/`, `%` | Resta, multiplicación, división, módulo | `10 % 3` | `1` |
| `**` | Exponenciación | `2 ** 3` | `8` |
| `++`, `--` | Incremento / decremento | `x++` | Suma o resta 1 |

### Operadores de asignación

| Operador | Ejemplo | Equivale a |
|-----------|----------|------------|
| `=` | `x = 5` | — |
| `+=` | `x += 2` | `x = x + 2` |
| `-=` | `x -= 2` | `x = x - 2` |
| `*=` | `x *= 2` | `x = x * 2` |
| `/=` | `x /= 2` | `x = x / 2` |
| `??=` | **Asignación nullish** | `x ??= 10` → si `x` es `null` o `undefined`, asigna `10` |
| `&&=` | **Asignación AND** | `x &&= y` → si `x` es true, asigna `y` |
| `\|\|=` | **Asignación OR** | `x \|\|= y` → si `x` es falso, asigna `y` |


### Operadores de acceso y seguridad

| Operador | Nombre | Qué hace | Ejemplo |
|-----------|---------|-----------|----------|
| `?.` | **Optional chaining** | Accede a la propiedad solo si existe | `persona?.direccion?.ciudad` |
| `!` | **Non-null assertion** (solo TS) | Indica que no es `null` o `undefined` | `persona!.nombre` |
| `??` | **Nullish coalescing** | Valor por defecto si es `null`/`undefined` | `valor ?? "defecto"` |
| `?.[` | Encadenamiento opcional con índice | Acceso seguro en arrays | `frutas?.[0]` |
| `?.()` | Encadenamiento opcional con función | Llama a una función si existe | `objeto.metodo?.()` |
| `? :` | Operador ternario | if corto | `edad > 18 ? "Adulto" : "Menor"` |

### Operadores de propagación y destructuración

| Operador | Nombre | Ejemplo |
|-----------|---------|----------|
| `...` | **Spread** | `const copia = [...array]` |
| `...` | **Rest** (en parámetros) | `function sumar(...nums) {}` |

```ts
const base = { a: 1, b: 2 };
const extra = { b: 3, c: 4 };
const combinado = { ...base, ...extra }; // { a: 1, b: 3, c: 4 }
```

# Estructuras de control y repetición.

## if-else if - else
Permite verificar múltiples condiciones secuenciales.
```typescript
let nota: number = 7;

if (nota >= 9) {
  console.log("Sobresaliente");
} else if (nota >= 7) {
  console.log("Notable");
} else if (nota >= 5) {
  console.log("Aprobado");
} else {
  console.log("Suspenso");
}
```
## Operador ternario
Es una forma compacta de if/else.
```typescript
let edad: number = 20;
let tipo = edad >= 18 ? "Adulto" : "Menor";
console.log(tipo); // "Adulto"
```
## Switch
Se usa cuando hay muchos casos posibles de una misma variable.
```typescript
let dia: number = 3;

switch (dia) {
  case 1:
    console.log("Lunes");
    break;
  case 2:
    console.log("Martes");
    break;
  case 3:
    console.log("Miércoles");
    break;
  default:
    console.log("Otro día");
}
```
## for
Bucle clásico que nos permitirá iterar.
```typescript
for (let i = 0; i < 5; i++) {
  console.log(i);
}

//i = inicialización
//i < 5 condición de continuación
//i++ incremento en cada iteracción
```

## for..of

```typescript
let frutas: string[] = ["Manzana", "Banana", "Naranja"];

for (let fruta of frutas) {
  console.log(fruta);
}
```
## while 
Se repite mientras la condición sea verdadera.

```typescript
let contador = 0;

while (contador < 5) {
  console.log(contador);
  contador++;
}
```

## do...while
Se ejecuta al menos una vez, y luego repite mientras la condición sea verdadera.

```typescript
let contador = 0;

do {
  console.log(contador);
  contador++;
} while (contador < 5);
```
## Control de bucles: break y continue

- **break:** termina el bucle inmediatamente.

- **continue:** salta a la siguiente iteración.

```typescript
for (let i = 0; i < 5; i++) {
  if (i === 2) continue; // Salta el 2
  if (i === 4) break;    // Termina el bucle
  console.log(i);
}
// Imprime 0, 1, 3
```
# Arrays

Un array es una colección de elementos del mismo tipo (aunque también puede ser de tipos mixtos si así lo defines).

```typescript
//Declaración  e inicialización de arrays:
let numeros: number[] = [1, 2, 3, 4];


// Arrays heterogéneos
let mixto: (string | number)[] = ["hola", 42, "adiós", 99];

// Arrays multidimensionales 
let matriz: number[][] = [
  [1, 2],
  [3, 4]
];

// Acceso a los elementos de un array:

let n1 = numero[0];
let dato_matriz = matriz[0][0]

//Concatenación de arrays mediante factor de propagación

let listaTareas1 : string [] = ["Tarea 1"," Tarea 2"," Tarea 3"];
let listaTareas2 : string [] = [" Tarea 3"];

let nuevaListaTareas : string[] = [...listaTareas1, ...listaTareas2, "Tarea 4"];
```

## Agregar o quitar elementos de un array

```typescript
let numeros: number[] = [1, 2, 3];

// Añadir al final
numeros.push(4);   // [1, 2, 3, 4]

// Quitar el último
numeros.pop();     // [1, 2, 3]

// Añadir al inicio
numeros.unshift(0); // [0, 1, 2, 3]

// Quitar el primero
numeros.shift();    // [1, 2, 3]
```

## Acceder a la información de un array
```typescript
let letras: string[] = ["a", "b", "c"];

// Obtener el total de elementos
console.log(letras.length);   

// Acceder al primer elemento
console.log(letras[0]);      

//Acceder al último elemento
console.log(letras[letras.length - 1]);
```
## Buscar elementos en un array
```typescript
let frutas: string[] = ["manzana", "pera", "uva"];

// Consultar la posición de un elemento
console.log(frutas.indexOf("pera")); //1

// Consultar si el array incluye a un elemento

console.log(frutas.includes("uva"));    // true


console.log(frutas.find(f => f.length > 5)); // "manzana"

// Obtener el elemento que cumple una determinada condición. En este caso se está buscansando al primer elemento cuya longitud del texto sea mayor a 5
console.log(frutas.find(f => f.length > 5)); // "manzana"

// Obtener la posición del primer elemento que cumpla una determinada condición.
console.log(frutas.findIndex(f => f === "uva")); // 2
```

## Recorrer arrays

```typescript
let numeros = [1, 2, 3];

// forEach → recorrer sin devolver nada
numeros.forEach(n => console.log(n * 2)); // 2, 4, 6

// map → transforma el array
let dobles = numeros.map(n => n * 2); // [2, 4, 6]

// filter → filtra según condición
let pares = numeros.filter(n => n % 2 === 0); // [2]

// reduce → acumula en un valor
// array.reduce((acumulador, elementoActual) => /* operación */, valorInicial)
// valor ininicial del acumulador, si no se pone nada se usa el primer elemento del array.

let suma = numeros.reduce((acc, n) => acc + n, 0); // 6
```
## Ordena y manipula

```typescript
let numeros = [3, 1, 4, 2];

// Ordenar. Por defecto ordena como string
numeros.sort(); // [1, 2, 3, 4]

// Ordena numericamente
numeros.sort((a, b) => a - b);

// Cortar una parte
//array.slice(inicio, fin?)
// - inicio → índice donde empieza la copia (inclusive).
// -  fin → índice donde termina la copia (exclusive, no incluye el elemento en esa posición).
// Devuelve un array sin modificar el original
```
## Unir o transformar
```typescript
let palabras = ["Hola", "mundo"];
console.log(palabras.join(" ")); // "Hola mundo"

```


# Tuplas 

Una tupla es un array con **longitud fija y tipos específicos en cada posición.**
Es decir, a diferencia de un array, donde todos los elementos son del mismo tipo, en una tupla puedes definir un tipo distinto para cada índice.

```typescript

let persona: [string, number];

// Los tipos deben estar en la posición correcta.
persona = ["Juan", 30];

// Acceso a los elementos:
let nombre = persona[0]; // string
let edad = persona[1];   // number
```

# Ejercicios prácticos básicos
## Ejercicio 1.
Escribe una función en TypeScript que reciba como parámetro una nota numérica entre 0 y 10 e imprima un mensaje en pantalla según la calificación obtenida:
- >=9: Sobresaliente
- >=7: Notable
- >=5: Aprobado
- <5: Suspenso.
## Ejercicio 2.
Crea un programa en TypeScript que imprima en consola todos los números pares del 1 al 20. Usa un bucle for, while y do-while.
## Ejercicio 3.
1. Declara un array con al menos 3 nombres.
2. Agrega dos nombres nuevos al final de la lista.
3. Elimina el primer elemento del array.
4. Comprueba si un nombre concreto (ejemplo "Ana") está en la lista.
5. Recorre el array e imprime cada nombre en consola.
## Ejercicio 4.
Crea una tupla en TypeScript que contenga:
- El nombre de un producto (string).
- Su precio (number).
Muestra el nombre y el precio por consola en el formato: 
El producto nombre tiene un precio de precio euros.
## Ejercicio 5.
Define una función que reciba un array de números como parámetro y devuelva la suma total.
Ejemplo: sumarArray([1, 2, 3, 4]) // devuelve 10

## Ejercicio 6.
Escribe una función que reciba un array de strings y devuelva un solo string concatenado, donde cada elemento esté separado por una coma y un espacio ", "
Ejemplo: concatenar(["Ana", "Luis", "Pedro"]) // devuelve "Ana, Luis, Pedro"
## Ejercicio 7.
Crea un programa que reciba un número entre 1 y 7 e imprima el día de la semana correspondiente.
## Ejercicio 8.
Crea un array con varios números. Recorre el array con un for y detén la ejecución (break) cuando encuentres el número 7, mostrando un mensaje "Número encontrado".Si el número no existe en el array, mostrar "Número no encontrado".
## Ejercicio 9.
Escribe una función que reciba un array de números y devuelva el mayor de ellos.
Ejemplo: mayorNumero([3, 8, 1, 10, 5]) // devuelve 10

## Ejercicio 10
Crea un array con varios números. Recorre el array con un bucle y para cada número imprime:
- "Par" si es par.
- "Impar" si es impar.
Usa el operador ternario para la comprobación.

# Funciones

Las funciones nos permitirán crear bloques de códigos reutilizables que realizará una función específica. En TypeScript existen diferentes tipos de funciones que podemos usar según nuestras necesidades. A continuación veremos cada una de ellas.

## Funciones declaradas (Named Functions)
Son las más clásicas y se definen con la palabra reservada *function*. En el siguiente ejemplo se puede apreciar cómo se está realizando una asignación de tipos a los parámetros de la función así como al tipo de dato que va a devolver.

```typescript

function sumar(a: number, b: number): number {
  return a + b;
}

console.log(sumar(3, 4)); // 7

```

## Funciones anónimas (Anonymous Functions)
Este tipo de funciones no tienen nombre, son asignadas a una variable. Son muy útiles para usarla como callbacks.

```typescript

function sumar(a: number, b: number): number {
  return a + b;
}

console.log(sumar(3, 4)); // 7

```
Este tipo de funcionse NO tienen **hoisting**, es decir, deben de declararse antes de usarse, a diferencia de las funciones clásicas que no es necesario declararla antes de ser usadas. Veamos un ejemplo:

```typescript

// Llamamos a la función ANTES de declararla
console.log(sumar(2, 3)); // 5

function sumar(a: number, b: number): number {
  return a + b;
}


// Error: Cannot access 'restar' before initialization
console.log(restar(5, 3));

const restar = (a: number, b: number): number => a - b;

```
En JavaScript y TypeScript el motor de ejecución mueve ciertas declaraciones al inicio del ámbito antes de ejecutar el código, lo que nos permitirá llamar a una función que ha sido declarada posteriormente. En cambio, tanto las funciones anónimas como las funciones arrow no permiten esto.


## Funciones con parámetros opcionales o por defecto
Las funciones permiten establecer algunos parámetros opcionales o definir valores por defecto en el caso de que no se indique ningún valor. 

Es muy importante aclarar que los parámetros opcionales deben estar en la última posición.

A continuación se muestra un ejemplo:


```typescript

//Función con un parámetro opcional.
function saludar(nombre?: string): void {
  console.log(`Hola ${nombre ?? "invitado"}`); // ?? solo reemplaza cuando el valor es null o undefined.
  //console.log(`Hola ${nombre !== null && nombre !== undefined ? nombre : "invitado"}`);

}

saludar();       // Hola invitado
saludar("Ana");  // Hola Ana

// Función con un valor por defecto.
function potencia(base: number, exponente: number = 2): number {
  return base ** exponente;
}
console.log(potencia(3));    // 9 (3^2)
console.log(potencia(3, 3)); // 27 (3^3)


```
## Funciones con parámetros de varios tipos
Este tipo de funciones nos permitirán usar parámetros que admita varios tipos posibles de datos.

```typescript

function variosTipos (a: string | number){
    if (typeof(a) == "string"){
        console.log("a es un string");
    } else{
        console.log("a es un number");
    }
}
variosTipos(1); // a es un number
```

## Funciones con un número variable de parámetros
Mediante el uso de los carácteres `...` vamos a poder capturar varios parámetros de una función.

```typescript

function sumarTodos(...numeros: number[]): number {
  return numeros.reduce((acc, n) => acc + n, 0);
}

console.log(sumarTodos(1, 2, 3, 4, 5)); // 15

```

## Funcionse flecha (Arrow functions)
Las funciones flechas (o arrow functions) son una forma más corta y moderna de escribir funciones. Se les denomina así porque usan una flecha `=>`. Sirven para lo mismo que una función normal, pero tienen menos código y algunas diferencias importantes. 
Una función flecha tiene la siguiente estructura: `(parametros) => {operaciones}`


A continuación se muestra un ejemplo:

```typescript

// Forma tradicional

function sumar(a: number, b: number): number {
  return a + b;
}

// Función flecha 
const sumar = (a: number, b: number): number => { return a + b; };
```

Si la función tiene una sola línea que devuelve un valor, se puede escribir sin return y sin llaves { }:

```typescript
const sumar = (a: number, b: number): number => a + b;
```
Este tipo de funciones son muy usadas en las funciones callbacks.

## Funciones callback
Las funciones callback son aquellas que serán pasadas como parámetro a otra función para que sea ejecutada en algún momento. Se usan cuando queremos que una función externa decida en qué momento ejeutar nuestro código. Son muy comunes en eventos, temporizadores y funciones para manejar arrays.

A continuación se muestra un ejemplo de función callback:

```typescript

/* Esta función recibe como parámetro un nombre de tipo string y un parámetro llamado callback de tipo función, que debe tener una estructura concreta. 
La función que se le pase como parámetro debe recibir un parámetro string y devolver void.*/

function saludar(nombre: string, callback: (mensaje: string) => void) {
  const texto = `Hola, ${nombre}`;
  callback(texto); // aquí se llama a la función pasada como parámetro
}

// Usamos la función saludar pasando un callback
saludar("Lucía", (msg) => {
  console.log(msg);
});

// También se podría definir una función anónima y pasarla como parámetro.
const funcion_callback = (msg) => { console.log(msg); }
saludar("Lucía", funcion_callback);

```

Lo que está ocurriendo es lo siguiente:
1. La función `saludar("Lucía",..)` crea el texto `Hola, Lucía`.
2. En vez de imprimir dicho texto, se hace una llamada a la función pasada como parámetro.
3. La función callback decide qué hacer con el texto, en este caso lo muestra por consola.

A continuación se muestra otro ejemplo usando el método `foreach` en un array de datos:

```typescript

const numeros = [1, 2, 3];

// forEach necesita un callback que diga qué hacer con cada número
numeros.forEach((n) => {
  console.log(n * 2);
});

// Otra forma de hacerlo sería usando una función anónima
const operar =  (n) => { console.log(n * 2);}
numeros.forEach(operar)

```

## Funciones asíncronas
Las funciones asíncronas tiene como objetivo realizar operaciones complejas o que dependen de un servidor externo sin bloquear la ejecución del programa. Es decir, mientras se está ejecutando la función, el usuario puede seguir haciendo uso de la aplicación y cuando finalice la ejecución de la función asíncrona se le mostrará los resultados.

Las funciones asíncronas se definen usando la palabra reservada `async` y dentro de una función asíncrona se puede usar la palabra reservada `await` que significa 'Espera a que esta línea se ejecute antes de seguir'.

Toda función asíncrona devuelve una promesa. ¿Qué es una promesa?
Una promesa es un objeto que representa un valor que aún no está disponible, pero que lo estará en el futuro. Las promesas:
- Pueden cumplirse (resolve) -> todo salió bien
- Pueden fallar (reject) -> hubo un error.

Para poder obtener los datos de una función asíncrona debemos de invocarla y usar los métodos:
- `.then()` para poder obtener el valor que devuelve la promesa. Recibe una función callback que se ejecuta cuando la promesa se cumple (resolve).
- `.catch()` para manejar los errores si la promesa ha fallado (reject).

```typescript
async function obtenerUsuarios():Promise<JSON> {
  // Con la función fetch se accede a la API mediante una peteición GET
  const respuesta = await fetch("https://dog.ceo/api/breeds/image/random");
  
  //Convertimos la respuesta de la petición GET en JSON
  const datos = await respuesta.json() as Promise<JSON>;

  return datos;
}

async function obtenerUsuarios():Promise<JSON> {
  // Con la función fetch se accede a la API mediante una peteición GET
  const respuesta = await fetch("https://dog.ceo/api/breeds/image/random");
  //Convertimos la respuesta de la petición GET en JSON
  const datos = await respuesta.json() as Promise<JSON>;
  
  return datos
}

obtenerUsuarios()
.then((res)=>{console.log(`Los datos obtenidos de la API son: ${res}`)})
.catch((error)=>{console.log(`Error al ejecutar la función async: ${error}`)})
```


# Objetos

## Objeto literal

Es la forma más simple de crear un objeto, se basa en una lista de `clave:valor` entre llaves `{}`. 

 La principal desventaja es que no permite reutilizar la estructura de dicho objeto, lo que puede probocar errores en la definición de otros objetos parecidos.

Ventajas:
- Son fáciles y rápidos de definir.
- Su sintaxis es muy clara y se parece mucho al formato JSON.
- Pueden ser usados para la definición de objetos que no se van a volver a repetir, como, por ejemplo objetos de configuración.

Desventajas:
- No son reutilizables. En cada nuevo objeto se debe definir su estructura.
- No usa un contrato (`interface` o `type`) que garantice que todos los objetos tienen la misma estructura.



```ts

// DEFINICIÓN DE UN OBJETO
let persona = {
  nombre: "Ana",
  edad: 25,
  saludar: function () {
    console.log(`Hola, soy ${this.nombre}`);
  }
};

// ACCESO A SUS PROPIEDADES
console.log(persona.nombre); // Ana
console.log(persona['edad']) // 25

// ACCESO A SUS MÉTODOS
persona.saludar();           // Hola, soy Ana

// MODIFICACIÓN DE DEL VALOR DE UNA PROPIEDAD
persona.edad = 20

```

## Type
Para solucionar la problemática de la estructura de los literales podemos usar los `type`. Un `type` es una plantilla que permite su reutilización en la declaración de otros objetos lo que permitirá que todos ellos compartan la misma estructura.

Ventajas:
- Son reutilizables ya que permiten la creación de nuevas objetos a partir de dicha estructura definida.
- Son muy flexibles ya que permiten la creación de otras estructuras más complejas a partir de las uniones `|` o las intersecciones `&`.

Desventajas:
- Antes de crear un objeto es necesario definir la estructura de este a través del `type`.


```ts

// DEFINICIÓN DEL TYPE
type Usuario = {
  id: number,
  nombre: string,
  estaActivo: boolean,
};

// CREACIÓN DE OBJETOS A PARTIR DEL TYPE
const usuario1: Usuario = {
  id: 1,
  nombre: "Elena",
  estaActivo: true
};

const usuario2: Usuario = {
  id: 2,
  nombre: "Marcos",
  estaActivo: false
};

// Si intentamos crear un objeto que no cumpla la estructura del Type nos aparecerá un error.
// const usuarioIncorrecto: Usuario = {
//   id: 3,
//   nombre: "Ana" // Error: Falta la propiedad 'estaActivo'
// };

const persona: Persona = { nombre: "Ana", edad: 30 };

```
### Parámetros opcionales `?`
Las propiedades opcionales permiten que no todas las claves deban estar presentes en un objeto. Si una propiedad está marcada con `?`, puede existir o no, lo cual es muy común en Angular para formularios o datos parciales de APIs.

```ts
type Usuario = {
  id: number,
  nombre: string,
  estaActivo: boolean,
  email?:string
};


const u1: Usuario = { id:1, nombre: "Pedro", estaActivo:true};         
const u2: Usuario = { id:2, nombre: "Lucía",estaActivo:false,email: "lucia@mail.com" }; 

```

### Propiedades readonly
Las propiedades solo lectura (`readonly`) no pueden ser modificadas después de la creación del objeto. Útil para constantes, configuraciones o valores de inicialización que no deben cambiar.

```ts
type Configuracion = {
  readonly version: string,
  modo: string
};

const appConfig: Configuracion = { version: "1.0.0", modo: "producción" };

// appConfig.version = "2.0.0"; ❌ Error: es de solo lectura
appConfig.modo = "desarrollo";  // ✅ permitido
```

### Insertions types (&)
Permiten combinar varios tipos en uno solo, que tendrá todas las propiedades de los tipos combinados.

```ts
type Persona = {
  nombre: string;
};

type Contacto = {
  telefono: string;
};

type Empleado = Persona & Contacto & { puesto: string };

const e1: Empleado = {
  nombre: "María",
  telefono: "123456789",
  puesto: "Desarrolladora"
};
```


### Template Literal Types
Los Template Literal Types en TypeScript funcionan de manera similar a las plantillas de cadena (template strings) en JavaScript, pero a nivel de tipos. Te permiten combinar tipos de texto mediante interpolación (usando ${}), para generar nuevos tipos de cadena.

En el siguiente ejemplo, cualquier cadena que empiece por "Hola " será válida para el tipo Saludo.


```ts
type Saludo = `Hola ${string}`;

let mensaje1: Saludo = "Hola José"; // ✅ válido
let mensaje2: Saludo = "Adiós José"; // ❌ error
```
#### Interpolación de varios tipos
Podemos combiar dos template literal types.

```ts
type Entidad = "usuario" | "producto";
type Accion = "crear" | "eliminar" | "actualizar";

type PermisoAvanzado = `${Accion}_${Entidad}`;

/*
PermisoAvanzado es equivalente a:

type PermisoAvanzado = 
  "crear_usuario" | "crear_producto" |
  "eliminar_usuario" | "eliminar_producto" |
  "actualizar_usuario" | "actualizar_producto";
*/
```
Esto es extremadamente útil para crear conjuntos de permisos, claves de eventos o cualquier otro string que siga un patrón predecible, garantizando que solo se puedan usar las combinaciones válidas.

### Union types (|)
Permiten que una variable u objeto pueda ser de varios tipos posibles. Muy usado para tipos flexibles en funciones o respuestas HTTP donde puede llegar un valor o null, o diferentes formatos de datos.

```ts
type IdPattern = `pid-${number}`
type Id =  IdPattern | number; // Un ID puede ser un string o un número

type SituacionLaboral = 'empleado' | 'desempleado' | 'buscandoTrabajo'; // Un tipo para estados específicos

type Persona = {
  id?:Id,
  nombre: string,
  situacionLaboral: SituacionLaboral
};

let p1:Persona = {id:1,nombre:'Jose',situacionLaboral:'desempleado'}

p1.id = 'pid-1';
//p1.id = 'pid'; //NO VALIDO

p1.situacionLaboral ='empleado'; // Válido

//p1.situacionLaboral ='busqueda'; // Error: 'busqueda' no es uno de los valores permitidos

```


### Aserciones de tipos (Type Assertions)
Se usa cuando TypeScript no puede inferir el tipo exacto pero tú sabes cuál es. Una aserción de tipo le dice a TypeScript: “Confía en mí, sé mejor que tú qué tipo tiene esta variable”. 

```ts
const elemento = document.querySelector("#input-nombre") as HTMLInputElement;

console.log(elemento.value); // TypeScript ahora sabe que tiene propiedad `value`

```

## Enumerados

Permite definir un conjunto de constantes bajo un identificador. Si imprimimos el valor de un valor del enumerado observaremos que lo que almacena es el un valor numérico.

Los enum ayudan a que tu código sea más legible, mantenible y seguro, evitando errores por escribir cadenas o números incorrectos.

```ts
enum Direccion {
  Norte,
  Sur,
  Este,
  Oeste
}

Direccion.Norte   // 0
Direccion.Sur     // 1
Direccion.Este    // 2
Direccion.Oeste   // 3
```

### Enumerados con numeración personalizada

Puedes cambiar el valor inicial y los siguientes se incrementarán automáticamente, o podemos asignar manualmente los valores.

```ts
enum Estado {
  Pendiente = 1,
  EnProgreso,  // 2
  Completado   // 3
}

enum Rol {
  Admin = 10,
  Editor = 20,
  Usuario = 30
}

```

### Emnumeraciones de cadenas

En lugar de usar números, puedes usar valores de texto. Los valores se mantienen legibles incluso en tiempo de ejecución, lo cual es ideal cuando se trabaja con APIs, bases de datos o configuraciones. 


```ts
enum Color {
  Rojo = "ROJO",
  Verde = "VERDE",
  Azul = "AZUL"
}

let favorito: Color = Color.Rojo;
console.log(favorito); // "ROJO"
```
Una desventaja es que los string enums no permiten el acceso inverso (no puedes hacer Color["ROJO"]).

```ts
enum EstadoReserva {
  Pendiente = "PENDIENTE",
  Confirmada = "CONFIRMADA",
  Cancelada = "CANCELADA"
}

function cambiarEstado(estado: EstadoReserva) {
  console.log(`La reserva está ahora: ${estado}`);
}

cambiarEstado(EstadoReserva.Confirmada); // ✅
```

### Diferencias entre los enums y los types
La principal diferencia entre los enumerados y los types es que los enumerados crean un objeto real en JavaScript al ser compilados, mientras que los types son solo un alias, una construcción de TypeScript, que desaparecen al ser compilados.

Características de los enumerados:
- Los enumerados existen en tiempo de ejecución, lo que añade algo de peso al código final.
```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

// Compiled JavaScript
/*
"use strict";
var Direction;
(function (Direction) {
  Direction[(Direction["Up"] = 0)] = "Up";
  Direction[(Direction["Down"] = 1)] = "Down";
  Direction[(Direction["Left"] = 2)] = "Left";
  Direction[(Direction["Right"] = 3)] = "Right";
})(Direction || (Direction = {}));
*/
```
- En los enumerados podemos obtener el nombre a partir del valor `EstadoPedido[1]`.
- Los valores pueden ser numéricos por defecto o strings.
- No son flexibles. Si quisieramos añadir un nuevo valor, tenrdíamos que actualizar cada lugar del código donde se use. Veamos un ejemplo.

Tenemos el siguiente código inicial:

```ts
enum EstadoTicket {
  Abierto,      // 0
  EnProgreso,   // 1
  Cerrado,      // 2
}

// Supongamos que guardas el estado como un número en la base de datos.
// Ahora, recibes el número '1' de la base de datos.
const estadoDesdeDB = 1;

// Usas el mapeo inverso para saber qué significa ese '1'.
if (EstadoTicket[estadoDesdeDB] === "EnProgreso") {
  console.log("El ticket está siendo trabajado."); // ✅ Lógica correcta
}
```
Refactorización inofensiva: Decidimos que Pendiente es un nombre mejor que Abierto. Simplemente renombras el miembro y además, añadimos un nuevo estado Urgente al principio para darle prioridadd.


```ts
enum EstadoTicket {
  Urgente,      // 0
  Pendiente,    // 1
  EnProgreso,   // 2
  Cerrado,      // 3
}
```
 El bug silencioso: El código original que dependía del valor numérico ahora está roto, pero compila sin errores.

``` ts
const estadoDesdeDB = 1; // Este '1' antes significaba "EnProgreso"

// La lógica ahora interpreta '1' de forma incorrecta.
console.log(`El estado del ticket es: ${EstadoTicket[estadoDesdeDB]}`);
// Muestra: "El estado del ticket es: Pendiente" ❌ ¡INCORRECTO!

if (EstadoTicket[estadoDesdeDB] === "EnProgreso") {
  console.log("El ticket está siendo trabajado."); // Esta condición nunca se cumple.
}
```
Tu lógica de negocio ha cambiado sin que te des cuenta. Los tickets que estaban "En Progreso" ahora aparecen como "Pendiente".

Este problema no existe con los union types de strings, porque el valor y el nombre son lo mismo.
```ts
type EstadoTicketType = 'abierto' | 'en-progreso' | 'cerrado';

const estadoDesdeDB: EstadoTicketType = 'en-progreso'; // El valor es descriptivo

if (estadoDesdeDB === 'en-progreso') {
  console.log("El ticket está siendo trabajado."); // ✅ Lógica correcta
}
```
Si cambias 'abierto' por 'pendiente', TypeScript te obligará a actualizar todos los sitios donde se usaba 'abierto', lo cual es seguro. Si añades un nuevo estado, no afecta a los valores existentes.
```ts
type EstadoTicketType = 'urgente' | 'pendiente' | 'en-progreso' | 'cerrado';

const estadoDesdeDB: EstadoTicketType = 'en-progreso'; // Sigue siendo 'en-progreso'

if (estadoDesdeDB === 'en-progreso') {
  console.log("El ticket está siendo trabajado."); // ✅ La lógica sigue funcionando
}
```

Características de los type.
- Solo son usados en tiempo de compilación. Al ser compilados desaparecen, lo que permite que sean más ligeros y eficientes.
- No tienen mapeo inverso.
- Son muy flexibles ya que puede usar cualquier valor.


¿Cuándo usar cada uno de ellos?
- Usa type para restringir los valores de una variable (estados, roles, tipos de botones, etc.). Es la opción más común.
- Usa enum solo si necesitas alguna de sus características específicas, como el mapeo inverso de número a string o si estás trabajando con una librería que los requiere.

## Interfaces `interface`
Al igual que los `type`, las interfaces `interface` permiten establecer una plantilla que define la forma que debe tener un objeto, es decir, define las propiedades y los métodos del objeto.

Ventajas:
- Garantiza que los objetos tengan una estructura consistente.
- Permite la reutilización y la escalabilidad. Si la estructura evoluciona puede ser cambiada desde un solo lugar.
- Poliformismo. Permite que diferentes clases implementen la misma interfaz, garantizando que todas ellas tengan un conjunto de métodos y propiedades en común.
- Declarating Merging (Fusión de Declaraciones): Una característica única de las interfaces es que pueden ser definidas en múltiples partes del código y TypeScript las fusionará.


Desventajas:
- Solo existen en tiempo de compilación. Las interfaces desaparecen por completo cuando el código se compila a JavaScript. Son una herramienta durante la fase de desarrollo, lo que no permite que posteriormente se use en tiempo de ejecución usando un `instanceOf MiInterfaz`
- No pueden contener implementación.
- Son menos flexibles que los `Type`.


```ts

// DECLARACIÓN
interface Vehiculo {
  marca: string;
  modelo: string;
  anyo: number;
}

// CREACIÓN DE UN OBJETO A PARTIR DE LA INTERFAZ
const miCoche: Vehiculo = {
  marca: "Toyota",
  modelo: "Corolla",
  año: 2022
};
```

### Propiedades opcionales `?` y de solo lectura `readonly`
Al igual que en los `type`, las `interface` también admite propiedades opcionales o de solo lectura.

```ts
interface PerfilUsuario {
  readonly id: number; // No se puede cambiar después de la creación
  nombre: string;
  avatarUrl?: string; // Es opcional, puede ser undefined
}

const usuario: PerfilUsuario = {
  id: 101,
  nombre: "Ana"
};

// Esto es válido, porque avatarUrl es opcional
console.log(usuario.nombre);

// Esto dará un error, porque 'id' es de solo lectura
// usuario.id = 102;
```

### Extender interfaces `extends`

Una interfaz puede heredar las propiedades de otra, permitiendo crear estructuras más complejas a partir de otras más simples.

```ts

interface ProductoBase {
  id: number;
  nombre: string;
  precio: number;
}

// Ropa hereda todo de ProductoBase y añade nuevas propiedades
interface Ropa extends ProductoBase {
  talla: 'S' | 'M' | 'L';
  color: string;
}

const miCamiseta: Ropa = {
  id: 201,
  nombre: "Camiseta de algodón",
  precio: 19.99,
  talla: 'M',
  color: "azul"
};
```

### Declarating Mergin

Como hemos mencionado al comienzo del apartado, las interfaces pueden ser definidas en múltiples partes del código y TypeScript las fusionará.

```ts
interface Box {
  height: number;
  width: number;
}

interface Box {
  scale: number;
}
let box: Box = { height: 5, width: 6, scale: 10 };
```

### Propiedades de tipo función.

Una interface no solo puede definir sus propiedades, sino que también puede describir la forma que debe tener una función. Esto es muy útil para asegurar que los métodos de un objeto o las funciones que pasas como argumentos tengan los parámetros y el tipo de retorno correctos.

```ts
interface Calculadora {
  // Describe una función 'sumar' que toma dos números y devuelve un número.
  sumar: (num1: number, num2: number) => number;
  
  // Describe una función 'restar' con la misma estructura.
  restar: (num1: number, num2: number) => number;
}

const miCalculadora: Calculadora = {
  sumar: (a, b) => {
    return a + b;
  },
  
  restar: (x, y) => {
    return x - y;
  }
  
  // Si intentaras hacer esto, TypeScript daría un error:
  // multiplicar: (a, b) => a * b; // Error: 'multiplicar' no existe en la interfaz 'Calculadora'
  // sumar: (a: string) => a; // Error: La firma de la función no coincide con la de la interfaz
};

```

### Call Signature (Firma de llamada)

Las interfaces también permiten definir la estructura de una función, asegunrando que tenga los parámetros y el tipo de retorno correcto, creando lo que se llama su firma de llamada.

```ts
interface OperacionMatematica {
  (a: number, b: number): number;
}

const sumar: OperacionMatematica = (x, y) => {
  return x + y;
};

const restar: OperacionMatematica = (num1, num2) => {
  return num1 - num2;
};

// TypeScript te protege si intentas romper el contrato
// const multiplicar: OperacionMatematica = (a, b) => {
//   return `El resultado es ${a * b}`; // ❌ Error: La función devuelve string, no number.
// };

```

### ¿Cuál es la diferencia entre un `type` y una `interface`?

Tanto type como interface permiten describir la forma de los datos (qué propiedades y tipos tiene un objeto). La gran diferencia está en su flexibilidad, alcance y capacidad de extensión.

`interface`: Su propósito es definir la estructura de un objeto o el contrato de una clase. Es el pilar de la programación orientada a objetos en TypeScript.

`type`: Es más general. Se usa para crear un alias o estructura más flexibles. Es la herramienta principal para crear uniones (|) e intersecciones (&).

Ambos pueden extenderse, pero la sintaxis es diferente:

```ts
interface Animal {
  nombre: string;
}

interface Perro extends Animal {
  raza: string;
}

type AnimalType = {
  nombre: string;
};

type PerroType = AnimalType & {
  raza: string;
};
```

Las interfaces adminten el Declaration Mergin, cosa que no se puede realizar en los type

```ts
// Declaración original (podría venir de una librería)
interface Ventana {
  titulo: string;
}

// Tu propia declaración en otro archivo
interface Ventana {
  tema: "oscuro" | "claro";
}

// TypeScript las une automáticamente.
// El tipo final es { titulo: string; tema: "oscuro" | "claro"; }

type VentanaType = {
  titulo: string;
};

// ❌ Error: Identifier 'VentanaType' has already been declared.
type VentanaType = {
  tema: "oscuro" | "claro";
};
```

## Clases 

Las clases permiten definir tanto las propiedades como el comportamiento que tendrán los objetos creados a partir de ella. Es el pilar fundamental de la Programación Orientada a Objetos.

Ventajas:
- Encapsulación: Agrupan las propiedades y los métodos que operan sobre esos datos en una sola unidad.
- Reutilización (Herencia): Se puede crear una clase nueva que herede las propiedades y los métodos de una clase existente.
- Abstracción. Permite ocutar detalles complejos de la implementación y exponer solo la funcionalidad necesaria.
- Plantilla para objetos: proporciona un modelo claro y reutilizable para crear objetos con una estructura consistente.
- No se eliminan durante la compilación, estas se convierten a JavaScript.

Desventajas:
- El codigo resultante será más pesado ya que las clases generan código JS.
- En ocasiones usar Clase para objetos simples genera código excesivo. Es por ello, por lo que se recomienda el uso de type o interfaces.

### Declaración e instanciación.
Primero, es neceario declarar  la clase (la estructura del objeto). Luego, usas la palabra clave new para crear una instancia (un objeto real) a partir de esa clase.

```ts
// 1. Declaración
class Jugador {
  // Propiedades: datos que el objeto contendrá
  nombreUsuario: string;
  puntuacion: number = 0; // Puede tener un valor por defecto
  estaActivo: boolean = true;

  // Métodos: acciones que el objeto puede realizar
  mostrarInfo() {
    console.log(`Usuario: ${this.nombreUsuario}, Puntuación: ${this.puntuacion}`);
  }
}

// 2. Instanciación (crear objetos a partir del plano)
const jugador1 = new Jugador();
jugador1.nombreUsuario = "Alice";

const jugador2 = new Jugador();
jugador2.nombreUsuario = "Bob";
jugador2.puntuacion = 100;

jugador1.mostrarInfo(); // Muestra: Usuario: Alice, Puntuación: 0
jugador2.mostrarInfo(); // Muestra: Usuario: Bob, Puntuación: 100
```

### El constructor

El constructor es un método especial que se ejecuta automáticamente al crear una nueva instancia de la clase. Se usa para inicializar las propiedades del objeto.

```ts
class Jugador {
  nombreUsuario: string;
  puntuacion: number = 0;
  estaActivo: boolean = true;

  // El constructor
  constructor(nombreUsuario:string,puntuacion:number,estaActivo:boolean){
    this.nombreUsuario = nombreUsuario;
    this.puntuacion=puntuacion;
    this.estaActivo = estaActivo;
  }


  mostrarInfo() {
    console.log(`Usuario: ${this.nombreUsuario}, Puntuación: ${this.puntuacion}`);
  }
}

const jugador1 = new Jugador("jose",10,true);
console.log(jugador1.nombreUsuario)

```

TypeScript ofrece un atajo para los constructores que crea e inicializa las propiedades automáticamente:

```ts
// Versión abreviada
class Producto {
  // 'public' crea propiedades con estos nombres automáticamente
  constructor(public id: number, public nombre: string, public precio: number) {}
}

const teclado = new Producto(101, "Teclado Mecánico", 99.99);
console.log(teclado.nombre); // Muestra: Teclado Mecánico
```

### Propiedades opcionales `?` y de solo lectura `readonly`

```ts

class Jugador {
  readonly id:number;
  nombreUsuario: string;
  puntuacion: number = 0;
  estaActivo: boolean = true;
  urlPerfil?:string;
  // El constructor
  constructor(id:number,nombreUsuario:string,puntuacion:number,estaActivo:boolean,urlPerfil:string){
    this.id =id;
    this.nombreUsuario = nombreUsuario;
    this.puntuacion=puntuacion;
    this.estaActivo = estaActivo;
    this.urlPerfil = urlPerfil;
  }


  mostrarInfo() {
    console.log(`Usuario: ${this.nombreUsuario}, Puntuación: ${this.puntuacion}`);
  }
}

const jugador1 = new Jugador(1,"jose",10,true,"facebook.es/profile/jose");
console.log(jugador1.nombreUsuario)
```
### Herencia

Puedes crear una nueva clase que herede de una clase padre. La clase hija obtiene todas las propiedades y métodos del padre y puede añadir los suyos propios o sobrescribir los existentes.

`super` se utiliza para llamar al constructor o métodos de la clase padre.

```ts
// Clase padre
class Vehiculo {
  constructor(public marca: string) {}

  moverse() {
    console.log("El vehículo se está moviendo.");
  }
}

// Clase hija que hereda de Vehiculo
class Coche extends Vehiculo {
  // 'super()' llama al constructor de la clase padre (Vehiculo)
  constructor(marca: string, public modelo: string) {
    super(marca); // Debe llamarse primero
  }

  // Sobrescribiendo un método del padre
  moverse() {
    console.log(`El coche ${this.marca} ${this.modelo} está conduciendo.`);
  }
}

const miCoche = new Coche("Ford", "Mustang");
miCoche.moverse(); // Muestra: El coche Ford Mustang está conduciendo.
console.log(miCoche.marca); // Muestra: Ford (heredado de Vehiculo)
```

### Modificadores de acceso (`public`,`private`,`protected`)

- public (por defecto): Se puede acceder desde cualquier lugar.
- private: Solo se puede acceder desde dentro de la misma clase.
- protected: Se puede acceder desde dentro de la misma clase y cualquier clase hija.

```ts
class Persona {
  // ✅ public: Accesible desde cualquier lugar.
  public nombre: string;

  // ⛔ private: Solo accesible DENTRO de la clase Persona.
  private edad: number;

  // ⚠️ protected: Accesible DENTRO de la clase Persona y en las clases que hereden de ella (como Empleado).
  protected direccion: string;

  constructor(nombre: string, edad: number, direccion: string) {
    this.nombre = nombre;
    this.edad = edad;
    this.direccion = direccion;
  }

  public presentarse(): void {
    // Dentro de la misma clase, tenemos acceso a todo.
    console.log(`Hola, soy ${this.nombre}, tengo ${this.edad} años y vivo en ${this.direccion}.`);
  }
}

// --- Clase Hija ---
class Empleado extends Persona {
  constructor(nombre: string, edad: number, direccion: string, public puesto: string) {
    // 'super' llama al constructor de la clase padre (Persona)
    super(nombre, edad, direccion);
  }

  public mostrarInfoEmpleado(): void {
    console.log(`Nombre del empleado: ${this.nombre}`); // ✅ OK: 'nombre' es público.
    console.log(`Dirección del empleado: ${this.direccion}`); // ✅ OK: 'direccion' es protegido y Empleado es una clase hija.
    // console.log(`Edad del empleado: ${this.edad}`); // ⛔ ERROR: 'edad' es privado de Persona. No se puede acceder aquí.
  }
```

### Implementación de interfaces
Las interfaces sirven para definir la forma que deben tener los objetos o clases, mientras que las clases se encargan de implementar esa forma y añadir comportamiento (métodos, lógica, etc.).

```ts
interface Persona {
  nombre: string;
  edad: number;
}

interface Trabajador {
  puesto: string;
  salario: number;
}

class Empleado implements Persona, Trabajador {
  constructor(
    public nombre: string,
    public edad: number,
    public puesto: string,
    public salario: number
  ) {}

  descripcion(): string {
    return `${this.nombre}, ${this.edad} años, trabaja como ${this.puesto}`;
  }
}
```

### Polimorfismo con interfaces

En programación, el polimorfismo significa que diferentes clases pueden comportarse de maneras distintas aunque compartan una misma interfaz o clase base. 

`“poli” = muchos y “morphos” = formas`

```ts
interface Animal {
  nombre: string;
  emitirSonido(): void;
}

class Perro implements Animal {
  constructor(public nombre: string) {}
  emitirSonido() {
    console.log("🐶 Guau!");
  }
}

class Gato implements Animal {
  constructor(public nombre: string) {}
  emitirSonido() {
    console.log("🐱 Miau!");
  }
}

function hacerSonar(animal: Animal) {
  animal.emitirSonido();
}

const mascotas: Animal[] = [new Perro("Toby"), new Gato("Michi")];

mascotas.forEach(hacerSonar);

```

### Clases abstractas

Una clase abstracta es un tipo especial de clase que actúa como un plano base para otras clases. No puedes crear un objeto directamente a partir de ella, sino que sirve como una plantilla que define una estructura y un comportamiento comunes que sus clases hijas deben seguir y pueden heredar.

Es el punto intermedio perfecto entre una interfaz (que solo define el contrato) y una clase normal (que lo implementa todo).

```ts
abstract class Figura {
  // Propiedad concreta con implementación
  constructor(public nombre: string) {}

  // Método concreto que las clases hijas heredan "gratis"
  mostrarNombre(): void {
    console.log(`Esta figura es un: ${this.nombre}`);
  }

  // Método abstracto: el "contrato"
  // No tiene cuerpo {}, solo define la firma.
  // Obliga a las clases hijas a implementarlo.
  abstract calcularArea(): number;
}

class Circulo extends Figura {
  constructor(public radio: number) {
    // 'super' llama al constructor de la clase padre 'Figura'
    super("círculo");
  }

  // Se implementa el método abstracto exigido por el contrato
  calcularArea(): number {
    return Math.PI * this.radio * this.radio;
  }
}

class Rectangulo extends Figura {
  constructor(public base: number, public altura: number) {
    super("rectángulo");
  }

  // Se implementa el método abstracto de una forma diferente
  calcularArea(): number {
    return this.base * this.altura;
  }
}

const miCirculo = new Circulo(10);
const miRectangulo = new Rectangulo(4, 6);

// const miFigura = new Figura("algo"); // ⛔ ERROR: No se puede crear una instancia de una clase abstracta.

miCirculo.mostrarNombre(); // Muestra: "Esta figura es un: círculo" (Método heredado)
console.log(`Área: ${miCirculo.calcularArea()}`); // Muestra: "Área: 314.15..."

miRectangulo.mostrarNombre(); // Muestra: "Esta figura es un: rectángulo" (Método heredado)
console.log(`Área: ${miRectangulo.calcularArea()}`); // Muestra: "Área: 24"
```