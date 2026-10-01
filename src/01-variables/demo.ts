/**
 * 01 - DECLARACIÓN DE VARIABLES: var, let y const
 *
 * Ejecutar:  npm run play -- src/01-variables/demo.ts
 */

// ---------- const ----------
// Ámbito de bloque. No se puede reasignar. Debe inicializarse.
const nombre = "Fran";
console.log(`const nombre = ${nombre}`);
// nombre = "Otro";   // Error: Cannot assign to 'nombre' because it is a constant.

// ---------- var vs let: ámbito ----------
if (true) {
  var conVar = "Maria"; // ámbito de FUNCIÓN (o de módulo si está fuera de una función)
  let conLet = "Jose"; // ámbito de BLOQUE: solo existe dentro de estas llaves
  console.log(`dentro del if -> conLet = ${conLet}`);
}

// `conVar` sigue accesible fuera del if porque var ignora el bloque.
conVar = "Pepito";
console.log(`fuera del if  -> conVar = ${conVar}`);

// console.log(conLet);  // Error: Cannot find name 'conLet'.

/**
 * OJO con la palabra "global":
 * este fichero es un MÓDULO (tiene import/export o el proyecto usa ESM),
 * así que `var` NO crea una variable global de verdad: se queda dentro del módulo.
 * En un script clásico de navegador sí colgaría de `window`.
 */

// ---------- Hoisting ----------
// `var` se "eleva" al principio: la DECLARACIÓN sube, el VALOR no.
// Por eso leerla antes de asignarla da `undefined` en vez de un error.
var tardia;
console.log(`hoisting de var  -> ${tardia}`); // undefined
tardia = "ya tengo valor";
console.log(`tras asignar     -> ${tardia}`);

// let y const también se elevan, pero quedan en la "temporal dead zone":
// leerlas antes de declararlas es un error de EJECUCIÓN.
// console.log(tardiaLet);   // ReferenceError: Cannot access 'tardiaLet' before initialization
let tardiaLet = "hola";
console.log(`let tras declarar -> ${tardiaLet}`);

// ---------- Redeclaración ----------
var repetida = "A";
var repetida = "B"; // permitido con var
console.log(`var redeclarada -> ${repetida}`);

let noRepetible = "A";
// let noRepetible = "B";   // Error: Cannot redeclare block-scoped variable.
console.log(`let no se redeclara -> ${noRepetible}`);

/**
 * REGLA PARA EL CURSO (y para Angular):
 * usa `const` por defecto y `let` solo si necesitas reasignar. `var` no se usa.
 */
export {};
