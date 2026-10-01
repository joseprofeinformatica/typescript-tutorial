# TypeScript

Material del módulo de introducción a **TypeScript**, como paso previo al desarrollo de aplicaciones web con **Angular 17**.

- TypeScript es un lenguaje de programación desarrollado por Microsoft.
- Es un **superset** de JavaScript: amplía sus capacidades añadiendo tipado estático, interfaces, genéricos, decoradores y otras herramientas pensadas para proyectos grandes.
- Al **transpilarlo** se convierte en JavaScript corriente, que ya puede ejecutar un navegador o Node.js.
- Cualquier fichero `.js` se puede renombrar a `.ts` y seguir funcionando, lo que permite migrar un proyecto poco a poco.

> **Matiz honesto sobre eso último.** Suele decirse que *"todo JavaScript es TypeScript
> válido"*. Con la configuración por defecto sí, pero este proyecto usa `strict`
> (la misma que Angular), y entonces no siempre es cierto. Este JavaScript perfectamente
> correcto **no compila aquí**:
>
> ```ts
> function saludar(nombre) {      // error TS7006: Parameter 'nombre' implicitly has an 'any' type.
>   return "Hola " + nombre;
> }
> ```
>
> No es un problema: es exactamente el trabajo que le estás pidiendo al compilador.
> Pero conviene saberlo antes de copiar y pegar código JavaScript de internet.

![TypeScript es un superset de JavaScript](images/superset.png)

## Ventajas

- **Detección temprana de errores**: gracias al tipado estático, muchos fallos se detectan al compilar y no cuando el usuario ya está usando la aplicación.
- **Mayor mantenibilidad**: el código es más fácil de entender y modificar, sobre todo en proyectos grandes.
- **Productividad**: el editor conoce los tipos, así que ofrece autocompletado, refactorización segura y documentación instantánea.
- **Orientado a objetos**: clases, interfaces y herencia de forma estructurada.
- **Compatibilidad con JavaScript**: se puede migrar un proyecto poco a poco, porque cualquier fichero `.js` es válido.

> **Importante**: TypeScript **no** se ejecuta. Todo el tipado desaparece al transpilar.
> Su trabajo entero ocurre mientras escribes el código, no mientras el programa corre.
> Lo verás tú mismo en [Ver la transpilación](#ver-la-transpilación).

---

# Contenido

Cada capítulo del manual tiene una carpeta en `src/` con un fichero `demo.ts` **ejecutable y comentado**. El README explica, la demo se ejecuta: van en paralelo.

Entre los capítulos hay **tres bloques de ejercicios** (19 en total) que comparten un hilo conductor: la gestión académica de un ciclo formativo.

| # | Capítulo | Carpeta en `src/` |
|---|---|---|
| | [Cómo usar este proyecto](#cómo-usar-este-proyecto) | — |
| | [Transpilar no es comprobar](#transpilar-no-es-comprobar) | — |
| 01 | [Declaración de variables](#01-declaración-de-variables) | `01-variables/` |
| 02 | [Tipos de datos](#02-tipos-de-datos) | `02-tipos-datos/` |
| 03 | [Operadores](#03-operadores) | `03-operadores/` |
| 04 | [Estructuras de control y repetición](#04-estructuras-de-control-y-repetición) | `04-control-flujo/` |
| 05 | [Arrays](#05-arrays) | `05-arrays/` |
| 06 | [Tuplas](#06-tuplas) | `06-tuplas/` |
| | **[Ejercicios · Bloque 1](#ejercicios--bloque-1--datos-y-colecciones)** (01-06) | `ejercicios/` |
| 07 | [Funciones](#07-funciones) | `07-funciones/` |
| 08 | [Objetos y `type`](#08-objetos-y-type) | `08-objetos-types/` |
| 09 | [Enumerados](#09-enumerados) | `09-enumerados/` |
| 10 | [Interfaces](#10-interfaces) | `10-interfaces/` |
| 11 | [Clases y POO](#11-clases-y-poo) | `11-clases/` |
| | **[Ejercicios · Bloque 2](#ejercicios--bloque-2--modelar-el-dominio)** (07-11) | `ejercicios/` |
| 12 | [Genéricos](#12-genéricos) | `12-genericos/` |
| 13 | [Utility types](#13-utility-types) | `13-utility-types/` |
| 14 | [Módulos: `import` y `export`](#14-módulos-import-y-export) | `14-modulos/` |
| 15 | [Asincronía: promesas, `async`/`await` y `fetch`](#15-asincronía-promesas-asyncawait-y-fetch) | `15-async/` |
| 16 | [Decoradores](#16-decoradores) | `16-decoradores/` |
| | **[Ejercicios · Bloque 3](#ejercicios--bloque-3--hacia-angular)** (12-16) | `ejercicios/` |
| | [De TypeScript a Angular 17](#de-typescript-a-angular-17) | — |
| | [Depurar en Visual Studio Code](#depurar-en-visual-studio-code) | `.vscode/` |

---

# Cómo usar este proyecto

## Requisitos

- **Node.js 18** o superior (probado con Node 24)
- Un editor con soporte de TypeScript: **Visual Studio Code**

## Puesta en marcha

```bash
npm install
```

## Comandos

| Comando | ¿Comprueba tipos? | Qué hace |
|---|:---:|---|
| `npm run play -- <fichero>` | sí | Comprueba los tipos y, **solo si no hay errores**, ejecuta el fichero |
| `npm run dev -- <fichero>` | sí | Lo mismo, pero repitiéndolo **cada vez que guardas**. Es el que más vas a usar |
| `npm run play:fast -- <fichero>` | **no** | Ejecuta sin comprobar nada |
| `npm run dev:fast -- <fichero>` | **no** | Vigila y ejecuta sin comprobar nada |
| `npm run check` | sí | Comprueba los tipos de **todo** el proyecto sin ejecutar nada |
| `npm run check:watch` | sí | Igual, pero vigilando. Útil para repasar un capítulo entero sin ejecutarlo |
| `npm run build` | sí | Transpila `src/` a JavaScript en `build/` |

```bash
npm run play -- src/05-arrays/demo.ts    # ejecutar la demo del capítulo 05
npm run dev  -- src/05-arrays/demo.ts    # trabajar con recarga automática
npm run check                            # ver todos los errores de tipos
```

La forma cómoda de trabajar es dejar `npm run dev` abierto en una terminal con la demo del capítulo que estés siguiendo. Cada vez que guardes, verás esto:

```
const nombre = Fran
dentro del if -> conLet = Jose
...
```

Y si te has equivocado en algún tipo, el programa **no llega a ejecutarse**: en su lugar aparece el error del compilador, y nada más.

```
src/01-variables/demo.ts(8,23): error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
```

Corriges, guardas, y vuelve a intentarlo solo. La pantalla se limpia en cada ciclo, así que lo que ves siempre corresponde al último guardado.

> **¿Por qué hay una columna «¿Comprueba tipos?»** Porque ejecutar TypeScript y comprobar
> TypeScript son dos operaciones distintas, y muchas herramientas hacen solo la primera.
> Las variantes `:fast` son justo eso. Se explica abajo, en
> [Transpilar no es comprobar](#transpilar-no-es-comprobar).

## Tu primer programa

Antes de leer los capítulos, escribe algo tuyo. Crea el fichero `src/prueba.ts`:

```ts
const nombre: string = "Jose";
const edad: number = 40;

function presentar(quien: string, anios: number): string {
  return `${quien} tiene ${anios} años`;
}

console.log(presentar(nombre, edad));
```

Ejecútalo:

```bash
npm run play -- src/prueba.ts
```

Ahora **rómpelo a propósito**. Cambia la llamada por esta:

```ts
console.log(presentar(edad, nombre)); // argumentos en orden cambiado
```

Pasan dos cosas, y conviene no mezclarlas.

**1. El editor te avisa al momento.** Sin ejecutar nada, aparece el subrayado rojo bajo `edad` y el mensaje al pasar el ratón.

**2. Al ejecutar, el programa ni siquiera arranca:**

```bash
npm run play -- src/prueba.ts
```

```
src/prueba.ts(8,23): error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
```

Eso es TypeScript haciendo su trabajo: el error se detecta **antes** de ejecutar, no a mitad de la ejecución ni en casa del cliente.

> El subrayado rojo del editor y el error de `npm run check` son **el mismo compilador**.
> VS Code lo ejecuta continuamente mientras escribes; por eso no hace falta compilar
> para ver los errores.

## Transpilar no es comprobar

Con el fichero todavía roto, prueba ahora el otro comando:

```bash
npm run play:fast -- src/prueba.ts
```

```
40 tiene Jose años
```

**Se ejecuta.** Sin una queja. Y encima imprime un disparate: una edad donde va un nombre y un nombre donde va una edad.

Esto no es un fallo del proyecto: es la distinción más importante de todo el curso.

| Operación | Quién la hace aquí | Qué hace |
|---|---|---|
| **Transpilar** | `tsx` (usa *esbuild*) | Borra las anotaciones de tipo y deja JavaScript. Es un borrado mecánico, rapidísimo |
| **Comprobar tipos** | `tsc` (`npm run check`) | Lee esas anotaciones y busca contradicciones. Es lo lento, y lo valioso |

`tsx` **solo transpila**. Le da igual que `presentar(edad, nombre)` no tenga sentido: quita los `: string`, obtiene JavaScript válido y lo ejecuta. El resultado es exactamente el que habrías tenido escribiendo JavaScript desde el principio.

Por eso `npm run play` encadena las dos cosas:

```
tsc --noEmit  &&  tsx <fichero>
   comprueba       ejecuta
```

Si `tsc` encuentra un solo error, el `&&` corta y `tsx` no llega a ejecutarse. `npm run dev` hace lo mismo, repitiendo el ciclo cada vez que guardas.

> **Regla importante: todo el código ejecutable va dentro de `src/`.**
> `tsc` solo comprueba los ficheros que lista el `tsconfig.json`
> (`"include": ["src/**/*.ts"]`). Un `.ts` creado fuera de `src/` no lo mira nadie: `tsc`
> termina sin errores, el `&&` da paso y el fichero se ejecuta **sin comprobar**, en silencio.
> Si alguna vez `npm run play` ejecuta algo que sabes que está mal tipado, lo primero que hay
> que mirar es dónde está el fichero.

> **Cuándo usar `play:fast`**: `npm run play` comprueba **todo el proyecto**, así que un
> ejercicio a medio hacer te impedirá ejecutar cualquier otro capítulo. Cuando eso moleste,
> `play:fast` te saca del paso. Pero que quede claro lo que estás haciendo: renunciar a la
> única red de seguridad que te daba TypeScript.

Y una advertencia para el futuro: **muchas herramientas modernas se comportan como `tsx`**. Vite, esbuild o Bun transpilan sin comprobar, y dejan la comprobación de tipos como un paso aparte. Angular es de las que sí comprueba —el compilador de Angular es el propio `tsc` por dentro—, pero acostúmbrate a ejecutar la comprobación de tipos **de forma explícita**: que un programa arranque no significa que esté bien tipado.

## Cómo leer un error de TypeScript

Los mensajes asustan al principio, pero todos tienen la misma estructura:

```
src/prueba.ts(9,23): error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
   └─ fichero  └─ línea, columna    └─ código   └─ qué esperaba y qué recibió
```

La parte útil casi siempre es la última: **qué tipo esperaba** y **qué tipo le has dado**. El código `TSxxxx` sirve para buscar en internet.

Estos son los que más vas a ver en este proyecto, todos comprobados:

| Código | Mensaje | Qué significa |
|---|---|---|
| `TS2322` | `Type 'string' is not assignable to type 'number'` | Asignas un valor del tipo equivocado |
| `TS2345` | `Argument of type 'string' is not assignable to parameter of type 'number'` | Pasas un argumento del tipo equivocado |
| `TS7006` | `Parameter 'x' implicitly has an 'any' type` | Falta tipar un parámetro (típico en callbacks) |
| `TS2339` | `Property 'b' does not exist on type '{ a: number; }'` | Accedes a una propiedad que no existe |
| `TS2551` | `Property 'pusshh' does not exist... Did you mean 'push'?` | Lo mismo, pero con sugerencia: casi siempre una errata |
| `TS18048` | `'opt' is possibly 'undefined'` | Puede no haber valor: usa `?.`, `??` o un `if` |
| `TS2564` | `Property 'prop' has no initializer...` | Propiedad de clase sin valor inicial ni asignación en el constructor |
| `TS4114` | `This member must have an 'override' modifier` | Falta `override` al sobrescribir un método del padre |
| `TS2353` | `Object literal may only specify known properties` | Le sobra una propiedad al objeto |

> **Truco**: `npm run check` lista **todos** los errores del proyecto de una vez.
> Es lo que conviene ejecutar antes de dar por terminado un ejercicio.

## Ver la transpilación

Este comando es el que mejor explica qué es TypeScript:

```bash
npm run build
cat build/10-interfaces/demo.js
```

Compara el `.ts` original con el `.js` generado. Comprobarás que **han desaparecido por completo** las `interface`, los `type`, las anotaciones `: string` y los `import type`; y que **permanecen** las clases, los `enum` y toda la lógica.

Esa es la idea central del curso: el tipado es una red de seguridad para el programador que se retira antes de ejecutar.

> `npm run build` sirve para *mirar* el resultado. Para *ejecutar* el código usa siempre `npm run play`.

> Cuando termines los capítulos, al final del manual tienes una guía para
> [depurar en Visual Studio Code](#depurar-en-visual-studio-code) con breakpoints.

## Estructura

```
.vscode/              configuración de depuración (launch.json, tasks.json)
scripts/
  dev.mjs             comprueba los tipos y ejecuta, en bucle al guardar
src/
  01-variables/       02-tipos-datos/     03-operadores/
  04-control-flujo/   05-arrays/          06-tuplas/
  07-funciones/       08-objetos-types/   09-enumerados/
  10-interfaces/      11-clases/          12-genericos/
  13-utility-types/   14-modulos/         15-async/
  16-decoradores/
  ejercicios/
    README.md
    soluciones/       ejercicio-01.ts ... ejercicio-19.ts
```

## Sobre la configuración

El `tsconfig.json` está alineado con el que genera **Angular 17** (`ng new`): mismo `target` (ES2022), misma resolución de módulos (`bundler`), los mismos chequeos estrictos y los decoradores activados.

Esto significa que **lo que compile aquí compilará igual dentro de un proyecto Angular**. A cambio, hay tres reglas estrictas que conviene conocer desde el principio, porque darán errores que en otros tutoriales no aparecen:

| Opción | Qué te obliga a hacer |
|---|---|
| `strict` | Tipar los parámetros, contemplar `null`/`undefined` e inicializar las propiedades de las clases |
| `noImplicitOverride` | Escribir `override` al sobrescribir un método del padre |
| `noPropertyAccessFromIndexSignature` | Acceder con `obj["clave"]` y no con `obj.clave` cuando la clave es dinámica |

La versión de TypeScript está fijada a `~5.4.5` porque Angular 17 exige `>=5.2 <5.5`.

---

# 01. Declaración de variables

> ▶️ `npm run play -- src/01-variables/demo.ts`

En TypeScript, igual que en JavaScript, hay tres formas de declarar una variable: `var`, `let` y `const`. Se diferencian en tres cosas: **ámbito**, **redeclaración** y **reasignación**.

## `const`

Ámbito de bloque, no se puede reasignar y debe inicializarse al declararla.

```ts
const nombre = "Fran";
console.log(`const nombre = ${nombre}`);
// nombre = "Otro";   // Error: Cannot assign to 'nombre' because it is a constant.
```

Que sea constante significa que **no puedes cambiar la referencia**, no que el contenido sea inmutable. Con un objeto o un array sí puedes modificar lo de dentro:

```ts
const persona = { nombre: "Ana", edad: 25 };
persona.nombre = "Luis";                   // ✅ se modifica una propiedad
persona.edad = 26;                         // ✅ también
// persona = { nombre: "Luis", edad: 26 }; // ❌ se intenta cambiar la referencia
```

## Ámbito: `var` frente a `let`

`let` tiene ámbito de **bloque**: solo existe entre las llaves donde se declaró. `var` tiene ámbito de **función**, así que se escapa del `if`:

```ts
if (true) {
  var conVar = "Maria"; // ámbito de FUNCIÓN (o de módulo si está fuera de una función)
  let conLet = "Jose"; // ámbito de BLOQUE: solo existe dentro de estas llaves
  console.log(`dentro del if -> conLet = ${conLet}`);
}

// `conVar` sigue accesible fuera del if porque var ignora el bloque.
conVar = "Pepito";
console.log(`fuera del if  -> conVar = ${conVar}`);

// console.log(conLet);  // Error: Cannot find name 'conLet'.
```

> **Matiz sobre la palabra "global"**
> Suele decirse que `var` crea una variable global. En este proyecto no es cierto:
> cada fichero es un **módulo**, así que `var` se queda dentro del módulo y no
> es accesible desde otros ficheros. En un script clásico de navegador sí colgaría
> de `window`.

## Hoisting

El motor de JavaScript "eleva" las declaraciones al principio del ámbito antes de ejecutar el código. Con `var`, **sube la declaración pero no el valor**: por eso leerla antes de asignarla da `undefined` en lugar de un error.

```ts
var tardia;
console.log(`hoisting de var  -> ${tardia}`); // undefined
tardia = "ya tengo valor";
console.log(`tras asignar     -> ${tardia}`);
```

`let` y `const` también se elevan, pero quedan en la llamada *temporal dead zone*: leerlas antes de su declaración es un error de ejecución.

```ts
// console.log(tardiaLet);   // ReferenceError: Cannot access 'tardiaLet' before initialization
let tardiaLet = "hola";
console.log(`let tras declarar -> ${tardiaLet}`);
```

## Redeclaración

`var` permite declarar dos veces la misma variable, lo que esconde errores tipográficos. `let` y `const` no lo permiten:

```ts
var repetida = "A";
var repetida = "B"; // permitido con var
console.log(`var redeclarada -> ${repetida}`);

let noRepetible = "A";
// let noRepetible = "B";   // Error: Cannot redeclare block-scoped variable.
```

## Resumen

| | Ámbito | ¿Redeclarar? | ¿Reasignar? | Hoisting |
|---|---|---|---|---|
| `var` | Función | Sí | Sí | Sube como `undefined` |
| `let` | Bloque | No | Sí | Temporal dead zone |
| `const` | Bloque | No | **No** | Temporal dead zone |

> **Regla del curso (y de Angular)**: usa `const` por defecto, `let` solo si
> necesitas reasignar, y `var` nunca.

---

# 02. Tipos de datos

> ▶️ `npm run play -- src/02-tipos-datos/demo.ts`

## Primitivos

Los tres tipos básicos son `string`, `number` y `boolean`. Se anotan con dos puntos detrás del nombre:

```ts
let nombre: string = "Carlos Mendoza";
let edad: number = 18.2; // number cubre enteros y decimales
let mayorEdad: boolean = true;
```

Fíjate en que `number` **no distingue** entre enteros y decimales: no existen `int` ni `float`.

## Inferencia de tipos

Si inicializas la variable al declararla, no hace falta anotar el tipo: TypeScript lo deduce solo y a partir de ahí lo vigila igual de estrictamente.

```ts
let ciudad = "Sevilla"; // inferido: string
// ciudad = 3;          // Error: Type 'number' is not assignable to type 'string'.
```

Por eso en la práctica se escriben menos anotaciones de las que parece. La inferencia también funciona en arrays y en el valor de retorno de las funciones.

## `any`: desactiva el chequeo

`any` le dice al compilador "deja de comprobar esto". Acepta cualquier valor y cualquier operación:

```ts
let cualquierCosa: any = "Hola";
cualquierCosa = 2;
cualquierCosa = true;
cualquierCosa = "HOLA";

// Compila, pero si el valor no fuese string reventaría en EJECUCIÓN.
// `any` es una puerta trasera: evítalo.
console.log(cualquierCosa.toLowerCase());
```

Ese `console.log` es exactamente el tipo de error que TypeScript existe para evitar: compila sin quejarse y falla cuando el programa ya está corriendo.

## `unknown`: el `any` seguro

`unknown` también admite cualquier valor, pero **no te deja usarlo hasta que compruebes qué es**:

```ts
let tipoDatoDesconocido: unknown;

tipoDatoDesconocido = "Nombre";
tipoDatoDesconocido = 18;
tipoDatoDesconocido = "Ahora soy texto";

// console.log(tipoDatoDesconocido.toUpperCase());  // Error: 'tipoDatoDesconocido' is of type 'unknown'.

// Hay que comprobar el tipo antes de usarlo (type guard / narrowing):
if (typeof tipoDatoDesconocido === "string") {
  console.log(tipoDatoDesconocido.toUpperCase()); // aquí TS ya sabe que es string
}
```

Esa comprobación se llama **narrowing** (estrechamiento): dentro del `if`, TypeScript ya sabe que la variable es un `string` y te ofrece sus métodos. Es un mecanismo que reaparecerá en uniones, en `catch` y en los formularios de Angular.

> Cuando no sepas el tipo de un dato que llega de fuera, usa `unknown`, no `any`.

## `void` y `never`

`void` es el tipo de retorno de una función que no devuelve nada:

```ts
function avisar(mensaje: string): void {
  console.log(`AVISO: ${mensaje}`);
}
```

`never` es el de una función que **nunca termina** de forma normal, porque lanza un error o entra en un bucle infinito:

```ts
function lanzarError(msg: string): never {
  throw new Error(msg);
}
```

## `null` y `undefined`

Con `strict` activado no puedes asignar `null` a un `string` sin más: hay que declararlo en el tipo con una unión.

```ts
let apellido: string | null = null;
apellido = "García";
```

Esto es lo que evita el error más común de JavaScript, el famoso *"cannot read property of undefined"*: el compilador te obliga a contemplar el caso.

## Concatenar cadenas

Hay dos formas. La segunda, los **template literals**, se delimita con acentos graves y admite cualquier expresión dentro de `${}`:

```ts
console.log("Tu nombre es: " + nombre); // concatenación clásica
console.log(`Tu nombre es ${nombre}`); // template literal (preferido)
console.log(`El año que viene tendrás ${Math.floor(edad) + 1} años`);
```

Los template literals son los que usarás para interpolar en las plantillas de Angular, y además permiten escribir texto de varias líneas sin concatenar nada.

---

# 03. Operadores

> ▶️ `npm run play -- src/03-operadores/demo.ts`

## Comparación

```ts
const cinco: number = 5;
const cuatro: number = 4;
const cincoTexto: unknown = "5";

// == compara solo el VALOR y convierte tipos por el camino
console.log("5 == '5'  ->", cinco == (cincoTexto as number)); // true
// === compara valor Y tipo: es el que debes usar siempre
console.log("5 === 5   ->", cinco === 5); // true
console.log("5 !== 4   ->", cinco !== cuatro); // true
```

| Operador | Nombre | Ejemplo | Resultado |
|---|---|---|---|
| `==` | Igualdad débil | `"5" == 5` | `true` |
| `===` | Igualdad estricta | `"5" === 5` | `false` |
| `!=` | Desigualdad débil | `"5" != 5` | `false` |
| `!==` | Desigualdad estricta | `"5" !== 5` | `true` |
| `<`, `>`, `<=`, `>=` | Comparación numérica | `5 > 3` | `true` |

> **Usa siempre `===` y `!==`.** `==` convierte tipos antes de comparar y produce
> resultados sorprendentes (`0 == ""` es `true`).

Un detalle del compilador: si comparas dos literales fijos, como `5 === 4`, TypeScript avisa de que la comparación no tiene sentido porque ya conoce el resultado. Por eso en la demo los valores están en constantes anotadas como `number`.

## Lógicos

```ts
const a = true;
const b = false;
console.log("a && b ->", a && b); // AND
console.log("a || b ->", a || b); // OR
console.log("!a     ->", !a); // NOT
```

## Aritméticos

```ts
console.log("7 % 2 =", 7 % 2); // resto
console.log("7 ** 2 =", 7 ** 2); // potencia
```

| Operador | Significado | Ejemplo | Resultado |
|---|---|---|---|
| `+` | Suma o concatenación | `3 + 2`, `"a" + "b"` | `5`, `"ab"` |
| `-`, `*`, `/` | Resta, multiplicación, división | `10 / 4` | `2.5` |
| `%` | Resto (módulo) | `10 % 3` | `1` |
| `**` | Exponenciación | `2 ** 3` | `8` |
| `++`, `--` | Incremento / decremento | `x++` | Suma o resta 1 |

## Asignación

```ts
let contador = 10;
contador += 5;
contador -= 3;
contador *= 2;
contador /= 4;
console.log("contador ->", contador);
contador++;
```

| Operador | Equivale a |
|---|---|
| `x += 2` | `x = x + 2` |
| `x -= 2` | `x = x - 2` |
| `x *= 2` | `x = x * 2` |
| `x /= 2` | `x = x / 2` |
| `x ??= 10` | Asigna `10` solo si `x` es `null` o `undefined` |

## Acceso seguro: `?.` y `??`

Estos dos operadores son fundamentales en Angular, donde constantemente trabajas con datos que todavía no han llegado del servidor.

**Optional chaining `?.`**: si la propiedad intermedia no existe, devuelve `undefined` en vez de romper el programa.

```ts
type Usuario = { nombre: string; direccion?: { ciudad: string } };

const u1: Usuario = { nombre: "Ana", direccion: { ciudad: "Cádiz" } };
const u2: Usuario = { nombre: "Luis" };

// Optional chaining `?.`: si `direccion` es undefined, devuelve undefined en vez de romper.
console.log("u1 ciudad ->", u1.direccion?.ciudad);
console.log("u2 ciudad ->", u2.direccion?.ciudad); // undefined
```

**Nullish coalescing `??`**: da un valor por defecto, pero solo cuando el valor es `null` o `undefined`.

```ts
console.log("u2 ciudad ->", u2.direccion?.ciudad ?? "Sin ciudad");
```

La diferencia con `||` es importante y es fuente de bugs reales. No preguntan lo mismo:

- `||` pregunta: *¿es esto **falsy**?* (`0`, `""`, `false`, `NaN`, `null`, `undefined`)
- `??` pregunta: *¿es esto **`null` o `undefined`**?* (solo esos dos)

```ts
// Cuidado: `||` también sustituye "" y 0, `??` no.
const cantidad = 0;
console.log("con || ->", cantidad || 99); // 99  (0 se considera falsy)
console.log("con ?? ->", cantidad ?? 99); // 0   (0 no es null ni undefined)
```

Solo coinciden cuando el valor es `null` o `undefined`. En cualquier otro caso *falsy*, `||` sustituye un dato que era perfectamente válido:

| Valor | `valor \|\| 99` | `valor ?? 99` |
|---|---|---|
| `0` | `99` ⚠️ | `0` |
| `""` | `99` ⚠️ | `""` |
| `false` | `99` ⚠️ | `false` |
| `NaN` | `99` ⚠️ | `NaN` |
| `null` | `99` | `99` |
| `undefined` | `99` | `99` |

Si usas `||` para poner un valor por defecto a una cantidad, un `0` legítimo se convertirá en el valor por defecto. Usa `??`, y reserva `||` para cuando de verdad quieras tratar *cualquier* valor vacío como ausente.

| Operador | Nombre | Qué hace |
|---|---|---|
| `?.` | Optional chaining | Accede solo si el objeto existe |
| `?.[ ]` | Acceso opcional por índice | `frutas?.[0]` |
| `?.()` | Llamada opcional | `objeto.metodo?.()` |
| `??` | Nullish coalescing | Valor por defecto si es `null`/`undefined` |
| `!` | Non-null assertion | "Confía, no es null" (solo TypeScript) |
| `? :` | Ternario | `edad > 18 ? "Adulto" : "Menor"` |

## Spread y desestructuración

El operador `...` (**spread**) copia los elementos de un array u objeto dentro de otro:

```ts
const numeros = [1, 2, 3];
const masNumeros = [...numeros, 4, 5]; // copia + añade
console.log("spread array ->", masNumeros);

const base = { nombre: "Ana", edad: 20 };
const ampliado = { ...base, ciudad: "Cádiz" }; // copia + añade propiedad
console.log("spread objeto ->", ampliado);
```

Es la forma habitual de actualizar datos **sin modificar el original**, algo que Angular agradece porque le permite detectar cambios.

La **desestructuración** hace lo contrario: saca valores de un array u objeto a variables sueltas.

```ts
// Desestructuración de array
const [primero, segundo] = numeros;
console.log("desestructurando array ->", primero, segundo);

// Desestructuración de objeto (así se reciben props en Angular/JS moderno)
const { nombre: nombreUsuario, edad: edadUsuario } = base;
console.log("desestructurando objeto ->", nombreUsuario, edadUsuario);
```

En los arrays importa **la posición**; en los objetos, **el nombre de la propiedad**. Con `:` se renombra la variable resultante.

---

# 04. Estructuras de control y repetición

> ▶️ `npm run play -- src/04-control-flujo/demo.ts`

## `if` / `else if` / `else`

```ts
const nota: number = 7;

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

Las condiciones se evalúan **en orden** y se ejecuta la primera que se cumple. Por eso van de mayor a menor: si empezaras por `nota >= 5`, un 10 entraría ahí y nunca llegaría a "Sobresaliente".

## Operador ternario

Versión compacta de un `if/else` que **devuelve un valor**:

```ts
const edad: number = 20;
console.log(edad >= 18 ? "Mayor de edad" : "Menor de edad");
```

Estructura: `condición ? valorSiCierto : valorSiFalso`.

## `switch`

```ts
const dia: number = 3; // sin anotar, TS inferiría el literal `3` y los demás case sobrarían

switch (dia) {
  case 1:
    console.log("Lunes");
    break; // sin break cae al siguiente case (fallthrough)
  case 2:
    console.log("Martes");
    break;
  case 3:
    console.log("Miércoles");
    break;
  default:
    console.log("Día no válido");
}
```

Dos detalles:

- Sin `break`, la ejecución **cae al siguiente `case`**. En este proyecto y en Angular está activo `noFallthroughCasesInSwitch`, así que el compilador avisa si se te olvida.
- Fíjate en la anotación `: number`. Si escribieras `const dia = 3`, TypeScript inferiría el tipo literal `3` y marcaría los demás `case` como imposibles.

## `for`

```ts
for (let i = 1; i <= 5; i++) {
  console.log(`for -> ${i}`);
}
```

Tres partes: inicialización (`let i = 1`), condición de continuación (`i <= 5`) e incremento (`i++`).

## `for...of` y `for...in`

```ts
// for...of : recorre VALORES
const frutas = ["manzana", "pera", "plátano"];
for (const fruta of frutas) {
  console.log(`for...of -> ${fruta}`);
}

// for...in : recorre CLAVES (índices o propiedades)
for (const indice in frutas) {
  console.log(`for...in -> índice ${indice}`);
}
```

No los confundas: **`of` da los valores, `in` da las claves**. En un array, `for...in` te devuelve los índices, y además como texto (`"0"`, `"1"`…). En el 99 % de los casos querrás `for...of`.

## `while` y `do...while`

```ts
let contador = 0;
while (contador < 3) {
  console.log(`while -> ${contador}`);
  contador++;
}
```

La diferencia del `do...while` es que **el cuerpo se ejecuta al menos una vez**, porque la condición se comprueba al final:

```ts
let n = 10;
do {
  console.log(`do...while -> ${n}`);
  n++;
} while (n < 3); // la condición es falsa, pero el cuerpo ya se ejecutó una vez
```

## `break` y `continue`

- `break` sale del bucle inmediatamente.
- `continue` salta a la siguiente vuelta.

```ts
for (let i = 1; i <= 10; i++) {
  if (i === 4) continue; // salta esta vuelta
  if (i === 7) break; // sale del bucle
  console.log(`break/continue -> ${i}`);
}
```

Imprime 1, 2, 3, 5 y 6: se salta el 4 y se detiene al llegar al 7.

---

# 05. Arrays

> ▶️ `npm run play -- src/05-arrays/demo.ts`

Un array es una colección ordenada de elementos. En TypeScript se declara indicando el tipo de sus elementos seguido de `[]`.

## Declaración y tipado

```ts
const numeros: number[] = [3, 5, 8, 11];
const numeros2: number[] = [15, 21, 27];

// Array de varios tipos (union type)
const mixto: (number | string)[] = [3, "Jose", 5, "Juan"];

// Array bidimensional
const array2d: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log("array2d[0][0] ->", array2d[0][0]);
```

Los paréntesis en `(number | string)[]` son obligatorios: sin ellos, `number | string[]` significaría "un número **o** un array de textos", que es otra cosa.

## Copiar y unir con spread

```ts
const numeros3 = [...numeros, ...numeros2];

numeros3[0] = 10; // spread hace copia: el original NO se toca
console.log("numeros3 modificado ->", numeros3);
console.log("numeros intacto     ->", numeros);
```

Este es el punto importante: `...` crea un array **nuevo**. Modificarlo no afecta a los originales.

### Cuidado: el spread hace una copia *superficial*

La regla anterior vale con primitivos (`number`, `string`, `boolean`). Si el array contiene **objetos**, el spread copia las *referencias*: el array es nuevo, pero los objetos de dentro son los mismos.

```ts
const alumnos = [{ nombre: "Ana" }, { nombre: "Luis" }];
const copiaAlumnos = [...alumnos];

copiaAlumnos[0].nombre = "MODIFICADO"; // tocamos la COPIA...
console.log("original ->", alumnos[0].nombre); // ...y cambia el ORIGINAL ❌
```

Ejecuta la demo: imprime `MODIFICADO`. Es uno de los bugs más habituales y más difíciles de encontrar, porque el código *parece* correcto.

Para copiar también lo de dentro hay dos opciones:

```ts
// Para copiar también los objetos de dentro (copia profunda):
const copiaProfunda = alumnos2.map((a) => ({ ...a })); // copia cada objeto
```

```ts
// structuredClone() también sirve y funciona a cualquier profundidad
const copiaTotal = structuredClone(alumnos2);
```

`map` con spread basta para un nivel de anidamiento; `structuredClone()` funciona a cualquier profundidad.

> Esto importa especialmente en Angular: al actualizar el estado de un componente
> se suele hacer `this.items = [...this.items]` para que detecte el cambio. Si
> dentro hay objetos y los modificas, estarás cambiando el original sin querer.

## Añadir y quitar elementos

```ts
const anumeros = [1, 3, 5, 7, 9];

anumeros.push(11); // añade al FINAL
anumeros.pop(); // quita del FINAL
anumeros.push(13, 15, 17); // push admite varios
anumeros.unshift(0); // añade al PRINCIPIO
console.log("shift devuelve ->", anumeros.shift()); // quita del PRINCIPIO y lo devuelve
```

| Método | Dónde actúa | Qué devuelve |
|---|---|---|
| `push(...)` | Final | La nueva longitud |
| `pop()` | Final | El elemento quitado |
| `unshift(...)` | Principio | La nueva longitud |
| `shift()` | Principio | El elemento quitado |

Los cuatro **modifican el array original**, aunque esté declarado como `const`.

## Acceso y longitud

```ts
anumeros[0] = -1;
console.log("longitud    ->", anumeros.length);
console.log("último      ->", anumeros[anumeros.length - 1]); // -1 porque los índices empiezan en 0
console.log("fuera de rango ->", anumeros[anumeros.length]); // undefined
```

Acceder a una posición que no existe **no da error**: devuelve `undefined`. Es una de las trampas clásicas de JavaScript.

## Buscar elementos

```ts
const frutas = ["manzana", "pera", "platano", "mandarina", "manzana", "platano"];

console.log("indexOf('platano') ->", frutas.indexOf("platano")); // primera posición, o -1
console.log("includes('pera')   ->", frutas.includes("pera")); // true / false

// find: devuelve el primer ELEMENTO que cumple la condición
console.log(
  "find len>5   ->",
  frutas.find((valor) => valor.length > 5),
);

// findIndex: devuelve la primera POSICIÓN que cumple la condición
console.log(
  "findIndex    ->",
  frutas.findIndex((valor) => valor.length > 5),
);
```

| Método | Devuelve | Si no encuentra nada |
|---|---|---|
| `indexOf(valor)` | La posición | `-1` |
| `includes(valor)` | `true` / `false` | `false` |
| `find(condición)` | El elemento | `undefined` |
| `findIndex(condición)` | La posición | `-1` |

`indexOf` e `includes` buscan **un valor concreto**; `find` y `findIndex` reciben una **función** y buscan el primero que la cumpla.

## Recorrer y transformar

Estos cuatro métodos son los que más usarás, y los tres últimos son la base del estilo de programación que se emplea en Angular.

```ts
// forEach: ejecuta una función por cada elemento. No devuelve nada.
frutas.forEach((valor: string) => {
  if (valor.length > 5) console.log(`forEach -> ${valor}`);
});

// map: TRANSFORMA cada elemento y devuelve un array NUEVO
const frutasUpper = frutas.map((fruta: string) => fruta.toUpperCase());

// filter: se queda con los que cumplen la condición, en un array NUEVO
const frutasFiltradas = frutas.filter((fruta: string) => fruta.length > 6);

// reduce: ACUMULA todos los elementos en un único valor
const numerosEnteros = [11, 1, 2, 3, 4, 5, 6, 7];
const total = numerosEnteros.reduce((acc: number, actual: number) => acc + actual, 0);
```

| Método | Para qué sirve | Devuelve |
|---|---|---|
| `forEach` | Hacer algo con cada elemento | Nada (`void`) |
| `map` | Transformar cada elemento | Array **nuevo**, misma longitud |
| `filter` | Quedarse con algunos | Array **nuevo**, igual o menor |
| `reduce` | Combinar todo en un único valor | El valor acumulado |

En `reduce`, el segundo argumento (`0` en el ejemplo) es el **valor inicial del acumulador**. Conviene ponerlo siempre: sin él, un array vacío lanza un error.

```ts
const miNombre = ["Carlos", "Eduardo", "Mendoza", "Ruiz"];
const nombreConcatenado = miNombre.reduce((anterior, actual) => `${anterior} ${actual}`);
```

## Ordenar y trocear

```ts
// sort MODIFICA el array original. Con números hay que pasarle el comparador.
console.log("sort  ->", [...numerosEnteros].sort((a, b) => a - b));
console.log("slice ->", miNombre.slice(0, 2)); // copia un trozo, no modifica
console.log("join  ->", numeros.join(" ")); // array -> string
```

Dos avisos sobre `sort`:

1. **Modifica el array original.** Por eso en la demo se hace `[...numerosEnteros].sort(...)`: primero se copia con spread.
2. **Por defecto ordena como texto.** `[10, 9, 1, 2].sort()` devuelve `[1, 10, 2, 9]`, porque compara carácter a carácter. Para números hay que pasarle el comparador `(a, b) => a - b`.

`slice(inicio, fin)` copia un trozo sin tocar el original; el índice `fin` **no se incluye**.

---

# 06. Tuplas

> ▶️ `npm run play -- src/06-tuplas/demo.ts`

Una tupla es un array de **longitud fija** en el que **cada posición tiene su propio tipo**. La diferencia con un array normal: en un array todos los elementos son del mismo tipo y caben los que quieras; en una tupla, la posición 0 es un `string`, la 1 un `number`, y se acabó.

## Declaración

```ts
let nombreEdad: [string, number];
nombreEdad = ["Jose", 17];

// Los tipos deben ir en la posición correcta:
// nombreEdad = [17, "Jose"];   // Error: Type 'number' is not assignable to type 'string'.

console.log(`Mi nombre es ${nombreEdad[0]}`); // string
console.log(`Mi edad es ${nombreEdad[1]}`); // number
```

Al acceder por índice, TypeScript ya sabe qué tipo hay en cada posición: `nombreEdad[0]` es un `string` y ofrece `.toUpperCase()`, `nombreEdad[1]` es un `number` y ofrece `.toFixed()`.

## Desestructuración

Es la forma habitual de leerlas, porque da nombres con sentido a cada posición:

```ts
const [nombre, edad] = nombreEdad;
console.log(`Desestructurada -> ${nombre} tiene ${edad} años`);
```

## Tuplas con nombre

Los nombres no cambian nada en tiempo de ejecución, pero documentan el código y mejoran el autocompletado:

```ts
type Producto = [nombre: string, precio: number];

const camiseta: Producto = ["Camiseta", 19.95];
console.log(`El producto ${camiseta[0]} tiene un precio de ${camiseta[1]} euros`);
```

## Elementos opcionales

```ts
type Coordenada = [x: number, y: number, z?: number]; // z es opcional

const plano: Coordenada = [10, 20];
const espacio: Coordenada = [10, 20, 30];
```

## Devolver varios valores desde una función

Este es el uso práctico más frecuente de las tuplas:

```ts
function dividir(a: number, b: number): [cociente: number, resto: number] {
  return [Math.floor(a / b), a % b];
}

const [cociente, resto] = dividir(17, 5);
console.log(`17 / 5 -> cociente ${cociente}, resto ${resto}`);
```

Una función solo puede devolver un valor, pero si ese valor es una tupla puedes repartirlo en varias variables al recibirlo. Es el mismo patrón que usan los *hooks* de React o `useState`.

---

# Ejercicios · Bloque 1 — Datos y colecciones

> 📁 Soluciones comentadas: [`src/ejercicios/`](src/ejercicios/README.md)

Los diecinueve ejercicios del curso cuentan una misma historia: la **gestión académica de un ciclo formativo** (grupos, alumnos, notas, matrículas…). Este primer bloque corresponde a los capítulos 01 a 06.

## Cómo trabajar cada ejercicio

1. Crea tu fichero **dentro de `src/`**, por ejemplo en `src/mis-ejercicios/ejercicio-01.ts`. Si lo creas fuera de `src/`, `npm run check` no lo revisará.
2. Termina cada fichero con esta línea:
   ```ts
   export {};
   ```
   Sin ella, las variables de un ejercicio chocan con las de otro que use los mismos nombres y aparece el error `Cannot redeclare block-scoped variable`.
3. Déjalo ejecutándose mientras trabajas. Se volverá a ejecutar cada vez que guardes:
   ```bash
   npm run dev -- src/mis-ejercicios/ejercicio-01.ts
   ```
4. Compara lo que sale por pantalla con la **salida esperada** de cada enunciado.
5. Pasa `npm run check` para asegurarte de que no hay errores de tipos.
6. Solo entonces abre la solución y compárala con la tuya. Hay muchas formas correctas de resolver cada ejercicio.

---

### Ejercicio 01 — La ficha del módulo
*Capítulos 01, 02 y 03* · **Practicarás:** `const` y `let`, operaciones con números y plantillas de texto.

Vas a montar la ficha de un grupo de clase: cuántas plazas tiene y cuántas están ocupadas.

**Pasos**

1. Guarda en **constantes** (`const`) los datos que no cambian en todo el curso: el nombre del centro (`"IES Los Alcores"`), el ciclo (`"Desarrollo de Aplicaciones Multiplataforma"`) y las plazas totales (`30`).
2. Guarda en una **variable** (`let`) los alumnos matriculados (`26`), porque ese dato sí cambia.
3. Muestra la ficha: el centro y el ciclo, los matriculados y las plazas libres. Las plazas libres **no las guardes** en otra variable: calcúlalas cada vez que las necesites (plazas totales menos matriculados).
4. Matricula a dos alumnos más y vuelve a mostrar los matriculados y las plazas libres.
5. Muestra el porcentaje de ocupación con **un decimal** y, debajo, `"Quedan plazas"` o `"Grupo completo"`, según corresponda.
6. Declara con `const` un objeto `grupo` con un código (`"DAM2"`) y un tutor. Cámbiale el tutor y muéstralo. ¿Te ha dejado? Prueba ahora a asignarle a `grupo` un objeto entero nuevo y lee el error que da el compilador.

> 💡 **Pistas**
> - ¿Por qué calcular las plazas libres en vez de guardarlas? Si las guardas, cuando cambien los matriculados tendrás que acordarte de actualizarlas también.
> - Para mostrar un número con un decimal: `numero.toFixed(1)`.
> - Para elegir entre dos mensajes en una línea: `condicion ? "mensaje si sí" : "mensaje si no"`.

**Salida esperada**

```
IES Los Alcores — Desarrollo de Aplicaciones Multiplataforma
Matriculados: 26 de 30
Plazas libres: 4
Tras dos altas -> 28 matriculados, 2 libres
Ocupación: 93.3 %
Quedan plazas
Grupo DAM2, tutor: Ana Serrano
```

---

### Ejercicio 02 — Notas que pueden no existir
*Capítulos 02 y 03* · **Practicarás:** `null`, valores por defecto con `??` y `?.`, y datos de tipo `unknown`.

Una práctica sin entregar **no es un 0**: es que todavía no hay nota. TypeScript permite expresar esa diferencia.

**Pasos**

1. Declara dos notas de tipo `number | null`: la de la práctica vale `8.5` y la del examen vale `null` (aún no está corregido).
2. Muéstralas usando `??`, de forma que cuando falte la nota aparezca `"sin entregar"` o `"sin corregir"`.
3. Declara una nota que valga `0` y muéstrala dos veces: una con `|| "sin nota"` y otra con `?? "sin nota"`. Compara los resultados. ¿Cuál de los dos se equivoca, y por qué?
4. Crea un `type Alumno` con un `nombre` y un `contacto` **opcional**. El contacto tiene un `email` y un `telefono`, que también es opcional.
5. Crea dos alumnos: Ana, con contacto (`ana@ies.es`) pero sin teléfono, y Luis, sin contacto. Muestra el email de los dos y el teléfono de Ana. Cuando falte un dato, debe aparecer `"no consta"`.
6. Simula un dato que llega de un formulario: `const desdeFormulario: unknown = "7.25"`. Comprueba con `typeof` que es un texto, conviértelo a número y muéstralo con dos decimales.

> 💡 **Pistas**
> - En el paso 5, Luis no tiene `contacto`. Para leer su email sin que el programa se rompa, necesitas `?.`.
> - Para convertir un texto en número: `Number("7.25")`.
> - Si dudas en el paso 3, repasa la tabla de `??` frente a `||` del capítulo 03.

**Salida esperada**

```
Práctica: 8.5
Examen:   sin corregir
Con || -> sin nota
Con ?? -> 0
Email de Ana: ana@ies.es
Email de Luis: no consta
Tlf de Ana:   no consta
Convertida a número: 7.25
```

---

### Ejercicio 03 — Calificaciones y convocatorias
*Capítulo 04* · **Practicarás:** `if` / `else if`, `switch`, bucles, `continue` y `break`.

**Pasos**

1. Escribe una función `calificar(nota)` que devuelva la calificación en texto:
   - 9 o más: `"Sobresaliente"`
   - 7 o más: `"Notable"`
   - 6 o más: `"Bien"`
   - 5 o más: `"Suficiente"`
   - menos de 5: `"Insuficiente"`
   - menor que 0 o mayor que 10: `"Nota no válida"`
2. Aplica la función, con un bucle, a cada nota de `[10, 8.5, 6.2, 5, 3.4, 11]`.
3. Escribe `convocatoria(mes)` usando `switch`: el mes 3 es la 1ª evaluación parcial, el 6 la convocatoria ordinaria, el 9 la extraordinaria, y cualquier otro mes no tiene convocatoria. Pruébala con los meses 6, 9 y 12.
4. Recorre otra vez las notas y cuenta los aprobados y los suspensos. El `11` no es una nota válida: sáltalo con `continue` para que no cuente.
5. En la lista `[4, 7, 10, 6, 10]`, busca la **posición** del primer 10. En cuanto lo encuentres, deja de buscar con `break`.

> 💡 **Pistas**
> - El orden de los `if` importa. Si empiezas comprobando `nota >= 5`, un 10 entraría ahí y nunca llegaría a «Sobresaliente». Empieza por la nota más alta.
> - Las posiciones de un array empiezan en **0**, no en 1.

**Salida esperada**

```
10 -> Sobresaliente
8.5 -> Notable
6.2 -> Bien
5 -> Suficiente
3.4 -> Insuficiente
11 -> Nota no válida
Mes 6  -> Convocatoria ordinaria
Mes 9  -> Convocatoria extraordinaria
Mes 12 -> Sin convocatoria este mes
Aprobados: 4 | Suspensos: 1
Primer 10 en la posición 2
```

---

### Ejercicio 04 — La lista de clase
*Capítulo 05* · **Practicarás:** añadir, quitar y buscar elementos en un array, y transformarlo sin estropear el original.

La lista de clase empieza así: `["Ana", "Luis", "Marta"]`. Muestra el array después de cada paso para ver cómo va cambiando.

**Pasos**

1. Matricula a Pedro y a Lucía **al final** de la lista.
2. Carlos llega trasladado de otro centro: añádelo **al principio**.
3. Da de baja al **primero** de la lista y muestra quién se ha ido.
4. Comprueba si están matriculadas Marta y Sofía. El resultado será `true` o `false`.
5. Averigua en qué posición están Lucía y Sofía. Si alguien no está en la lista, el resultado es `-1`.
6. Obtén la lista en orden alfabético **sin cambiar la original**, que debe seguir en orden de matriculación. Muestra las dos para comprobarlo.
7. Obtén una lista nueva con los nombres en mayúsculas, para el acta.
8. Obtén solo los nombres de más de 4 letras.
9. Junta todos los nombres en un único texto, separados por comas.

> 💡 **Pistas**
> - Métodos que te harán falta: `push`, `unshift`, `shift`, `includes`, `indexOf`, `sort`, `map`, `filter` y `join`.
> - Cuidado en el paso 6: `sort()` **modifica** el array sobre el que lo llamas. Ordena una copia: `[...clase].sort()`.

**Salida esperada**

```
Inicial      -> [ 'Ana', 'Luis', 'Marta' ]
Tras 2 altas -> [ 'Ana', 'Luis', 'Marta', 'Pedro', 'Lucía' ]
Tras traslado-> [ 'Carlos', 'Ana', 'Luis', 'Marta', 'Pedro', 'Lucía' ]
Baja de Carlos -> [ 'Ana', 'Luis', 'Marta', 'Pedro', 'Lucía' ]
¿Está Marta?  -> true
¿Está Sofía?  -> false
Posición de Lucía -> 4
Posición de Sofía -> -1
Alfabético   -> [ 'Ana', 'Lucía', 'Luis', 'Marta', 'Pedro' ]
Original     -> [ 'Ana', 'Luis', 'Marta', 'Pedro', 'Lucía' ]
Para el acta -> [ 'ANA', 'LUIS', 'MARTA', 'PEDRO', 'LUCÍA' ]
Nombre > 4 letras -> [ 'Marta', 'Pedro', 'Lucía' ]
Listado: Ana, Luis, Marta, Pedro, Lucía
```

---

### Ejercicio 05 — Estadísticas de la evaluación
*Capítulo 05* · **Practicarás:** `map`, `filter`, `reduce` y ordenar números.

Estas son las notas de la evaluación: `[7, 4.5, 9.25, 6, 3, 8, 10, 5.5]`.

**Pasos**

1. Calcula la media del grupo (con dos decimales), la nota máxima y la mínima.
2. Cuenta los aprobados (5 o más) y los suspensos, y calcula el porcentaje de aprobados con un decimal.
3. Crea un array **nuevo** con todas las notas subidas medio punto, sin que ninguna pase de 10. Muestra también el original para comprobar que no ha cambiado.
4. Cuenta cuántas notas hay de cada tipo (sobresaliente: 9 o más; notable: 7 o más; suficiente: 5 o más; insuficiente: el resto) usando **un único** `reduce`. El acumulador es un objeto que empieza así:
   ```ts
   { sobresaliente: 0, notable: 0, suficiente: 0, insuficiente: 0 }
   ```
5. Obtén las tres mejores notas.

> 💡 **Pistas**
> - `Math.max(...notas)` recibe el array «desplegado» con los tres puntos.
> - `Math.min(nota + 0.5, 10)` sube la nota sin pasar de 10.
> - `sort()` ordena como si fueran textos, así que con números se equivoca. Para ordenar de mayor a menor usa `sort((a, b) => b - a)`, y hazlo sobre una copia.

**Salida esperada**

```
Media del grupo: 6.66
Máxima: 10 | Mínima: 3
Aprobados: 6 | Suspensos: 2
Porcentaje de aprobados: 75.0 %
Con +0.5 -> [
  7.5,   5, 9.75,
  6.5, 3.5,  8.5,
   10,   6
]
Original -> [
  7, 4.5, 9.25,   6,
  3,   8,   10, 5.5
]
Recuento -> { sobresaliente: 2, notable: 2, suficiente: 2, insuficiente: 2 }
Top 3 -> [ 10, 9.25, 8 ]
```

---

### Ejercicio 06 — Fichas con tuplas
*Capítulo 06* · **Practicarás:** tuplas, desestructuración y devolver varios valores desde una función.

Una tupla es un array con un número fijo de elementos en el que cada posición tiene su propio tipo. Aquí la usarás como ficha de un alumno: `[nombre, nota]`.

**Pasos**

1. Define `type Ficha = [nombre: string, nota: number]` y crea un array con las fichas de Ana (8.5), Luis (4), Marta (9.25) y Pedro (6).
2. Recorre las fichas y muestra el nombre, la nota y `APTO` o `NO APTO`. Desestructura cada ficha directamente en el parámetro: `([nombre, nota]) => ...`. Alinea los nombres rellenándolos hasta 6 caracteres.
3. Escribe una función `resumen(fichas)` que devuelva **en una tupla** la media, el número de aprobados y el de suspensos. Recoge el resultado en tres variables a la vez:
   ```ts
   const [media, aprobados, suspensos] = resumen(fichas);
   ```
4. Define otra tupla, `FichaConRecuperacion`, con un tercer elemento **opcional**: la nota de la recuperación. Para Luis (4, recuperación 6.5) y Ana (8.5, sin recuperación), muestra la nota ordinaria y la definitiva. La definitiva es la de la recuperación si existe y, si no, la ordinaria.
5. Intercambia los valores de dos variables (`"Ana"` y `"Luis"`) en una sola línea, sin usar una variable auxiliar.

> 💡 **Pistas**
> - `"Ana".padEnd(6)` rellena el texto con espacios hasta los 6 caracteres.
> - Si solo te interesa la nota de una ficha, puedes saltarte la primera posición dejando un hueco: `([, nota]) => ...`.
> - Para el paso 5: `[a, b] = [b, a]`.

**Salida esperada**

```
Ana    8.5 -> APTO
Luis   4 -> NO APTO
Marta  9.25 -> APTO
Pedro  6 -> APTO
Media 6.94 | Aprobados 3 | Suspensos 1
Luis: ordinaria 4, definitiva 6.5
Ana: ordinaria 8.5, definitiva 8.5
Intercambiados -> Luis, Ana
```

---

# 07. Funciones

> ▶️ `npm run play -- src/07-funciones/demo.ts`

## Funciones declaradas

Las clásicas, con la palabra reservada `function`. Se tipan los parámetros y el valor de retorno:

```ts
/**
 * Suma dos números.
 * @param a primer sumando
 * @param b segundo sumando
 * @returns la suma de ambos
 */
function sumar(a: number, b: number): number {
  return a + b;
}
```

**Tienen hoisting**: puedes llamarlas antes de escribirlas en el fichero.

El bloque de comentario `/** ... */` es **JSDoc**. VS Code lo muestra al pasar el ratón por encima de la función, así que merece la pena escribirlo en las funciones públicas.

## Funciones anónimas

No tienen nombre: se asignan a una constante. Fíjate en que después de `function` no hay identificador.

```ts
const restar = function (a: number, b: number): number {
  return a - b;
};
```

**No tienen hoisting**: hay que declararlas antes de usarlas.

## Arrow functions

Sintaxis corta y moderna. Es la que usarás constantemente en Angular:

```ts
const multiplicar = (a: number, b: number): number => a * b;
```

Si el cuerpo tiene una sola expresión, se puede omitir `return` y las llaves. Con varias líneas hacen falta ambas:

```ts
const dividir = (a: number, b: number): number => {
  if (b === 0) throw new Error("No se puede dividir entre 0");
  return a / b;
};
```

> **Trampa**: si quieres devolver un objeto literal en la versión corta, hay que
> envolverlo en paréntesis, porque si no las llaves se interpretan como el cuerpo:
> `const punto = (x: number, y: number) => ({ x, y });`

## Parámetros opcionales

Se marcan con `?` y **deben ir siempre al final**. Su tipo pasa a ser `string | undefined`, así que hay que contemplar el caso:

```ts
function saludar(nombre: string, apellido?: string): void {
  // apellido es `string | undefined`, hay que contemplar el caso
  if (apellido !== undefined) {
    console.log(`Hola ${nombre} ${apellido}`);
  } else {
    console.log(`Hola ${nombre}`);
  }

  // Lo mismo con el operador ternario
  console.log(apellido !== undefined ? `Hola ${nombre} ${apellido}` : `Hola ${nombre}`);

  // Y lo mismo con nullish coalescing (la forma más corta)
  console.log(`Hola ${nombre} ${apellido ?? ""}`.trim());
}
```

Las tres formas son equivalentes. La tercera, con `??`, es la que verás en código real.

## Parámetros por defecto

Si el parámetro tiene valor por defecto, ya no hace falta marcarlo como opcional:

```ts
function aplicarIva(precio: number, iva: number = 21): number {
  return precio * (1 + iva / 100);
}
console.log("aplicarIva(100)     ->", aplicarIva(100));
console.log("aplicarIva(100, 10) ->", aplicarIva(100, 10));
```

## Parámetros de varios tipos

Cuando un parámetro admite varios tipos se usa una **unión**. Antes de usar métodos propios de un tipo hay que hacer *narrowing*:

```ts
function mostrarId(id: number | string): void {
  // Narrowing: hay que distinguir el tipo antes de usar métodos específicos
  if (typeof id === "string") {
    console.log(`ID texto: ${id.toUpperCase()}`);
  } else {
    console.log(`ID numérico: ${id.toFixed(0)}`);
  }
}
```

## Número variable de parámetros (rest)

Con `...` se recogen todos los argumentos sueltos en un array:

```ts
function sumarTodos(...numeros: number[]): number {
  return numeros.reduce((acc, n) => acc + n, 0);
}
console.log("sumarTodos(1,2,3,4) ->", sumarTodos(1, 2, 3, 4));
```

Es el mismo símbolo que el spread, pero al revés: **spread reparte, rest recoge**.

## Funciones callback

Una **callback** es una función que se pasa como parámetro a otra para que la ejecute cuando corresponda. Son la base de los eventos, los temporizadores y los métodos de array.

```ts
const arrayNombres = ["Jose", "Juan", "Pedro", "Manuel"];

const printElemento = (elemento: string): void => console.log(`callback -> ${elemento}`);
arrayNombres.forEach(printElemento);
```

El tipo de una callback se escribe con la sintaxis de flecha, indicando qué recibe y qué devuelve:

```ts
function procesar(lista: string[], accion: (item: string, indice: number) => void): void {
  lista.forEach(accion);
}
procesar(arrayNombres, (item, indice) => console.log(`${indice}: ${item}`));
```

Aquí `accion: (item: string, indice: number) => void` significa: *"una función que recibe un texto y un número, y no devuelve nada"*. Al llamar a `procesar`, los tipos de `item` e `indice` ya se infieren: no hace falta repetirlos.

## `this` en arrow functions

Esta es la diferencia de fondo entre `function` y `=>`, y la razón por la que en Angular casi todas las callbacks son arrow:

```ts
class Contador {
  private valor = 0;

  incrementarMal() {
    // `function` tiene su propio `this` -> no apunta a la instancia
    [1, 2, 3].forEach(function () {
      // this.valor++;  // Error en tiempo de compilación / undefined en ejecución
    });
  }

  incrementarBien(): number {
    [1, 2, 3].forEach(() => {
      this.valor++; // arrow: `this` sigue siendo la instancia
    });
    return this.valor;
  }
}
```

Una función declarada con `function` crea **su propio `this`**, que dentro de una callback no apunta al objeto que esperas. Una arrow function **no tiene `this` propio**: hereda el del ámbito donde se escribió. Por eso dentro de un componente de Angular siempre funciona.

## Resumen

| | `function` con nombre | `const f = function` | Arrow `=>` |
|---|---|---|---|
| Hoisting | Sí | No | No |
| `this` propio | Sí | Sí | **No** (hereda) |
| Sintaxis corta | No | No | Sí |
| Uso típico | Funciones de utilidad | Poco habitual | Callbacks, Angular |

---

# 08. Objetos y `type`

> ▶️ `npm run play -- src/08-objetos-types/demo.ts`

## Objeto literal

La forma más simple de crear un objeto: una lista de `clave: valor` entre llaves. TypeScript infiere su forma a partir del valor.

```ts
const alumno = {
  nombre: "Ana",
  edad: 20,
  matriculado: true,
};
console.log(alumno.nombre, alumno.edad);
// alumno.curso = "DAM";   // Error: Property 'curso' does not exist.
```

**Ventajas**: rápidos de escribir y con una sintaxis casi idéntica a JSON.
**Desventaja**: la estructura no se puede reutilizar. Si necesitas diez alumnos, repites la forma diez veces y nada garantiza que sean iguales.

## `type`: dar nombre a una forma

Un `type` es un alias: pone nombre a una estructura para poder reutilizarla.

```ts
type Persona = {
  nombre: string;
  edad: number;
};

const p1: Persona = { nombre: "Luis", edad: 35 };
```

Ahora el compilador exige que todo objeto de tipo `Persona` tenga exactamente esas propiedades: ni le falta ninguna ni sobra otra.

## Propiedades opcionales `?`

```ts
type Contacto = {
  nombre: string;
  email: string;
  telefono?: string; // string | undefined
};

const c1: Contacto = { nombre: "Ana", email: "ana@mail.com" };
console.log("sin teléfono ->", c1.telefono ?? "no facilitado");
```

Muy habitual en datos que llegan de una API, donde no todos los campos vienen siempre.

## Propiedades `readonly`

```ts
type Configuracion = {
  readonly apiUrl: string;
  timeout: number;
};

const config: Configuracion = { apiUrl: "https://api.ejemplo.com", timeout: 3000 };
config.timeout = 5000; // permitido
// config.apiUrl = "otra";   // Error: Cannot assign to 'apiUrl' because it is a read-only property.
```

`readonly` solo actúa en tiempo de compilación: en el JavaScript generado no queda ni rastro.

## Intersection types `&`

Combinan varios tipos en uno que tiene **todas** las propiedades de los combinados:

```ts
type DatosPersonales = { nombre: string; edad: number };
type DatosLaborales = { empresa: string; salario: number };

type Empleado = DatosPersonales & DatosLaborales; // tiene TODAS las propiedades

const empleado: Empleado = {
  nombre: "Marta",
  edad: 30,
  empresa: "Acme",
  salario: 32000,
};
```

Regla mnemotécnica: `&` significa **"y"**, así que suma propiedades.

## Union types `|`

Permiten que un valor sea de uno **u** otro tipo. La variante más útil es la **unión de literales**, que restringe una variable a un conjunto cerrado de valores:

```ts
type Estado = "pendiente" | "enviado" | "entregado"; // union de literales

let pedido: Estado = "pendiente";
pedido = "entregado";
// pedido = "cancelado";   // Error: Type '"cancelado"' is not assignable to type 'Estado'.
```

Esto es mucho mejor que usar `string`: el editor autocompleta los tres valores posibles y es imposible escribir uno mal.

Cuando una variable es una unión, hay que hacer narrowing antes de usar métodos específicos:

```ts
function describir(valor: string | number): string {
  // Narrowing obligatorio antes de usar métodos específicos
  return typeof valor === "string" ? valor.toUpperCase() : valor.toFixed(2);
}
```

## Template literal types

Funcionan como los template literals, pero **a nivel de tipos**: generan tipos de texto que siguen un patrón.

```ts
type Color = "rojo" | "verde";
type Tamano = "s" | "m";
type Variante = `${Color}-${Tamano}`; // "rojo-s" | "rojo-m" | "verde-s" | "verde-m"

const variante: Variante = "verde-m";
```

Combinando dos uniones se generan automáticamente las cuatro combinaciones válidas. También sirve para restringir formatos:

```ts
type Ruta = `/${string}`;
const ruta: Ruta = "/usuarios/1";
```

Es muy útil para rutas, nombres de eventos o claves de permisos: garantiza que solo se usen las combinaciones previstas.

## Aserciones de tipo

Le dicen al compilador *"confía en mí, sé qué hay aquí"*:

```ts
const dato: unknown = "texto en unknown";
const comoTexto = dato as string;
console.log("assertion ->", comoTexto.length);
```

> ⚠️ **Una aserción no convierte nada**, solo silencia al compilador. Si te equivocas,
> el error aparecerá en tiempo de ejecución:
> ```ts
> // const roto = "hola" as unknown as number;
> // console.log(roto.toFixed(2));   // Compila, pero explota en ejecución.
> ```

## Type guards personalizados

Una aserción `as` obliga al compilador a callarse, pero **no comprueba nada**. Un *type guard* sí comprueba, y además le enseña a TypeScript lo que ha averiguado.

La clave está en el tipo de retorno: en lugar de `boolean`, se escribe `dato is Alumno`.

```ts
type Alumno = { nombre: string; curso: string };

function esAlumno(dato: unknown): dato is Alumno {
  return (
    typeof dato === "object" &&
    dato !== null &&
    "nombre" in dato &&
    "curso" in dato &&
    typeof dato.nombre === "string" &&
    typeof dato.curso === "string"
  );
}
```

Cada línea del `return` va estrechando el tipo para la siguiente: tras `typeof dato === "object"` y `dato !== null`, TypeScript ya permite usar `in`; y tras `"nombre" in dato`, permite leer `dato.nombre`. Por eso no hace falta ninguna aserción `as` dentro del propio guard.

A partir de ahí, dentro del `if` TypeScript trata el valor como un `Alumno`: autocompleta sus propiedades y detecta errores.

```ts
// Simula algo que llega de fuera (una API, un JSON, un formulario)
const deLaApi: unknown = { nombre: "Ana", curso: "DAM" };
const basura: unknown = { titulo: "no soy un alumno" };

// Dentro del if, TypeScript ya trata `deLaApi` como Alumno: autocompleta y valida
if (esAlumno(deLaApi)) {
  console.log(`type guard -> ${deLaApi.nombre} estudia ${deLaApi.curso}`);
}

console.log("¿basura es Alumno? ->", esAlumno(basura)); // false
```

Esta es la forma correcta de tratar datos que vienen de fuera: una API, un `JSON.parse` o un formulario. Con `as Alumno` le prometes al compilador algo que no has verificado; con `esAlumno()` lo compruebas de verdad.

## Narrowing con `in` y con `instanceof`

Además de `typeof`, hay otras dos formas de estrechar un tipo.

`in` comprueba si una propiedad existe:

```ts
type Perro = { ladrar: () => void };
type Gato = { maullar: () => void };

function hacerSonido(animal: Perro | Gato): void {
  // `in` comprueba si la propiedad existe y estrecha el tipo
  if ("ladrar" in animal) {
    animal.ladrar();
  } else {
    animal.maullar();
  }
}
```

`instanceof` distingue entre clases:

```ts
// `instanceof` estrecha entre clases
function formatear(valor: Date | string): string {
  return valor instanceof Date ? valor.toISOString().slice(0, 10) : valor;
}
```

| Técnica | Sirve para |
|---|---|
| `typeof x === "string"` | Tipos primitivos |
| `"prop" in objeto` | Distinguir objetos por sus propiedades |
| `x instanceof Clase` | Distinguir clases (y el `catch` de errores) |
| `function f(x): x is T` | Cualquier comprobación propia, por compleja que sea |

## Objetos anidados y desestructuración

```ts
type Pedido = {
  id: number;
  cliente: { nombre: string; ciudad: string };
  lineas: { producto: string; unidades: number }[];
};
```

La desestructuración funciona también en profundidad:

```ts
const {
  cliente: { nombre: nombreCliente },
  lineas,
} = pedidoCompleto;

console.log(`Pedido de ${nombreCliente} con ${lineas.length} líneas`);
console.log("Unidades totales ->", lineas.reduce((acc, l) => acc + l.unidades, 0));
```

---

# 09. Enumerados

> ▶️ `npm run play -- src/09-enumerados/demo.ts`

Un `enum` define un conjunto de constantes con nombre bajo un mismo identificador.

## Enum numérico

Si no asignas valores, empiezan en 0 y van sumando 1:

```ts
enum Dia {
  Lunes, // 0
  Martes, // 1
  Miercoles, // 2
  Jueves, // 3
  Viernes, // 4
}

console.log("Dia.Miercoles ->", Dia.Miercoles); // 2
console.log("Dia[2]        ->", Dia[2]); // "Miercoles"  (mapeo inverso)
```

El **mapeo inverso** es una característica exclusiva de los enum numéricos: puedes obtener el nombre a partir del número.

## Numeración personalizada

```ts
enum CodigoHttp {
  Ok = 200,
  Creado = 201,
  NoAutorizado = 401,
  NoEncontrado = 404,
  ErrorServidor = 500,
}
```

Si asignas solo el primero, los siguientes continúan la cuenta:

```ts
enum Nivel {
  Bajo = 1,
  Medio, // 2
  Alto, // 3
}
```

## Enum de cadenas

Más legibles al depurar, porque el valor se ve tal cual en los logs y en la API:

```ts
enum EstadoPedido {
  Pendiente = "PENDIENTE",
  Enviado = "ENVIADO",
  Entregado = "ENTREGADO",
}

const estado: EstadoPedido = EstadoPedido.Enviado;
console.log("EstadoPedido ->", estado); // "ENVIADO"
```

Los enum de cadenas **no tienen mapeo inverso**: `EstadoPedido.Enviado` da `"ENVIADO"`, pero no existe el camino contrario.

## Uso en `switch` y recorrido

```ts
function mensajeEstado(e: EstadoPedido): string {
  switch (e) {
    case EstadoPedido.Pendiente:
      return "Tu pedido se está preparando";
    case EstadoPedido.Enviado:
      return "Tu pedido va de camino";
    case EstadoPedido.Entregado:
      return "Pedido entregado";
  }
}

console.log("Valores ->", Object.values(EstadoPedido));
```

## `enum` frente a unión de literales

Esta es la decisión de diseño importante del capítulo.

```ts
type EstadoPedidoUnion = "PENDIENTE" | "ENVIADO" | "ENTREGADO";
```

| | `enum` | Unión de literales |
|---|---|---|
| ¿Genera código JS? | **Sí**, un objeto en tiempo de ejecución | No, desaparece al transpilar |
| Mapeo inverso | Sí (solo los numéricos) | No |
| Recorrer los valores | `Object.values(...)` | Hay que escribirlos a mano |
| Peso en el bundle | Añade bytes | Cero |
| Uso en Angular moderno | Poco frecuente | **Lo habitual** |

### El peligro de los enum numéricos

Supón que guardas el estado de un ticket como **número** en la base de datos:

```ts
enum EstadoTicket {
  Abierto, // 0
  EnProgreso, // 1
  Cerrado, // 2
}

const estadoDesdeDB = 1; // este 1 viene de la base de datos

// Usamos el mapeo inverso para saber qué significa
console.log("EstadoTicket[1] ->", EstadoTicket[estadoDesdeDB]); // "EnProgreso" ✅
```

Meses después, alguien añade un estado nuevo **al principio**. Parece inofensivo: solo se ha insertado una línea.

```ts
enum EstadoTicketV2 {
  Urgente, // 0   <-- nuevo
  Pendiente, // 1   <-- antes era "Abierto"
  EnProgreso, // 2   <-- antes era 1
  Cerrado, // 3
}

// El código anterior sigue compilando SIN UN SOLO ERROR, pero ya está roto:
console.log("EstadoTicketV2[1] ->", EstadoTicketV2[estadoDesdeDB]); // "Pendiente" ❌
```

Ejecuta la demo y verás las dos líneas seguidas: el mismo `1` significa dos cosas distintas. **Todos los tickets que estaban "EnProgreso" pasan a interpretarse como "Pendiente"** y nadie se entera, porque el compilador no tiene forma de detectarlo.

Con una unión de literales el problema no existe, porque el valor y el nombre son la misma cosa:

```ts
// Con una unión de literales el problema no existe: valor y nombre son lo mismo.
type EstadoTicketType = "urgente" | "pendiente" | "en-progreso" | "cerrado";

const estadoSeguro: EstadoTicketType = "en-progreso"; // el valor es descriptivo

if (estadoSeguro === "en-progreso") {
  console.log("union de literales -> sigue funcionando tras añadir estados ✅");
}
```

Añadir estados nuevos no afecta a los existentes, y si renombras uno, TypeScript te obliga a actualizar todos los sitios donde se usaba.

## Objeto `as const`: lo mejor de los dos

Si necesitas recorrer los valores pero no quieres el peso ni los riesgos del `enum`:

```ts
const Prioridad = {
  Baja: "BAJA",
  Media: "MEDIA",
  Alta: "ALTA",
} as const;

type Prioridad = (typeof Prioridad)[keyof typeof Prioridad]; // "BAJA" | "MEDIA" | "ALTA"

const p: Prioridad = Prioridad.Alta;
console.log("as const ->", p, "| valores:", Object.values(Prioridad));
```

`as const` congela el objeto y hace que TypeScript infiera los tipos literales exactos en lugar de `string`. Obtienes autocompletado, recorrido con `Object.values()` y tipado estricto.

> **Cuándo usar cada uno**
> - **Unión de literales**: por defecto. Es lo más común en proyectos Angular.
> - **`as const`**: cuando además necesites recorrer los valores.
> - **`enum`**: solo si necesitas el mapeo inverso o lo exige una librería.

---

# 10. Interfaces

> ▶️ `npm run play -- src/10-interfaces/demo.ts`

Una `interface` describe la **forma** que debe tener un objeto: qué propiedades y qué métodos. Es el contrato que usan los modelos de datos en Angular.

```ts
interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

const usuario: Usuario = { id: 1, nombre: "Ana", email: "ana@mail.com" };
```

Igual que los `type`, las interfaces **desaparecen al transpilar**. No existen en tiempo de ejecución, así que no puedes hacer `objeto instanceof MiInterfaz`.

## Opcionales y `readonly`

```ts
interface Producto {
  readonly id: number; // no se puede reasignar tras crear el objeto
  nombre: string;
  descripcion?: string; // puede no venir
  precio: number;
}

const producto: Producto = { id: 10, nombre: "Teclado", precio: 49.9 };
producto.precio = 39.9;
// producto.id = 11;   // Error: Cannot assign to 'id' because it is a read-only property.
```

## Extender interfaces

Una interfaz puede heredar de otra con `extends`, e incluso de varias a la vez:

```ts
interface Persona {
  nombre: string;
  edad: number;
}

interface Empleado extends Persona {
  empresa: string;
  salario: number;
}

// Se puede extender de varias a la vez
interface Contratable {
  fechaAlta: Date;
}

interface EmpleadoCompleto extends Empleado, Contratable {}
```

`EmpleadoCompleto` exige las cinco propiedades: las dos de `Persona`, las dos de `Empleado` y la de `Contratable`.

## Declaration merging

Dos interfaces con el **mismo nombre** se fusionan automáticamente. Es una capacidad exclusiva de las interfaces:

```ts
interface Ventana {
  titulo: string;
}
interface Ventana {
  ancho: number;
}
// Ventana ahora exige titulo Y ancho
const v: Ventana = { titulo: "Panel", ancho: 800 };
```

Sirve para ampliar tipos que vienen de una librería sin tocar su código. Con `type` esto es imposible: daría error de identificador duplicado.

## Propiedades de tipo función

Hay dos sintaxis equivalentes para describir un método:

```ts
interface Calculadora {
  // Dos sintaxis equivalentes:
  sumar(a: number, b: number): number; // sintaxis de método
  restar: (a: number, b: number) => number; // propiedad con tipo función
}

const calc: Calculadora = {
  sumar: (a, b) => a + b, // los tipos se infieren de la interfaz
  restar: (a, b) => a - b,
};
```

Fíjate en que al implementarla **no hace falta repetir los tipos**: TypeScript los deduce del contrato.

## Call signature

Una interfaz puede describir **una función que además tiene propiedades**:

```ts
interface Saludo {
  (nombre: string): string; // firma de llamada
  idioma: string; // ...y además tiene propiedades
}

const saludar = ((nombre: string) => `Hola ${nombre}`) as Saludo;
saludar.idioma = "es";
console.log("Call signature ->", saludar("Jose"), `(${saludar.idioma})`);
```

La línea sin nombre `(nombre: string): string` es la firma de llamada: dice cómo se invoca el propio objeto.

## Index signature

Para objetos con claves dinámicas que no conoces de antemano:

```ts
interface Diccionario {
  [clave: string]: string;
}

const traducciones: Diccionario = { hola: "hello", adios: "goodbye" };
// Con "noPropertyAccessFromIndexSignature" (activo aquí y en Angular)
// hay que acceder con corchetes, no con punto:
console.log("Index signature ->", traducciones["hola"]);
// console.log(traducciones.hola);   // Error: Property 'hola' comes from an index signature.
```

Esa regla obliga a distinguir visualmente entre una propiedad que **existe seguro** (acceso con punto) y una que puede no existir (acceso con corchetes).

## `type` frente a `interface`

```ts
// Esto SOLO se puede hacer con type:
type Id = number | string;
type Punto = [number, number];
```

| | `interface` | `type` |
|---|---|---|
| Describir objetos | Sí | Sí |
| Uniones `\|` e intersecciones `&` | No | **Sí** |
| Primitivos y tuplas | No | **Sí** |
| `extends` | Sí | Con `&` |
| Declaration merging | **Sí** | No |
| Implementar en una clase | Sí | Sí |

> **Regla práctica**: `interface` para la forma de un objeto (modelos, DTOs de la API),
> `type` para todo lo demás (uniones, alias, tuplas). En Angular verás sobre todo
> `interface` en los modelos y `type` en los estados y variantes.

---

# 11. Clases y POO

> ▶️ `npm run play -- src/11-clases/demo.ts`

Las clases definen las propiedades y el comportamiento de los objetos. En Angular **todo es una clase**: cada componente, servicio, pipe y guard.

A diferencia de las interfaces, las clases **sí generan código JavaScript**: existen en tiempo de ejecución.

## Declaración e instanciación

```ts
class Coche {
  marca: string;
  modelo: string;

  constructor(marca: string, modelo: string) {
    this.marca = marca;
    this.modelo = modelo;
  }

  describir(): string {
    return `${this.marca} ${this.modelo}`;
  }
}

const coche = new Coche("Seat", "Ibiza");
```

El **constructor** es un método especial que se ejecuta al hacer `new` y sirve para inicializar las propiedades.

> ⚠️ Con `strict` activado, **toda propiedad debe tener un valor**: o se inicializa
> en la declaración (`puntuacion: number = 0`) o se asigna en el constructor. Si no,
> el compilador da el error *"Property 'x' has no initializer"*.

## Atajo del constructor

TypeScript permite declarar y asignar la propiedad en un solo paso, poniendo un modificador de acceso delante del parámetro:

```ts
class Moto {
  constructor(
    public marca: string,
    public cilindrada: number,
    private readonly bastidor: string = "VF1-000",
  ) {}

  ficha(): string {
    return `${this.marca} ${this.cilindrada}cc (bastidor ${this.bastidor})`;
  }
}
```

Esto se llama *parameter properties* y es **exactamente** lo que verás en los servicios de Angular:

```ts
constructor(private http: HttpClient) {}
```

## Modificadores de acceso

| Modificador | Accesible desde |
|---|---|
| `public` (por defecto) | Cualquier sitio |
| `protected` | La clase y sus hijas |
| `private` | Solo dentro de la clase |

```ts
class CuentaBancaria {
  public titular: string; // accesible desde cualquier sitio (por defecto)
  protected saldo: number; // accesible en la clase y en sus hijas
  private pin: string; // accesible SOLO dentro de esta clase

  ingresar(cantidad: number): void {
    if (cantidad <= 0) throw new Error("La cantidad debe ser positiva");
    this.saldo += cantidad;
  }

  consultar(pin: string): number {
    return this.validar(pin) ? this.saldo : -1;
  }

  private validar(pin: string): boolean {
    return this.pin === pin;
  }
}
```

Desde fuera de la clase:

```ts
// cuenta.saldo;        // Error: 'saldo' is protected.
// cuenta.validar("x"); // Error: 'validar' is private.
```

Esto es **encapsulación**: el saldo solo se puede tocar a través de `ingresar()`, que valida la cantidad. Nadie puede dejar la cuenta en un estado inválido.

> En Angular esto importa mucho: **solo las propiedades `public` son accesibles desde
> la plantilla HTML del componente**. Si marcas una propiedad como `private` y la usas
> en el template, el compilador de Angular dará error.

## Getters y setters

Permiten que una propiedad calculada o validada se use como si fuera un campo normal:

```ts
class Temperatura {
  private _celsius = 0;

  get celsius(): number {
    return this._celsius;
  }

  set celsius(valor: number) {
    if (valor < -273.15) throw new Error("Por debajo del cero absoluto");
    this._celsius = valor;
  }

  get fahrenheit(): number {
    return this._celsius * 1.8 + 32;
  }
}

const t = new Temperatura();
t.celsius = 25; // llama al setter, sin paréntesis
console.log(`${t.celsius}ºC son ${t.fahrenheit}ºF`); // llama a los getters
```

Fíjate en que se usan **sin paréntesis**: `t.celsius = 25` ejecuta el setter y valida el valor. `fahrenheit` es un getter de solo lectura que calcula el valor al vuelo.

## Miembros estáticos

Pertenecen a la clase, no a las instancias: se usan **sin `new`**.

```ts
class Matematicas {
  static readonly PI = 3.1416;

  static areaCirculo(radio: number): number {
    return Matematicas.PI * radio ** 2;
  }
}
console.log("static ->", Matematicas.areaCirculo(2)); // sin `new`
```

## Herencia

```ts
class Vehiculo {
  constructor(public marca: string) {}

  arrancar(): string {
    return `${this.marca} arrancando`;
  }
}

class Electrico extends Vehiculo {
  constructor(
    marca: string,
    public autonomia: number,
  ) {
    super(marca); // obligatorio antes de usar `this`
  }

  // "noImplicitOverride" (activo aquí y en Angular) exige la palabra `override`
  override arrancar(): string {
    return `${super.arrancar()} en silencio (${this.autonomia} km)`;
  }
}
```

Tres cosas a retener:

- `super(marca)` llama al constructor del padre y **debe ir antes** de usar `this`.
- `super.arrancar()` llama al método del padre desde el hijo.
- **`override` es obligatorio** en este proyecto y en Angular. Sirve para que el compilador avise si renombras el método en el padre y este deja de sobrescribir nada.

## Implementar interfaces

Una clase puede comprometerse a cumplir uno o varios contratos con `implements`:

```ts
interface Imprimible {
  imprimir(): void;
}

interface Serializable {
  aJson(): string;
}

class Factura implements Imprimible, Serializable {
  constructor(
    private numero: string,
    private importe: number,
  ) {}

  imprimir(): void {
    console.log(`Factura ${this.numero}: ${this.importe} €`);
  }

  aJson(): string {
    return JSON.stringify({ numero: this.numero, importe: this.importe });
  }
}
```

Si olvidas implementar un método, el compilador lo detecta. Es lo que hace Angular con `OnInit`, `OnDestroy` o `CanActivate`.

> **`extends` frente a `implements`**: se **extiende** una clase (heredas su código)
> y se **implementan** interfaces (solo te comprometes a tener esos métodos).
> Solo se puede extender una clase, pero implementar tantas interfaces como quieras.

## Clases abstractas

Una clase abstracta es una plantilla que **no se puede instanciar**. Define parte del comportamiento y obliga a las hijas a completar el resto.

```ts
abstract class Figura {
  constructor(public nombre: string) {}

  abstract area(): number; // sin cuerpo: la hija está OBLIGADA a implementarlo

  describir(): string {
    // método concreto: se hereda tal cual
    return `${this.nombre} tiene un área de ${this.area().toFixed(2)}`;
  }
}
```

Fíjate en el detalle interesante: `describir()` llama a `this.area()`, un método que **todavía no existe**. La clase abstracta define el esqueleto y cada hija rellena el hueco:

```ts
class Circulo extends Figura {
  constructor(private radio: number) {
    super("Círculo");
  }
  override area(): number {
    return Math.PI * this.radio ** 2;
  }
}
```

Es el punto intermedio entre una interfaz (solo el contrato) y una clase normal (todo implementado).

## Polimorfismo

*Poli* = muchas, *morfos* = formas. Consiste en tratar objetos de clases distintas a través de un mismo tipo base:

```ts
const figuras: Figura[] = [new Circulo(3), new Rectangulo(4, 5)];
figuras.forEach((f) => console.log("polimorfismo ->", f.describir()));
```

El array es de tipo `Figura[]`, pero cada elemento ejecuta **su propia** versión de `area()`. El código que recorre el array no necesita saber qué figura es cada una: solo que todas saben calcular su área.

Este es el mecanismo que permite a Angular tratar de forma uniforme componentes distintos.

---

# Ejercicios · Bloque 2 — Modelar el dominio

> 📁 Soluciones comentadas: [`src/ejercicios/`](src/ejercicios/README.md)

Segundo bloque, capítulos 07 a 11. Hasta ahora has trabajado con datos sueltos: números, textos y listas. En este bloque empiezas a **crear tus propios tipos** para describir cómo es un alumno, un expediente o una matrícula, que es justo lo que harás en cualquier aplicación Angular.

Sigue trabajando igual que en el bloque anterior: un fichero por ejercicio dentro de `src/`, terminado en `export {};`.

---

### Ejercicio 07 — Funciones del cuaderno
*Capítulo 07* · **Practicarás:** parámetros por defecto, opcionales y *rest* (`...`), uniones de tipos y *arrow functions*.

**Pasos**

1. Escribe `notaFinal(practica, examen, pesoExamen)`, que calcule:
   ```ts
   practica * (1 - pesoExamen) + examen * pesoExamen
   ```
   El peso del examen debe valer `0.6` **por defecto**. Pruébala con una práctica de 8 y un examen de 5, primero sin indicar el peso y después con un peso de `0.4`.
2. Escribe `actaAlumno(nombre, nota, observaciones?)`. El tercer parámetro es **opcional**: si llega, se añade entre paréntesis y, si no, no aparece. Pruébala con Ana (8.5) y con Luis (4, `"debe recuperar"`).
3. En un comentario, explica con tus palabras la diferencia entre un parámetro opcional (`?`) y uno con valor por defecto (`= 0.6`).
4. Escribe `mediaDe(...notas)`, que acepte **cualquier cantidad** de notas y devuelva su media, o `0` si no recibe ninguna. Pruébala con `(7, 8, 9)`, con `(7, 8, 9, 4, 10)` y sin argumentos.
5. Escribe `buscarAlumno(identificador)`, que acepte un número **o** un texto. Con un número busca por expediente; con un texto busca por nombre, escrito en mayúsculas. Pruébala con `1024` y con `"ana"`.
6. Termina con una *arrow function* de una sola línea, `estaAprobado`, que diga si una nota aprueba. Pruébala con 5 y con 4.9.

> 💡 **Pistas**
> - El tipo de `identificador` en el paso 5 es una unión: `number | string`.
> - Antes de usar `toUpperCase()`, comprueba con `typeof` que el identificador es un texto. Si no, TypeScript no te dejará, porque podría ser un número.

**Salida esperada**

```
Peso por defecto -> 6.20
Examen al 40 %   -> 6.80
Ana: 8.5
Luis: 4 (debe recuperar)
Media de 3 notas -> 8.00
Media de 5 notas -> 7.60
Media sin notas  -> 0
Buscando por expediente nº 1024
Buscando por nombre "ANA"
¿5 aprueba? -> true | ¿4.9? -> false
```

---

### Ejercicio 08 — Criterios intercambiables
*Capítulo 07* · **Practicarás:** pasar funciones como parámetro (*callbacks*) y entender por qué se usan *arrow functions*.

En vez de escribir una función para los aprobados, otra para los excelentes y otra para los que deben recuperar, escribirás **una sola** función de filtrado y le pasarás el criterio como parámetro.

En este ejercicio la ficha es un **objeto**, no una tupla:

```ts
type Ficha = { nombre: string; nota: number };
```

El grupo lo forman Ana (8.5), Luis (4), Marta (9.25) y Pedro (6).

**Pasos**

1. Escribe `seleccionar(lista, criterio)`. El `criterio` es una función que recibe una ficha y devuelve `true` o `false`; su tipo se escribe así: `(f: Ficha) => boolean`.
2. Úsala para obtener los nombres de los aprobados (nota de 5 o más) y de los excelentes (9 o más).
3. Guarda un criterio en una constante, `necesitaRecuperar` (nota menor que 5), y pásaselo a `seleccionar`.
4. Escribe `conPosicion(lista, accion)`, donde la función `accion` recibe la ficha **y su posición**. Úsala para mostrar el listado numerado (1º, 2º…).
5. Crea una clase `Evaluador` con un contador privado `aprobados` y un método `contar(lista)` que lo vaya aumentando dentro de un `forEach`. Escribe la función del `forEach` como *arrow function* y comprueba que el contador funciona.

> 💡 **Pistas**
> - `filter` ya recibe un criterio con la forma que necesitas: puedes pasárselo tal cual.
> - Sobre el paso 5: cámbiala por una función normal, `function (f) { ... }`, y mira qué dice el compilador. Dentro de una `function`, `this` deja de ser el `Evaluador`; dentro de una *arrow function*, sigue siéndolo. Por eso en Angular las *callbacks* se escriben casi siempre con flecha.

**Salida esperada**

```
Aprobados  -> [ 'Ana', 'Marta', 'Pedro' ]
Excelentes -> [ 'Marta' ]
A recuperar -> [ 'Luis' ]
1º Ana (8.5)
2º Luis (4)
3º Marta (9.25)
4º Pedro (6)
Aprobados contados desde la clase -> 3
```

---

### Ejercicio 09 — Modelar el alumno con `type`
*Capítulo 08* · **Practicarás:** `type`, uniones de literales, propiedades opcionales y `readonly`, intersecciones y *template literal types*.

**Pasos**

1. Define dos tipos que solo admitan unos valores concretos:
   ```ts
   type Ciclo = "DAM" | "DAW" | "ASIR";
   type Turno = "mañana" | "tarde";
   ```
2. Define `type Alumno` con: `expediente` (un número que no se pueda cambiar: `readonly`), `nombre`, `ciclo` (de tipo `Ciclo`), `turno` (de tipo `Turno`) y `email`, que es opcional.
3. Crea dos alumnos: Ana Serrano (expediente 1001, DAM, tarde, `ana@ies.es`) y Luis Gil (1002, DAW, mañana), este **sin email**.
4. Añade después el email de Luis (`luis@ies.es`) y muestra los dos alumnos.
5. Intenta cambiar el expediente de Luis y ponerle a Ana el ciclo `"DAM2"`. Deja esas dos líneas **comentadas**, indicando el error que da el compilador.
6. Crea el tipo `AlumnoBecado` uniendo con `&` el tipo `Alumno` y un tipo con los datos de la beca (`importe` y `curso`). Crea a Marta Ruiz (1003, DAM, tarde) con una beca de 1200 € del curso 2024/25.
7. Escribe una función que reciba un ciclo y devuelva los nombres de los alumnos de ese ciclo. Pruébala con los tres ciclos.
8. Define `type CodigoGrupo` para que solo admita un ciclo seguido de un 1 o un 2 (`"DAM1"`, `"ASIR2"`…). Muestra la lista `["DAM1", "DAM2", "DAW1", "ASIR2"]` y comprueba que `"DAM3"` da error.

> 💡 **Pistas**
> - Un *template literal type* se escribe como una plantilla de texto, pero con tipos dentro de `${ }`. Por ejemplo, `` `${"A" | "B"}-${1 | 2}` `` solo admite `"A-1"`, `"A-2"`, `"B-1"` y `"B-2"`.
> - Para mostrar «sin email» cuando no haya email, usa `??`.

**Salida esperada**

```
Ana Serrano — DAM (tarde) — ana@ies.es
Luis Gil — DAW (mañana) — luis@ies.es
Marta Ruiz tiene beca de 1200 € (2024/25)
DAM  -> [ 'Ana Serrano', 'Marta Ruiz' ]
DAW  -> [ 'Luis Gil' ]
ASIR -> []
Códigos válidos -> [ 'DAM1', 'DAM2', 'DAW1', 'ASIR2' ]
```

---

### Ejercicio 10 — Validar lo que llega de fuera
*Capítulo 08* · **Practicarás:** comprobar datos de tipo `unknown` con *type guards* y distinguir tipos con `in`.

Los datos que llegan de una API no son de fiar: les pueden faltar campos o traerlos con el tipo equivocado. Por eso se reciben como `unknown` y hay que comprobarlos antes de usarlos.

Parte de estas tres respuestas simuladas, guardadas en un array de tipo `unknown[]`:

```ts
{ expediente: 1001, nombre: "Ana Serrano", ciclo: "DAM" }   // correcta
{ expediente: "1002", nombre: "Luis Gil", ciclo: "DAW" }    // el expediente es un texto
{ nombre: "Marta Ruiz", ciclo: "MECATRONICA" }              // sin expediente y con un ciclo que no existe
```

**Pasos**

1. Escribe `esCiclo(valor)`, que diga si un valor es `"DAM"`, `"DAW"` o `"ASIR"`. Su tipo de retorno debe ser `valor is Ciclo`.
2. Escribe `esAlumno(dato)`, con tipo de retorno `dato is Alumno`. Debe comprobar **de verdad** que el dato es un objeto, que no es `null`, que tiene las tres propiedades y que cada una es del tipo correcto. Para el ciclo, usa `esCiclo`.
3. Recorre las respuestas: guarda las válidas en un array y muestra las descartadas. Termina indicando cuántas se han importado.
4. Define dos tipos: `Matriculado` (nombre y expediente) y `Preinscrito` (nombre y fecha de solicitud). Escribe una función que acepte cualquiera de los dos y muestre un mensaje distinto según cuál sea.

> 💡 **Pistas**
> - Un *type guard* es una función que devuelve `true` o `false`, pero cuyo tipo de retorno es `dato is Alumno`. Cuando devuelve `true`, dentro del `if` TypeScript ya trata el dato como un `Alumno` y te deja usar sus propiedades.
> - No uses `dato as Alumno`: eso solo silencia al compilador, no comprueba nada.
> - Para distinguir los dos tipos del paso 4: `if ("expediente" in persona)`.
> - Para mostrar un objeto descartado como texto: `JSON.stringify(dato)`.

**Salida esperada**

```
✅ Válido: Ana Serrano (DAM)
❌ Descartado: {"expediente":"1002","nombre":"Luis Gil","ciclo":"DAW"}
❌ Descartado: {"nombre":"Marta Ruiz","ciclo":"MECATRONICA"}
Importados 1 de 3
Ana: matriculado, expediente 1001
Sofía: preinscrito el 2025-06-20
```

---

### Ejercicio 11 — Estados de la matrícula
*Capítulo 09* · **Practicarás:** `enum`, uniones de literales y objetos `as const`, y por qué conviene evitar los `enum` numéricos.

Una matrícula puede estar preinscrita, confirmada o anulada. Vas a representar esos tres estados de tres formas distintas para compararlas.

**Pasos**

1. **Con un `enum` de textos.** Crea `EstadoMatricula` con los valores `"PREINSCRITA"`, `"CONFIRMADA"` y `"ANULADA"`. Escribe una función con `switch` que devuelva un mensaje para cada estado (por ejemplo, `"Matrícula en vigor"` para la confirmada) y pruébala. Muestra también todos sus valores con `Object.values()`.
2. **Con una unión de literales.** Define `type Estado = "PREINSCRITA" | "CONFIRMADA" | "ANULADA"`, crea una variable de ese tipo y muéstrala.
3. **Con un objeto `as const`.** Crea un objeto `ESTADOS` con los tres valores, termínalo con `as const` y obtén de él un tipo. Muestra uno de sus valores y todos con `Object.values()`.
4. **El peligro del `enum` numérico.** Crea un `enum` con Preinscrita, Confirmada y Anulada **sin darles valor**: TypeScript los numera solo como 0, 1 y 2. Guarda el número `1`, como si viniera de una base de datos, y muestra a qué estado corresponde. Crea después una segunda versión del `enum` con un estado nuevo, `Borrador`, **al principio**, y comprueba a qué estado corresponde ahora ese mismo `1`. ¿Te avisa el compilador?
5. Con la lista `["CONFIRMADA", "PREINSCRITA", "CONFIRMADA", "ANULADA", "CONFIRMADA"]`, cuenta cuántas matrículas hay de cada estado. Guarda el recuento en un `Record<Estado, number>`.

> 💡 **Pistas**
> - En un `enum` numérico, `EstadoV1[1]` devuelve el **nombre** que corresponde al número 1.
> - Sacar el tipo del objeto `as const` es la parte más rara del ejercicio. Se hace así:
>   `type EstadoConst = (typeof ESTADOS)[keyof typeof ESTADOS];`

**Salida esperada**

```
enum -> CONFIRMADA: Matrícula en vigor
enum, todos los valores -> [ 'PREINSCRITA', 'CONFIRMADA', 'ANULADA' ]
unión -> PREINSCRITA
as const -> ANULADA
as const, todos los valores -> [ 'PREINSCRITA', 'CONFIRMADA', 'ANULADA' ]
V1: el 1 es Confirmada
V2: el mismo 1 ahora es Preinscrita ❌
Recuento -> { PREINSCRITA: 1, CONFIRMADA: 3, ANULADA: 1 }
```

---

### Ejercicio 12 — Contratos con interfaces
*Capítulo 10* · **Practicarás:** `interface`, herencia con `extends`, métodos en interfaces, *index signatures* y *declaration merging*.

**Pasos**

1. Define la interfaz `Persona` con `id` (que no se pueda cambiar: `readonly`), `nombre` y `email`, que es opcional.
2. Amplíala con `extends`: `Alumno` añade `expediente` y `ciclo`; `Docente` añade `departamento`. Después amplía `Docente` para crear `Tutor`, que añade `grupo`. Son tres niveles: `Persona` → `Docente` → `Tutor`.
3. Crea una alumna (Ana Serrano, expediente 1001, DAM) y un tutor (Carlos Mendoza, departamento de Informática, grupo DAM2), y muéstralos.
4. Define la interfaz `Calculadora` con un método `media(notas)` y una propiedad `aprobado` que sea una función. Crea un objeto que la cumpla **sin volver a escribir los tipos** de los parámetros: TypeScript los deduce de la interfaz. Prueba `media([7, 8, 9])` y `aprobado(4.5)`.
5. Define `NotasPorModulo` con un *index signature*, es decir, con claves de texto que no se conocen de antemano y valores numéricos. Guarda estas notas: Programación 8.5, Bases de Datos 7 y Entornos de Desarrollo 9. Muestra la de Programación y después recórrelas todas con `for...in`.
6. Declara **dos veces** una interfaz `Matricula`: una con `curso` y otra con `confirmada`. Comprueba que TypeScript las une en una sola y que un objeto de ese tipo necesita las dos propiedades.

> 💡 **Pistas**
> - En el paso 5, en este proyecto (y en Angular) hay que leer las notas con corchetes, `notas["Programación"]`, y no con punto. Se explica en [Sobre la configuración](#sobre-la-configuración).
> - En el paso 6 usa un nombre nuevo, como `Matricula`, y no `Alumno`: la fusión afecta a todo el fichero y rompería el objeto que ya creaste en el paso 3.

**Salida esperada**

```
Alumna: Ana Serrano (DAM), expediente 1001
Tutor:  Carlos Mendoza, Informática, grupo DAM2
Media -> 8.00
¿4.5 aprueba? -> false
Programación -> 8.5
  Programación: 8.5
  Bases de Datos: 7
  Entornos de Desarrollo: 9
Matrícula 2024/25 confirmada: true
```

---

### Ejercicio 13 — El expediente como clase
*Capítulo 11* · **Practicarás:** clases, `private` y `readonly`, el atajo del constructor, miembros `static` y *getters*.

El expediente de un alumno guarda sus notas. Nadie debería poder meter un 15 ni tocar las notas desde fuera de la clase.

**Pasos**

1. Crea la clase `Expediente` con un `numero` (público y `readonly`), un `nombre` (público) y un array de `notas` **privado**. Declara las tres propiedades directamente en los parámetros del constructor, con el atajo que viste en el capítulo 11.
2. Añade un contador `static` de expedientes creados y un método `static registrar(nombre)` que cree un expediente con número automático: 1001, 1002, 1003… Añade también un *getter* estático, `total`, para consultar cuántos se han creado.
3. Añade `anadirNota(nota)`, que será la **única** forma de añadir notas. Si la nota no está entre 0 y 10, debe lanzar un error: `throw new Error(...)`.
4. Añade tres *getters*:
   - `media`: la media de sus notas, o 0 si no tiene ninguna.
   - `calificacion`: Sobresaliente (9 o más), Notable (7 o más), Suficiente (5 o más) o Insuficiente.
   - `historial`: las notas, pero devolviendo una **copia** del array, no el original.
5. Registra a Ana Serrano con las notas 8, 9.5 y 7, y a Luis Gil con un 4. Muestra sus datos y cuántos expedientes se han creado.
6. Comprueba las dos protecciones:
   - Intenta añadirle un 15 a Ana y captura el error con `try/catch`.
   - Coge el `historial` de Ana, añádele un 10 y comprueba que el expediente real sigue teniendo 3 notas.

> 💡 **Pista:** los *getters* se usan sin paréntesis, como si fueran propiedades: `ana.media`, no `ana.media()`.

**Salida esperada**

```
Expediente 1001 — Ana Serrano
Notas: 8, 9.5, 7
Media: 8.17 (Notable)
Expediente 1002 — Luis Gil: Insuficiente
Expedientes creados: 2
Rechazado -> Nota fuera de rango: 15
Historial real tras tocar la copia: 3 notas
```

---

### Ejercicio 14 — Jerarquía del personal
*Capítulo 11* · **Practicarás:** clases abstractas, herencia, `override`, `super` y polimorfismo.

En el centro hay alumnos, docentes y tutores. Todos se presentan de la misma forma, pero cada uno calcula sus horas semanales a su manera.

**Pasos**

1. Crea la clase **abstracta** `MiembroComunidad` con `id` y `nombre`. Declara un *getter* abstracto `rol` y un método abstracto `horasSemanales()`: solo su cabecera, sin cuerpo. Añade un método normal, `presentarse()`, que devuelva `"Nombre (rol) — X h/semana"` usando los dos anteriores.
2. Crea la clase hija `Alumno`. Recibe también el número de módulos y hace 4 horas por módulo.
3. Crea la clase hija `Docente`. Recibe también el número de grupos y hace 18 horas más 2 por grupo.
4. Crea `Tutor` como hija de `Docente`. Recibe también el grupo que tutoriza. Su rol es `"Tutor de "` seguido del grupo, y hace las horas de un docente **más 3**. Calcula las del docente con `super.horasSemanales()`, sin repetir la fórmula.
5. Mete en un array de tipo `MiembroComunidad[]` a Ana Serrano (alumna, 5 módulos), Marta Ruiz (docente, 3 grupos) y Carlos Mendoza (tutor de DAM2, 3 grupos). Recórrelo llamando a `presentarse()`. Cada uno usará **su propia** versión de los métodos: eso es el polimorfismo.
6. Suma las horas de todos y cuenta cuántos son docentes con `instanceof`. Los tutores también cuentan, porque también son docentes.

> 💡 **Pistas**
> - En este proyecto, al reescribir un método del padre hay que poner `override` delante.
> - En el constructor de una clase hija hay que llamar a `super(...)` antes de usar `this`.

**Salida esperada**

```
Ana Serrano (Alumno) — 20 h/semana
Marta Ruiz (Docente) — 24 h/semana
Carlos Mendoza (Tutor de DAM2) — 27 h/semana
Total de horas de la comunidad: 71
Docentes (incluidos tutores): 2
```

---

# 12. Genéricos

> ▶️ `npm run play -- src/12-genericos/demo.ts`

Un genérico es un **parámetro de tipo**: la función, interfaz o clase no fija el tipo con el que trabaja, sino que lo **recibe** en el momento de usarla.

Es la pieza que hace posible escribir, en Angular, `this.http.get<Usuario[]>(...)` o `signal<number>(0)`.

## El problema que resuelven

Con `any` se pierde toda la información: el editor ya no sabe qué te devuelve la función.

```ts
// Con `any` pierdes el tipo de retorno: el editor ya no sabe qué te devuelve.
function primeroAny(lista: any[]): any {
  return lista[0];
}
const conAny = primeroAny(["a", "b"]); // tipo: any -> sin autocompletado, sin errores
```

Con un genérico, el tipo de entrada **viaja hasta la salida**:

```ts
// Con un genérico, el tipo de entrada viaja hasta la salida.
function primero<T>(lista: T[]): T {
  return lista[0];
}
const texto = primero(["a", "b"]); // T = string  -> texto es string
const numero = primero([1, 2, 3]); // T = number  -> numero es number
console.log("genérico ->", texto.toUpperCase(), numero.toFixed(2));
```

Fíjate en que **no hace falta escribir `primero<string>([...])`**: TypeScript infiere `T` a partir del argumento. Y como ahora conoce el tipo, `texto.toFixed(2)` daría error mientras que `texto.toUpperCase()` funciona.

La `T` entre ángulos es solo un nombre convencional. Se suelen usar `T` (Type), `K` (Key), `V` (Value) y `E` (Element).

## Varios parámetros de tipo

```ts
function emparejar<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}
console.log("emparejar ->", emparejar("edad", 30));
```

## Restricciones con `extends`

`extends` limita lo que puede ser `T`. Se lee como *"T puede ser lo que quieras, **siempre que** cumpla esto"*:

```ts
// "T puede ser lo que quieras, siempre que tenga la propiedad length"
function medir<T extends { length: number }>(item: T): number {
  return item.length;
}
console.log("medir string ->", medir("hola"));
console.log("medir array  ->", medir([1, 2, 3]));
// medir(42);   // Error: Argument of type 'number' is not assignable...
```

Funciona con `string` y con arrays porque ambos tienen `length`; con un número, no.

### `keyof`: restringir a las claves de un objeto

```ts
// `keyof`: K solo puede ser una clave real de T
function obtenerPropiedad<T, K extends keyof T>(objeto: T, clave: K): T[K] {
  return objeto[clave];
}

const alumno = { nombre: "Ana", edad: 20, matriculado: true };
console.log("propiedad ->", obtenerPropiedad(alumno, "nombre")); // tipo: string
console.log("propiedad ->", obtenerPropiedad(alumno, "edad")); // tipo: number
// obtenerPropiedad(alumno, "curso");   // Error: "curso" no es clave de alumno
```

Esto es lo que ningún `any` puede hacer: **el tipo del resultado cambia según la clave que pases**. Si pides `"nombre"` recibes un `string`; si pides `"edad"`, un `number`. Y una clave inexistente es un error de compilación.

## Valor por defecto del parámetro de tipo

```ts
type Resultado<T = string> = { ok: boolean; datos: T };

const r1: Resultado = { ok: true, datos: "todo bien" }; // T = string por defecto
const r2: Resultado<number[]> = { ok: true, datos: [1, 2, 3] };
```

## Interfaces genéricas

Este patrón es exactamente el de una respuesta paginada de una API REST:

```ts
interface RespuestaApi<T> {
  datos: T;
  pagina: number;
  total: number;
}

interface Usuario {
  id: number;
  nombre: string;
}

const respuesta: RespuestaApi<Usuario[]> = {
  datos: [
    { id: 1, nombre: "Ana" },
    { id: 2, nombre: "Luis" },
  ],
  pagina: 1,
  total: 2,
};
console.log(`RespuestaApi -> ${respuesta.total} usuarios, el primero es ${respuesta.datos[0].nombre}`);
```

Una sola interfaz sirve para todos los endpoints: `RespuestaApi<Usuario[]>`, `RespuestaApi<Producto>`, etc.

## Clases genéricas

Un almacén que sirve para cualquier tipo. Es la base de un servicio de datos en Angular:

```ts
class Almacen<T> {
  private elementos: T[] = [];

  anadir(elemento: T): void {
    this.elementos.push(elemento);
  }

  obtenerTodos(): T[] {
    return [...this.elementos];
  }

  buscar(predicado: (e: T) => boolean): T | undefined {
    return this.elementos.find(predicado);
  }
}

const almacenUsuarios = new Almacen<Usuario>();
almacenUsuarios.anadir({ id: 1, nombre: "Ana" });
console.log("buscar  ->", almacenUsuarios.buscar((u) => u.id === 2));
```

Al escribir `new Almacen<Usuario>()`, la `T` se fija a `Usuario` en toda la clase: `anadir` solo acepta usuarios y `obtenerTodos` devuelve `Usuario[]`.

Combinando genéricos con restricciones se obtiene un repositorio reutilizable. Usa un `Map`, que es la estructura de JavaScript para pares clave-valor: se crea con `new Map<TipoClave, TipoValor>()` y se maneja con `.set(clave, valor)`, `.get(clave)` y `.has(clave)`. A diferencia de un objeto normal, admite claves de cualquier tipo y conserva el orden de inserción.

```ts
// Restricción: solo tipos que tengan `id`
class Repositorio<T extends { id: number }> {
  private items = new Map<number, T>();

  guardar(item: T): void {
    this.items.set(item.id, item);
  }

  porId(id: number): T | undefined {
    return this.items.get(id);
  }
}
```

Fíjate en dos cosas:

- La restricción `T extends { id: number }` es lo que permite escribir `item.id` dentro de `guardar`. Sin ella, el compilador no sabría que ese campo existe.
- `porId` devuelve `T | undefined`, porque `Map.get()` puede no encontrar nada. El tipo te obliga a contemplar ese caso en quien lo llame.

## Cómo lo verás en Angular 17

```ts
// Petición HTTP tipada: get<T> devuelve Observable<T>
this.http.get<Usuario[]>('/api/usuarios').subscribe(usuarios => { /* ... */ });

// Signals (Angular 17)
contador = signal<number>(0);
usuarios = signal<Usuario[]>([]);

// Formularios reactivos
form = new FormGroup<{ nombre: FormControl<string> }>({ /* ... */ });

// EventEmitter
@Output() guardado = new EventEmitter<Usuario>();
```

---

# 13. Utility types

> ▶️ `npm run play -- src/13-utility-types/demo.ts`

Los **utility types** son tipos genéricos que TypeScript trae de serie para **construir tipos a partir de otros**. Evitan duplicar interfaces: defines el modelo una sola vez y derivas el resto.

Todos los ejemplos parten de este modelo:

```ts
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  activo: boolean;
}
```

## `Partial<T>` — todo opcional

```ts
// Caso típico: una edición parcial (PATCH) o el estado de un formulario a medio rellenar.
type UsuarioParcial = Partial<Usuario>;

function actualizar(original: Usuario, cambios: Partial<Usuario>): Usuario {
  return { ...original, ...cambios };
}
console.log("Partial ->", actualizar(usuario, { nombre: "Ana María" }));

const borrador: UsuarioParcial = { nombre: "Luis" }; // válido aunque falte todo lo demás
```

Fíjate en la combinación con spread: `{ ...original, ...cambios }` parte del objeto completo y machaca solo las propiedades que llegan. Es el patrón estándar para actualizar estado sin mutarlo.

## `Required<T>` — todo obligatorio

Lo contrario de `Partial`:

```ts
interface Config {
  host?: string;
  puerto?: number;
}
type ConfigCompleta = Required<Config>; // host y puerto obligatorios

const config: ConfigCompleta = { host: "localhost", puerto: 4200 };
```

## `Readonly<T>` — todo de solo lectura

```ts
const usuarioInmutable: Readonly<Usuario> = usuario;
// usuarioInmutable.nombre = "otro";   // Error: Cannot assign to 'nombre'.
```

## `Pick<T, K>` — quedarse con algunas propiedades

Lo que muestras en un listado, sin traer el objeto entero:

```ts
// Lo que muestras en un listado, sin traer el objeto entero.
type UsuarioListado = Pick<Usuario, "id" | "nombre">;

const fila: UsuarioListado = { id: 1, nombre: "Ana" };
```

## `Omit<T, K>` — quitar algunas propiedades

Lo que devuelves por la API: todo **menos** la contraseña.

```ts
// Lo que devuelves por la API: todo MENOS la contraseña.
type UsuarioPublico = Omit<Usuario, "password">;

function aPublico(u: Usuario): UsuarioPublico {
  const { password, ...resto } = u; // desestructuración + rest
  return resto;
}
```

Ese `const { password, ...resto } = u` es el truco idiomático para quitar un campo: se extrae `password` a una variable suelta y todo lo demás queda en `resto`.

Y lo que se envía al crear un registro: todo menos el `id`, que lo genera el servidor.

```ts
// Lo que se envía al crear: todo MENOS el id (lo genera el servidor).
type NuevoUsuario = Omit<Usuario, "id">;
```

`Pick` y `Omit` son complementarios: usa el que te obligue a escribir menos claves.

## `Record<K, V>` — objeto con claves `K` y valores `V`

```ts
type Rol = "admin" | "editor" | "lector";

const permisos: Record<Rol, string[]> = {
  admin: ["leer", "escribir", "borrar"],
  editor: ["leer", "escribir"],
  lector: ["leer"],
  // si olvidas un rol, el compilador avisa
};
```

Esta es la gran ventaja: como las claves salen de una unión cerrada, **si añades un rol nuevo a `Rol` el compilador te obliga a definir sus permisos**. Es imposible olvidarse.

También sirve para diccionarios dinámicos:

```ts
// Diccionario dinámico
const cache: Record<string, Usuario> = {};
cache["u1"] = usuario;
console.log("Record dinámico ->", cache["u1"]?.nombre);
```

## `ReturnType<T>` y `Parameters<T>`

Extraen el tipo de retorno y el de los parámetros de una función que ya existe:

```ts
function crearSesion(usuarioId: number, duracionMin: number) {
  return { token: `tok-${usuarioId}`, expira: duracionMin * 60 };
}

type Sesion = ReturnType<typeof crearSesion>; // { token: string; expira: number }
type ArgsSesion = Parameters<typeof crearSesion>; // [number, number]
```

Evitan declarar una interfaz solo para nombrar lo que una función ya devuelve. Si cambias el `return`, el tipo se actualiza solo. El `typeof` delante es necesario: se le pasa el **tipo** de la función, no la función.

## `NonNullable`, `Exclude` y `Extract`

Trabajan sobre uniones:

```ts
type PuedeSerNulo = string | null | undefined;
type SiempreTexto = NonNullable<PuedeSerNulo>; // string
```

```ts
type Estado = "pendiente" | "enviado" | "entregado" | "cancelado";

type EstadoActivo = Exclude<Estado, "cancelado">; // quita
type EstadoFinal = Extract<Estado, "entregado" | "cancelado">; // se queda
```

## Combinarlos

Se encadenan sin problema. Un formulario de edición donde el `id` es obligatorio, el resto opcional y la contraseña no aparece:

```ts
// Formulario de edición: todo opcional menos el id.
type FormularioEdicion = Pick<Usuario, "id"> & Partial<Omit<Usuario, "id" | "password">>;

const edicion: FormularioEdicion = { id: 1, email: "nuevo@mail.com" };
```

## Resumen

| Utility type | Para qué |
|---|---|
| `Partial<T>` | Todas las propiedades opcionales |
| `Required<T>` | Todas obligatorias |
| `Readonly<T>` | Todas de solo lectura |
| `Pick<T, K>` | Quedarse con las claves `K` |
| `Omit<T, K>` | Quitar las claves `K` |
| `Record<K, V>` | Objeto de claves `K` y valores `V` |
| `ReturnType<T>` | Tipo que devuelve una función |
| `Parameters<T>` | Tipos de los parámetros de una función |
| `NonNullable<T>` | Quita `null` y `undefined` |
| `Exclude<T, U>` / `Extract<T, U>` | Quitar / quedarse con miembros de una unión |

---

# 14. Módulos: `import` y `export`

> ▶️ `npm run play -- src/14-modulos/demo.ts`

**Cada fichero `.ts` es un módulo independiente.** Todo lo que declaras dentro es privado del fichero salvo que lo exportes de forma explícita. Así se organiza un proyecto Angular completo.

La demo de este capítulo no es un único fichero, sino una estructura que imita la de Angular:

```
src/14-modulos/
  demo.ts                      ← consume todo lo demás
  modelos/usuario.model.ts     ← interfaces y tipos
  servicios/usuario.service.ts ← lógica
  servicios/index.ts           ← barrel
  utilidades/formato.ts        ← funciones sueltas
```

## Exportar con nombre

Es la forma que usa Angular. Un fichero puede tener todas las exportaciones que quiera. Así es `modelos/usuario.model.ts`:

```ts
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: Rol;
}

export type Rol = "admin" | "editor" | "lector";

// También se exportan constantes y funciones
export const ROL_POR_DEFECTO: Rol = "lector";

export function esAdmin(usuario: Usuario): boolean {
  return usuario.rol === "admin";
}
```

También se pueden agrupar al final del fichero, y renombrar al exportar, como en `utilidades/formato.ts`:

```ts
// --- Exportar al final, agrupado (alternativa) ---
function truncar(texto: string, max: number): string {
  return texto.length > max ? `${texto.slice(0, max)}…` : texto;
}

export { truncar };
```

```ts
// --- Renombrar al exportar ---
function acortar(texto: string): string {
  return truncar(texto, 10);
}

export { acortar as acortarCorto };
```

## Exportación por defecto

Solo puede haber **una** por fichero, y quien la importa le pone el nombre que quiera:

```ts
export default function saludar(nombre: string): string {
  return `Hola, ${capitalizar(nombre)}`;
}
```

> Angular **no** usa exportaciones por defecto: prefiere las nombradas porque se
> renombran y refactorizan mejor, y porque el editor las autocompleta.

## Importar

Todas estas formas están en `demo.ts`:

```ts
// ---------- Import con nombre (named import) ----------
// Los nombres deben coincidir EXACTAMENTE con los exportados.
import { capitalizar, formatearEuros, truncar } from "./utilidades/formato";

// ---------- Import por defecto ----------
// No lleva llaves y puedes ponerle el nombre que quieras.
import saludar from "./utilidades/formato";

// ---------- Renombrar al importar ----------
import { acortarCorto as acortar } from "./utilidades/formato";

// ---------- Import de TODO como un objeto (namespace) ----------
import * as formato from "./utilidades/formato";
```

Con el namespace, todo queda accesible a través de un objeto: `formato.capitalizar("desde el namespace")`.

## `import type`

Cuando solo necesitas la **forma** (interfaces, `type`), usa `import type`. Esa importación **desaparece al transpilar**, porque los tipos no existen en tiempo de ejecución. Así empieza `servicios/usuario.service.ts`:

```ts
// `import type` importa SOLO tipos: desaparece al transpilar (no genera require/import en el JS).
import type { Usuario, Rol } from "../modelos/usuario.model";

// Import normal: trae valores que existen en tiempo de ejecución.
import { ROL_POR_DEFECTO } from "../modelos/usuario.model";
```

Regla: `import type` para interfaces y alias de tipo; `import` normal para clases, funciones y constantes.

Compruébalo tú mismo con `npm run build` y mirando `build/14-modulos/servicios/usuario.service.js`: la primera línea no aparece por ningún lado.

## Rutas

Los imports van **sin extensión** y con ruta relativa, igual que en Angular:

```ts
import { UsuarioService } from "./servicios";
```

Esto funciona gracias a `"moduleResolution": "bundler"` en el `tsconfig.json`, que es justo la que configura Angular 17.

## Barrel files

Un `index.ts` que reexporta varios módulos, para tener un único punto de entrada. Este es `servicios/index.ts` completo:

```ts
/**
 * BARREL FILE
 *
 * Reexporta varios módulos desde un único punto de entrada.
 * Permite escribir  import { UsuarioService } from './servicios'
 * en vez de la ruta completa a cada fichero. Angular los usa mucho.
 */
export * from "./usuario.service";
```

Gracias a él, `demo.ts` puede escribir `from "./servicios"` en lugar de `from "./servicios/usuario.service"`. Angular usa barrels constantemente para agrupar modelos, servicios y componentes.

## El servicio completo

Juntando todo, así queda `servicios/usuario.service.ts`. Es, estructuralmente, un servicio de Angular sin el decorador `@Injectable`:

```ts
export class UsuarioService {
  private usuarios: Usuario[] = [];

  crear(nombre: string, email: string, rol: Rol = ROL_POR_DEFECTO): Usuario {
    const usuario: Usuario = { id: this.usuarios.length + 1, nombre, email, rol };
    this.usuarios.push(usuario);
    return usuario;
  }

  listar(): Usuario[] {
    return [...this.usuarios];
  }

  porRol(rol: Rol): Usuario[] {
    return this.usuarios.filter((u) => u.rol === rol);
  }
}
```

Fíjate en `listar()`: devuelve `[...this.usuarios]`, una **copia**. Así quien recibe la lista no puede modificar el array interno del servicio por accidente.

## Avisos

- **Imports circulares**: si A importa B y B importa A, tendrás valores `undefined` en ejecución de forma aparentemente aleatoria. Solución: saca lo compartido a un tercer fichero.
- Un fichero **sin ningún `import` ni `export`** no es un módulo, sino un *script*: sus variables son globales y pueden colisionar con las de otros ficheros. Por eso varias demos de este manual terminan con un `export {};` vacío.

## Cómo se ve en Angular 17

```ts
import { Component, inject } from '@angular/core';       // paquete de node_modules
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../servicios/usuario.service';   // ruta relativa
import type { Usuario } from '../modelos/usuario.model';         // solo el tipo

@Component({ /* ... */ })
export class UsuarioComponent { }                        // exportación con nombre
```

---

# 15. Asincronía: promesas, `async`/`await` y `fetch`

> ▶️ `npm run play -- src/15-async/demo.ts`

JavaScript ejecuta **una sola cosa a la vez**. Las operaciones que tardan (una petición de red, leer un fichero, un temporizador) no bloquean el programa: se lanzan y su resultado llega *después*.

```ts
console.log("1. Empieza el programa");

setTimeout(() => console.log("3. Esto llega después (asíncrono)"), 0);

console.log("2. Esto se ejecuta antes que el setTimeout");
```

Ejecuta la demo y verás los números en orden 1, 2, 3 aunque el `setTimeout` esté escrito en medio y con un retardo de 0 ms. Todo lo asíncrono se aparta y se retoma cuando el hilo principal queda libre.

## `Promise<T>`

Una promesa representa un valor que **todavía no está disponible**. Es genérica: `T` es el tipo que resolverá. Tiene tres estados: *pendiente* → *cumplida* (`resolve`) o *rechazada* (`reject`).

```ts
// Promise<T>: es genérico. T es el tipo del valor que resolverá.
function esperar(ms: number): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (ms < 0) {
      reject(new Error("El tiempo no puede ser negativo"));
      return;
    }
    setTimeout(() => resolve(`Han pasado ${ms} ms`), ms);
  });
}
```

Esta función `esperar` se usa en el resto del capítulo para simular una operación lenta.

## Consumirla con `.then()`

```ts
esperar(100)
  .then((mensaje) => console.log("then ->", mensaje))
  .catch((error: Error) => console.error("catch ->", error.message))
  .finally(() => console.log("finally -> pase lo que pase"));
```

- `.then()` recibe el valor si la promesa se cumple.
- `.catch()` recoge el error si se rechaza.
- `.finally()` se ejecuta siempre.

## Consumirla con `async`/`await`

Es la misma promesa escrita como si fuese código secuencial. `async` hace que la función devuelva **siempre** una `Promise`; `await` pausa hasta que la promesa resuelva.

```ts
// `async` hace que la función devuelva SIEMPRE una Promise.
async function conAwait(): Promise<void> {
  try {
    const mensaje = await esperar(200); // pausa aquí hasta que resuelva
    console.log("await ->", mensaje);

    await esperar(-1); // esta rechaza
  } catch (error) {
    // El error es `unknown`: hay que comprobar el tipo antes de usarlo.
    if (error instanceof Error) {
      console.error("await catch ->", error.message);
    }
  }
}
```

Dos detalles importantes:

- Los errores se capturan con un `try/catch` normal, no con `.catch()`.
- En TypeScript, **lo que se captura en un `catch` es de tipo `unknown`**. Hay que comprobar con `instanceof Error` antes de leer `.message`. Es el mismo *narrowing* del capítulo 02.

## Secuencial frente a paralelo

Este es el error de rendimiento más común:

```ts
async function secuencial(): Promise<void> {
  const inicio = Date.now();
  await esperar(150);
  await esperar(150); // espera a que acabe la anterior
  console.log(`secuencial -> ~${Date.now() - inicio} ms`);
}
```

```ts
async function paralelo(): Promise<void> {
  const inicio = Date.now();
  // Promise.all lanza todas a la vez y espera a la última.
  const [a, b] = await Promise.all([esperar(150), esperar(150)]);
  console.log(`paralelo -> ~${Date.now() - inicio} ms (${a} | ${b})`);
}
```

La demo imprime los tiempos reales: la versión secuencial tarda unos 300 ms y la paralela unos 150. Si dos operaciones no dependen una de otra, **no las encadenes con `await`**.

`Promise.all` falla entera si falla una. Si quieres el resultado de todas pase lo que pase:

```ts
// Promise.allSettled: no falla aunque alguna rechace.
async function todasConResultado(): Promise<void> {
  const resultados = await Promise.allSettled([esperar(50), esperar(-1)]);
  resultados.forEach((r, i) =>
    console.log(`allSettled[${i}] -> ${r.status}`),
  );
}
```

| Método | Comportamiento |
|---|---|
| `Promise.all` | Espera a todas. Si **una** falla, falla todo |
| `Promise.allSettled` | Espera a todas y devuelve el estado de cada una. Nunca falla |
| `Promise.race` | Devuelve la primera que termine, resuelva o rechace |
| `Promise.any` | Devuelve la primera que **resuelva** correctamente |

## `fetch` tipado

Así se consume una API REST. Primero se describe con una `interface` qué forma tienen los datos:

```ts
// Así se consume una API REST. En Angular será this.http.get<T>(url).
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function obtenerPost(id: number): Promise<Post> {
  const respuesta = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  // fetch NO lanza error con códigos 4xx/5xx: hay que comprobarlo a mano.
  if (!respuesta.ok) {
    throw new Error(`Error HTTP ${respuesta.status}`);
  }

  // `.json()` devuelve Promise<any>: el genérico le pone tipo.
  return (await respuesta.json()) as Post;
}
```

Dos trampas habituales:

1. **`fetch` solo rechaza la promesa si hay un fallo de red.** Un 404 o un 500 son respuestas válidas para él, así que hay que mirar `respuesta.ok` a mano.
2. **`.json()` devuelve `any`.** La aserción `as Post` es una promesa tuya al compilador, no una validación: si la API devuelve otra cosa, nadie te avisará.

Varias peticiones a la vez, combinando lo anterior:

```ts
    // Varias peticiones en paralelo
    const posts = await Promise.all([obtenerPost(2), obtenerPost(3)]);
    posts.forEach((p) => console.log(`fetch paralelo -> [${p.id}] ${p.title}`));
```

> La demo hace peticiones reales a `jsonplaceholder.typicode.com`. Sin conexión a
> internet, esa última parte fallará; el resto del fichero funciona igual.

## Top-level await

Al final de la demo verás llamadas con `await` fuera de cualquier función:

```ts
// await de nivel superior (top-level await): permitido en módulos ESM.
await conAwait();
await secuencial();
await paralelo();
```

Solo está permitido en módulos ESM, que es lo que usa este proyecto. Si el fichero no tuviera ningún `import`/`export`, TypeScript daría error: por eso la demo termina con `export {};`.

## Y en Angular: Observables

Angular no usa promesas para HTTP, usa **Observables** (RxJS):

```ts
// Servicio
obtenerPosts(): Observable<Post[]> {
  return this.http.get<Post[]>('https://.../posts');
}

// Componente
this.servicio.obtenerPosts().subscribe({
  next:  posts => this.posts = posts,
  error: err   => console.error(err)
});
```

| | `Promise` | `Observable` |
|---|---|---|
| Valores | Uno solo | 0, 1 o muchos a lo largo del tiempo |
| Cuándo se ejecuta | Al crearla | Solo al hacer `subscribe()` |
| ¿Se puede cancelar? | No | Sí (`unsubscribe()`) |
| Operadores | `.then()` | `map`, `filter`, `switchMap`, `debounceTime`… |

Se puede pasar de uno a otro:

```ts
const posts = await firstValueFrom(this.http.get<Post[]>(url));
```

Todo lo aprendido con `async`/`await` sigue sirviendo: cambia la herramienta, no el concepto de *"esto llegará más tarde"*.

---

# 16. Decoradores

> ▶️ `npm run play -- src/16-decoradores/demo.ts`

Un decorador es una **función** que se aplica a una clase, método, propiedad o parámetro para añadirle comportamiento o metadatos **sin modificar su código**.

Es el mecanismo sobre el que está construido todo Angular: `@Component`, `@Injectable`, `@Input`, `@Output`, `@Pipe`.

Requiere `"experimentalDecorators": true` en el `tsconfig.json`, ya activado en este proyecto igual que en Angular 17.

## Decorador de clase

Recibe el constructor de la clase. Se ejecuta **al cargar el fichero**, no al instanciar:

```ts
// Recibe el constructor de la clase.
function Registrado(constructor: Function): void {
  console.log(`[Registrado] clase "${constructor.name}" cargada`);
}

@Registrado
class Servicio {
  hacerAlgo(): string {
    return "trabajo hecho";
  }
}
```

Ejecuta la demo y verás que ese mensaje aparece el primero, sin haber hecho ningún `new`.

## Decorador con parámetros (decorator factory)

Para poder pasarle opciones, el decorador se envuelve en una función que lo devuelve. **Este es el patrón de `@Component`**:

```ts
interface OpcionesComponente {
  selector: string;
  template: string;
}

function Componente(opciones: OpcionesComponente) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    // Devolvemos una clase que extiende la original añadiéndole propiedades
    return class extends constructor {
      selector = opciones.selector;
      template = opciones.template;
    };
  };
}

@Componente({
  selector: "app-saludo",
  template: "<h1>Hola</h1>",
})
class SaludoComponent {
  nombre = "Mundo";
}
```

La clase decorada conserva lo suyo (`nombre`) y gana lo que le inyecta el decorador (`selector`, `template`). Compáralo con Angular y verás que es la misma idea:

```ts
@Component({
  selector: 'app-saludo',
  standalone: true,
  template: '<h1>Hola</h1>'
})
export class SaludoComponent { }
```

## Decorador de método

Recibe el objeto, el nombre del método y su *descriptor*. Sustituyendo `descriptor.value` se **envuelve** el método original:

```ts
function Log(_objetivo: any, nombre: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`[Log] llamando a ${nombre}(${args.join(", ")})`);
    const resultado = original.apply(this, args);
    console.log(`[Log] ${nombre}() devolvió ${resultado}`);
    return resultado;
  };

  return descriptor;
}
```

El patrón es siempre el mismo: guardas el método original, lo sustituyes por otro que hace algo antes y después, y llamas al original por el medio con `original.apply(this, args)`.

Se pueden apilar varios sobre el mismo método, y **se aplican de abajo hacia arriba**:

```ts
class Calculadora {
  // Se aplican de abajo a arriba
  @Medir
  @Log
  sumar(a: number, b: number): number {
    return a + b;
  }
}
```

En la demo, `@Medir` cronometra la llamada y `@Log` registra argumentos y resultado, sin que el método `sumar` sepa nada de ello.

## Decorador de propiedad

Es el tipo que usa Angular para `@Input()` y `@Output()`:

```ts
function PorDefecto(valor: unknown) {
  return function (objetivo: any, nombre: string): void {
    let interno = valor;

    Object.defineProperty(objetivo, nombre, {
      get: () => interno,
      set: (nuevo: unknown) => {
        interno = nuevo ?? valor; // si le pasan null/undefined, deja el valor por defecto
      },
      enumerable: true,
      configurable: true,
    });
  };
}

class Configuracion {
  @PorDefecto("localhost")
  host!: string;

  @PorDefecto(4200)
  puerto!: number;
}
```

> El `!` de `host!: string` es el *definite assignment assertion*: le dice al
> compilador "confía, esta propiedad se asigna aunque tú no lo veas aquí".
> Lo verás mucho en propiedades de Angular que inicializa el framework.

## Decorador de parámetro

Angular los usa para la inyección de dependencias (`@Inject(TOKEN)`):

```ts
function Requerido(objetivo: any, nombreMetodo: string, indice: number): void {
  console.log(`[Requerido] el parámetro ${indice} de ${nombreMetodo}() es obligatorio`);
}

class Formulario {
  enviar(@Requerido email: string, asunto?: string): void {
    console.log(`[Formulario] enviando a ${email}: ${asunto ?? "(sin asunto)"}`);
  }
}
```

Recibe la posición del parámetro (`indice`), no su valor: los decoradores de parámetro solo registran metadatos, no interceptan la llamada.

## Todo junto, como se ve en Angular 17

```ts
@Component({                        // decorador de CLASE con parámetros
  selector: 'app-usuario',
  standalone: true,
  template: `<p>{{ nombre }}</p>`
})
export class UsuarioComponent {

  @Input() nombre = '';             // decorador de PROPIEDAD
  @Output() guardado = new EventEmitter<string>();

  constructor(private http: HttpClient) {}   // inyección por constructor
}

@Injectable({ providedIn: 'root' })  // registra el servicio para inyectarlo
export class UsuarioService { }
```

En el día a día **no vas a escribir decoradores**, pero sí a usarlos continuamente. Lo importante es entender que son funciones que se ejecutan al cargar la clase y le añaden metadatos que Angular lee después para construir la aplicación.

---

# Ejercicios · Bloque 3 — Hacia Angular

> 📁 Soluciones comentadas: [`src/ejercicios/`](src/ejercicios/README.md)

Último bloque, capítulos 12 a 16. Son los ejercicios más largos, y su código ya se parece mucho al de un proyecto Angular real: repositorios genéricos, modelos derivados, servicios repartidos en ficheros, peticiones asíncronas y decoradores.

---

### Ejercicio 15 — Un repositorio para cualquier entidad
*Capítulo 12* · **Practicarás:** genéricos, restricciones con `extends` y `keyof`.

Una aplicación tiene muchos tipos de datos (alumnos, módulos, profesores…) y todos necesitan lo mismo: guardarlos, buscarlos y borrarlos. En vez de escribir una clase para cada uno, escribirás **una sola** que sirva para todos.

**Pasos**

1. Define dos interfaces: `Alumno` (`id`, `nombre` y `ciclo`, que puede ser `"DAM"` o `"DAW"`) y `Modulo` (`id`, `titulo` y `horas`).
2. Crea la clase genérica `Repositorio<T>`. Haz que solo acepte tipos que tengan un `id` numérico y guarda los datos internamente en un `Map<number, T>`.
3. Añádele estos métodos:
   - `guardar(item)`
   - `porId(id)`: devuelve el elemento, o `undefined` si no existe.
   - `todos()`: devuelve un array con todos los elementos.
   - `buscar(criterio)`: el criterio es una función que pone quien llama, como en el ejercicio 08.
   - `borrar(id)`: devuelve `true` si ha borrado algo y `false` si no.
   - Un *getter* `cantidad`.
4. Crea un repositorio de alumnos con Ana Serrano (id 1, DAM), Luis Gil (2, DAW) y Marta Ruiz (3, DAM), y otro de módulos con Programación (id 10, 256 h) y Bases de Datos (11, 192 h). Prueba todos los métodos: busca el alumno 2, los alumnos de DAM y los módulos de más de 200 horas, muestra cuántos hay de cada uno y borra los ids 3 y 9.
5. Escribe una función genérica `extraer(items, clave)` que devuelva un array con el valor de esa propiedad en cada elemento. Con `"nombre"` debe devolver un `string[]` y con `"horas"`, un `number[]`. Además, solo debe aceptar claves que existan en el tipo.

> 💡 **Pistas**
> - La restricción del paso 2 se escribe `class Repositorio<T extends { id: number }>`. Sin ella, TypeScript no te dejaría usar `item.id` dentro de la clase.
> - La cabecera de `extraer` es lo más difícil del ejercicio:
>   `function extraer<T, K extends keyof T>(items: T[], clave: K): T[K][]`
>   `K extends keyof T` significa «K tiene que ser una de las claves de T», y `T[K]` es «el tipo de esa propiedad».

**Salida esperada**

```
Alumno 2 -> { id: 2, nombre: 'Luis Gil', ciclo: 'DAW' }
De DAM   -> [ 'Ana Serrano', 'Marta Ruiz' ]
Módulos largos -> [ 'Programación' ]
Alumnos: 3 | Módulos: 2
Borrar id 3 -> true
Borrar id 9 -> false
Quedan 2 alumnos
Nombres -> [ 'Ana Serrano', 'Luis Gil' ]
Horas   -> [ 256, 192 ]
```

---

### Ejercicio 16 — Un modelo, muchas vistas
*Capítulo 13* · **Practicarás:** los *utility types* `Omit`, `Pick`, `Partial`, `Record` y `ReturnType`.

Un mismo alumno se usa de formas distintas: al darlo de alta todavía no tiene `id`, al enviarlo al navegador no debe llevar la contraseña, y en un listado solo hacen falta dos campos. En vez de escribir una interfaz para cada caso, las **sacarás todas** de una sola.

Parte de esta interfaz y de este alumno:

```ts
interface Alumno {
  id: number;
  nombre: string;
  email: string;
  password: string;
  ciclo: "DAM" | "DAW" | "ASIR";
  activo: boolean;
}
```

Ana Serrano: id 1, `ana@ies.es`, ciclo DAM, activa. Inventa tú la contraseña.

**No declares ninguna interfaz más.** Todos los tipos nuevos se obtienen a partir de `Alumno`.

**Pasos**

1. `NuevoAlumno`: lo que se envía al crear un alumno. Lleva todo **menos el `id`**, porque lo genera el servidor. Crea con él a Luis Gil (`luis@ies.es`, DAW, activo).
2. `AlumnoPublico`: lo que devuelve la API. Lleva todo **menos la contraseña**. Escribe una función que convierta un `Alumno` en un `AlumnoPublico` y pruébala con Ana.
3. `FilaListado`: solo `id` y `nombre`. Crea un listado con Ana y Luis.
4. Escribe `actualizar(original, cambios)`, donde `cambios` puede traer **solo algunos** de los campos. Úsala para cambiar el email de Ana a `ana.serrano@ies.es` y desactivarla.
5. Con `Record`, crea una tabla de permisos para tres roles: `alumno` (`ver-notas`), `docente` (`ver-notas` y `poner-notas`) y `secretaria` (`ver-notas`, `matricular` y `anular`). Muestra los permisos del docente.
6. Agrupa por ciclo los nombres de Ana y Luis, en un `Record` cuyas claves sean los tres ciclos.
7. Escribe `generarCredenciales(alumno)`, que devuelva un objeto con el `usuario` (lo que va antes de la `@` del email) y los días que tarda en caducar (`expira: 30`). Obtén el tipo de ese objeto con `ReturnType`, sin escribirlo a mano.
8. `FormularioEdicion`: el `id` es obligatorio, el resto de campos son opcionales y no puede llevar contraseña. Crea uno que solo cambie el ciclo de Ana a `"ASIR"`.

> 💡 **Pistas**
> - Para quitar un campo: `Omit<Alumno, "id">`. Para quedarte con algunos: `Pick<Alumno, "id" | "nombre">`. Para hacerlos todos opcionales: `Partial<Alumno>`.
> - En el paso 2, la desestructuración separa la contraseña del resto: `const { password, ...resto } = alumno;`
> - El paso 8 combina varios: `Pick`, `Partial`, `Omit` y `&`.

**Salida esperada**

```
Alta -> Luis Gil DAW
Público -> {
  id: 1,
  nombre: 'Ana Serrano',
  email: 'ana@ies.es',
  ciclo: 'DAM',
  activo: true
}
Listado -> [ { id: 1, nombre: 'Ana Serrano' }, { id: 2, nombre: 'Luis Gil' } ]
Editada -> ana.serrano@ies.es, activa: false
Permisos docente -> [ 'ver-notas', 'poner-notas' ]
Por ciclo -> { DAM: [ 'Ana Serrano' ], DAW: [ 'Luis Gil' ], ASIR: [] }
Credenciales -> ana, expira en 30 días
Formulario -> { id: 1, ciclo: 'ASIR' }
```

---

### Ejercicio 17 — Repartir el código en módulos
*Capítulo 14* · **Practicarás:** `import` y `export`, `import type`, *barrel files* y la organización de carpetas de un proyecto Angular.

Hasta ahora cada ejercicio cabía en un fichero. En Angular, el código se reparte en carpetas según lo que hace cada parte. **Este ejercicio tiene varios ficheros**. Crea esta estructura:

```
ejercicio-17/
  index.ts                     ← el programa principal: usa todo lo demás
  modelos/alumno.model.ts      ← tipos y constantes
  servicios/alumno.service.ts  ← la lógica
  servicios/index.ts           ← barrel file
  utilidades/formato.ts        ← funciones de ayuda
```

**Pasos**

1. **`modelos/alumno.model.ts`.** Exporta el tipo `Ciclo`, la interfaz `Alumno` (`id`, `nombre`, `ciclo` y `nota`), la constante `NOTA_APROBADO = 5` y una función `estaAprobado(alumno)`.
2. **`utilidades/formato.ts`.** Exporta tres funciones:
   - `capitalizar(texto)`: pone en mayúscula la primera letra del texto y el resto en minúscula.
   - `conDecimales(n)`: devuelve el número como texto con dos decimales.
   - `iniciales(nombreCompleto)`: devuelve las iniciales en mayúscula. Apóyate en una función auxiliar `siglas` que **no exportes**, y comprueba que desde otro fichero no se puede importar.
3. **`servicios/alumno.service.ts`.** Crea la clase `AlumnoService`, con un array privado de alumnos y estos métodos: `alta(nombre, ciclo, nota)`, `listar()`, `porCiclo(ciclo)`, `aprobados()` y `mediaFormateada()`. `listar()` debe devolver una **copia** del array. Importa los tipos con `import type` y el resto con `import` normal.
4. **`servicios/index.ts`.** Es el *barrel file*: solo contiene `export * from "./alumno.service";`. Gracias a él, desde fuera se puede escribir `from "./servicios"` en vez de la ruta completa.
5. **`index.ts`.** Importa todo lo anterior y da de alta a `"ana serrano"` (DAM, 8.5), `"luis gil"` (DAW, 4) y `"marta ruiz"` (DAM, 9.25), en minúsculas a propósito. Muestra el listado con sus iniciales y su nombre capitalizado. Importa `iniciales` con otro nombre: `iniciales as siglasDe`.
6. Por último, añade un alumno al array que devuelve `listar()` y comprueba que el servicio sigue teniendo 3.

Para ejecutarlo, indica el fichero `index.ts`:

```bash
npm run play -- src/ejercicios/soluciones/ejercicio-17/index.ts
```

**Salida esperada**

```
AS Ana serrano — DAM — 8.5
LG Luis gil — DAW — 4
MR Marta ruiz — DAM — 9.25
De DAM -> [ 'Ana serrano', 'Marta ruiz' ]
Nota de aprobado: 5
Aprobados: 2 de 3
Media del grupo: 7.25
Tras intentar colar un alumno: el servicio sigue con 3
```

> 🔍 **Para terminar:** ejecuta `npm run build` y abre `build/.../alumno.service.js`. Verás que la línea del `import type` ha **desaparecido**, mientras que el `import` normal sigue ahí: los tipos no existen en el JavaScript final.

---

### Ejercicio 18 — Cargar las notas del servidor
*Capítulo 15* · **Practicarás:** promesas, `async` / `await`, errores con `try` / `catch`, peticiones en paralelo y `fetch`.

Las peticiones a un servidor tardan, y a veces fallan. Como no tienes un servidor propio, lo simularás con una función que tarda un poco en responder.

**Pasos**

1. Escribe `buscarAlumno(id)`, que devuelva un `Promise<Alumno>`. Pasados 120 ms debe resolver con este objeto:
   ```ts
   { id, nombre: `Alumno ${id}`, nota: 5 + (id % 5) }
   ```
   Si el `id` es 0 o negativo, en vez de eso debe rechazar con un error.
2. Con `async` / `await`, busca el alumno 3 y muéstralo. Después busca el `-1` y captura el error con `try` / `catch`.
3. Mide cuánto tardan tres peticiones (ids 1, 2 y 3) hechas **una detrás de otra**, cada una con su `await`. Mide después cuánto tardan las mismas tres lanzadas **a la vez** con `Promise.all`. Muestra también la media de las tres notas.
4. Usa `Promise.allSettled` con los ids 1, -5 y 2. La segunda fallará, pero el programa no debe detenerse: muestra el resultado de cada una.
5. Termina con una petición real con `fetch` a `https://jsonplaceholder.typicode.com/posts/1`. Muestra el `id` y los 30 primeros caracteres del `title`.

> 💡 **Pistas**
> - Para el retraso del paso 1, usa `setTimeout` dentro de `new Promise((resolve, reject) => { ... })`.
> - En el `catch`, el error es de tipo `unknown`. Compruébalo con `error instanceof Error` antes de leer `error.message`.
> - Para medir un tiempo, guarda `Date.now()` antes y réstalo después. Redondea a las centenas.
> - `fetch` **no** lanza un error si el servidor responde con un 404 o un 500. Tienes que comprobar tú `respuesta.ok`.

**Salida esperada**

```
Encontrado -> Alumno 3 con 8
Error controlado -> Id no válido: -1
Secuencial: ~400 ms
Paralelo:   ~100 ms
Media de los 3 -> 7.00
allSettled:
  [0] OK -> Alumno 1
  [1] KO -> Id no válido: -5
  [2] OK -> Alumno 2
API -> post 1: sunt aut facere repellat provi…
```

> Los tiempos son aproximados y dependen de cada ordenador. Lo importante es la proporción: en paralelo debe tardar aproximadamente **un tercio** que una detrás de otra. La última línea necesita conexión a internet.

---

### Ejercicio 19 — Decoradores académicos
*Capítulo 16* · **Practicarás:** decoradores de clase, de método, de propiedad y de parámetro, como los que usa Angular (`@Component`, `@Input`…).

Un decorador es una función que se «engancha» con `@` a una clase o a una de sus partes y le añade comportamiento sin cambiar su código.

**Pasos**

1. Crea una clase `Expediente` con:
   - una propiedad `nota`;
   - un método `calificar(nombre, nota)` que guarde la nota y devuelva `"Nombre: APTO"` o `"Nombre: NO APTO"`;
   - un método `sincronizar()` que lance un error las dos primeras veces que se le llama y funcione a la tercera.
2. Escribe estos **cinco** decoradores y aplícalos:
   - `@Entidad`, de **clase**: muestra el nombre de la clase.
   - `@Auditar`, de **método**, en `calificar`: muestra los argumentos con los que se llama al método y el valor que devuelve. Para conseguirlo, sustituye el método por otro que muestre esa información y llame al original en medio.
   - `@Reintentar(3)`, de **método con parámetros**, en `sincronizar`: si el método lanza un error, lo vuelve a intentar hasta 3 veces. Si se agotan los intentos, devuelve `null`.
   - `@EnRango(0, 10)`, de **propiedad**, en `nota`: ignora los valores que estén fuera del rango y avisa por consola.
   - `@Obligatorio`, de **parámetro**, en el `nombre` de `calificar`: muestra qué parámetro es obligatorio.
3. Muestra `--- uso ---`, crea un expediente y califica a Ana Serrano (8) y a Luis Gil (4).
4. Intenta poner un 50 en la `nota` y muestra la nota final.
5. Llama a `sincronizar()` y muestra lo que devuelve.

> 💡 **Pista:** cada tipo de decorador recibe parámetros distintos. Repasa en el capítulo 16 la forma de cada uno antes de empezar.

Fíjate en el orden de la salida: `[Obligatorio]` y `[Entidad]` aparecen **antes** de `--- uso ---`. Los decoradores se ejecutan cuando se define la clase, es decir, al cargar el fichero, y no al hacer `new`.

**Salida esperada**

```
[Obligatorio] parámetro 0 de calificar() es obligatorio
[Entidad] registrada la clase "Expediente"
--- uso ---
  [Auditar] calificar(Ana Serrano, 8)
  [Auditar] calificar devolvió Ana Serrano: APTO
Ana Serrano: APTO
  [Auditar] calificar(Luis Gil, 4)
  [Auditar] calificar devolvió Luis Gil: NO APTO
Luis Gil: NO APTO
  [EnRango] nota=50 fuera de [0, 10], se ignora
Nota final: 4
  [Reintentar] sincronizar falló (intento 1/3)
  [Reintentar] sincronizar falló (intento 2/3)
Sincronizar -> sincronizado al intento 3
```

---

# De TypeScript a Angular 17

Recapitulación: qué concepto de este manual vas a usar en cada parte de Angular.

| Concepto de TypeScript | Dónde aparece en Angular 17 |
|---|---|
| `interface` / `type` | Modelos de datos y respuestas de la API (DTOs) |
| Uniones de literales | Estados de un componente, variantes de un botón |
| `?.` y `??` | Plantillas y datos que aún no han llegado del servidor |
| Arrays: `map`, `filter`, `reduce` | Transformar listas antes de pintarlas |
| Arrow functions y `this` | Todas las callbacks y suscripciones |
| Clases y POO | Todo componente, servicio, pipe y guard es una clase |
| `private` / `public` | Solo lo `public` es accesible desde la plantilla HTML |
| `implements` | `OnInit`, `OnDestroy`, `CanActivate`, `HttpInterceptor` |
| Herencia y clases abstractas | Componentes y servicios base compartidos |
| Genéricos | `Observable<T>`, `signal<T>()`, `http.get<T>()`, `FormControl<T>` |
| Utility types | `Partial<T>` en formularios, `Omit<T, 'id'>` al crear registros |
| Módulos `import`/`export` | La estructura completa del proyecto |
| Decoradores | `@Component`, `@Injectable`, `@Input`, `@Output` |
| `async`/`await` y promesas | Base conceptual de los Observables y de `firstValueFrom` |

## Un componente de Angular, concepto a concepto

Todo lo del curso, junto, en un fichero real:

```ts
@Component({                                    // 16. decorador de clase con parámetros
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],                      // 14. módulos
  template: `
    <p *ngIf="cargando">Cargando…</p>
    <ul>
      <li *ngFor="let u of usuarios">
        {{ u.nombre }} — {{ u.ciudad ?? 'sin ciudad' }}
      </li>
    </ul>
  `
})
export class UsuariosComponent implements OnInit {   // 11. clase + 10. implements

  @Input() filtro = '';                         // 16. decorador de propiedad
  @Output() seleccionado = new EventEmitter<Usuario>();  // 12. genéricos

  usuarios: Usuario[] = [];                     // 10. interface + 05. arrays
  cargando = false;                             // 02. inferencia de tipos

  constructor(private servicio: UsuarioService) {}   // 11. parameter properties

  ngOnInit(): void {                            // 07. método que no devuelve nada
    this.cargando = true;

    this.servicio.obtenerUsuarios().subscribe({     // 15. asincronía
      next: (datos) => {                           // 07. arrow function: `this` funciona
        this.usuarios = datos.filter(u => u.activo); // 05. filter
        this.cargando = false;
      },
      error: (err) => console.error(err)
    });
  }
}
```

No hay nada en ese componente que no hayas visto en este manual. Lo único nuevo al llegar a Angular será el framework en sí: plantillas, inyección de dependencias y Observables.

## Siguiente paso

```bash
npm install -g @angular/cli@17
ng new mi-primera-app
```

Abre el `tsconfig.json` que genera Angular y compáralo con el de este proyecto: verás que son prácticamente el mismo.

---

# Depurar en Visual Studio Code

Hasta ahora, para saber qué valía una variable has usado `console.log`. Funciona, pero obliga a modificar el código, volver a ejecutar y luego acordarse de borrar los rastros. El **depurador** hace lo mismo sin tocar el programa: lo congela en el punto que tú elijas y te deja mirar dentro.

Es la misma herramienta que usarás en Angular, así que merece la pena aprenderla aquí, con programas pequeños.

## Puesta en marcha

No hay que configurar nada: el proyecto incluye la carpeta `.vscode/` con tres configuraciones ya preparadas.

1. Abre **la carpeta del proyecto** en VS Code (`File > Open Folder...`). Esto es importante: si abres una carpeta de más arriba, las rutas no coinciden y no funcionará.
2. Ejecuta `npm install` si no lo has hecho.
3. Abre cualquier `demo.ts` y pulsa **F5**.

> **Ojo**: F5 lanza el fichero con `tsx`, igual que `npm run play:fast`, así que
> **no comprueba los tipos** (ver [Transpilar no es comprobar](#transpilar-no-es-comprobar)).
> Es lo que se quiere al depurar —a veces hay que ejecutar código con errores de tipos para
> ver qué hace—, pero recuerda pasar `npm run check` antes de dar algo por terminado.

## Tu primera sesión de depuración

Abre `src/07-funciones/demo.ts` y busca la función `sumar`:

```ts
function sumar(a: number, b: number): number {
  return a + b;
}
```

1. **Pon un punto de interrupción** (*breakpoint*): haz clic en el margen izquierdo, justo a la izquierda del número de línea del `return`. Aparece un círculo rojo.
2. Pulsa **F5**. Si te pregunta, elige `TS: depurar el fichero abierto`.
3. El programa arranca y **se detiene** en esa línea, que queda resaltada. Todavía no se ha ejecutado.

Ahora fíjate en el panel de la izquierda:

| Panel | Para qué sirve |
|---|---|
| **Variables** | Los valores vivos en este instante: verás `a: 10` y `b: 20` |
| **Inspección** (*Watch*) | Expresiones que tú escribes y se recalculan en cada parada. Prueba a añadir `a * b` |
| **Pila de llamadas** (*Call Stack*) | Quién ha llamado a quién para llegar hasta aquí. Haz clic en la línea de abajo y viajas al punto de la llamada |
| **Puntos de interrupción** | La lista de todos los breakpoints, para activarlos o desactivarlos sin borrarlos |

También puedes **pasar el ratón por encima de cualquier variable** del editor y VS Code te muestra su valor en un recuadro.

## Los cuatro botones que hay que conocer

La barra flotante de arriba controla el avance. Son las teclas que más vas a usar:

| Tecla | Botón | Qué hace |
|---|---|---|
| **F10** | *Step Over* — Paso a paso por procedimientos | Ejecuta la línea entera y pasa a la siguiente. Si hay una llamada a función, la ejecuta sin entrar |
| **F11** | *Step Into* — Paso a paso por instrucciones | **Entra dentro** de la función que se llama en esta línea |
| **Mayús+F11** | *Step Out* — Paso a paso para salir | Termina la función actual y vuelve a quien la llamó |
| **F5** | *Continue* — Continuar | Sigue a toda velocidad hasta el próximo breakpoint (o hasta el final) |
| **Mayús+F5** | *Stop* | Corta la ejecución |

> **Regla práctica**: usa **F10** para recorrer tu código y **F11** solo cuando sospeches que el fallo está *dentro* de la función que vas a llamar. Si entras por error, **Mayús+F11** te saca.

## La Consola de depuración

Mientras el programa está detenido, la pestaña **Consola de depuración** (*Debug Console*) es un intérprete vivo dentro de tu programa. Escribe ahí cualquier expresión y se evalúa con los valores de ese momento:

```
a + b
frutas.filter(f => f.length > 6)
typeof tipoDatoDesconocido
```

Incluso puedes **cambiar** valores (`a = 99`) y seguir ejecutando para ver qué pasa. Es la forma más rápida de comprobar una hipótesis sin editar y relanzar.

> No confundas esta pestaña con la **Terminal**: la Terminal muestra lo que imprime tu `console.log`; la Consola de depuración es donde tú preguntas.

## Breakpoints que no paran siempre

Un breakpoint normal dentro de un bucle es insufrible: para en las 500 vueltas. VS Code tiene dos remedios. **Clic derecho en el margen → `Añadir punto de interrupción condicional...`**:

- **Expresión condicional**: solo para cuando la expresión es cierta.

  Abre `src/05-arrays/demo.ts`, ve al `forEach` de la línea 100 y pon la condición `valor === "platano"`. Solo se detendrá en esas dos vueltas.

- **Punto de registro** (*Logpoint*): no detiene nada; imprime un mensaje en la Consola de depuración. Es un `console.log` que no ensucia el código y que puedes quitar sin tocar el fichero. Se escribe con las expresiones entre llaves:

  ```
  fruta {valor} con {valor.length} letras
  ```

- **Recuento de visitas** (*Hit Count*): para solo en la vuelta número N.

Los logpoints se marcan con un rombo rojo en vez de un círculo, y son la mejor herramienta para los capítulos de arrays y bucles.

## Depurar código asíncrono

El capítulo 15 es donde el depurador más ayuda, porque el orden de ejecución no es el que se lee.

Abre `src/15-async/demo.ts` y pon un breakpoint en la línea 38:

```ts
const mensaje = await esperar(200); // pausa aquí hasta que resuelva
```

Pulsa **F10**. Verás que el programa **no se queda bloqueado**: sigue con otras cosas y vuelve a esta línea cuando la promesa resuelve. En la **Pila de llamadas** aparecerán marcos etiquetados como *async*, que reconstruyen de dónde venía la llamada aunque el `await` haya cortado la ejecución por el medio.

Ver esto una vez explica el `async`/`await` mejor que cualquier diagrama, y es exactamente lo que ocurrirá con las peticiones `HttpClient` de Angular.

## Las tres configuraciones incluidas

En la vista **Ejecutar y depurar** (`Ctrl+Mayús+D`) hay un desplegable arriba con estas opciones:

| Configuración | Cuándo usarla |
|---|---|
| **TS: depurar el fichero abierto** | La de siempre. Depura el `.ts` que tengas delante |
| **TS: elegir capítulo y depurar** | Muestra una lista con los 16 capítulos. Cómodo en clase, y no depende de qué fichero esté abierto |
| **JS: depurar el transpilado de build/** | Compila con `npm run build` y depura el **JavaScript generado**. Sirve para comprobar que los breakpoints del `.ts` siguen funcionando sobre el `.js` gracias a los *source maps* |

> **Limitación de la tercera**: no funciona con el capítulo `14-modulos` ni con el `ejercicio-17`.
> El `tsconfig.json` usa `"moduleResolution": "bundler"` (como Angular), que permite escribir
> `import { x } from "./y"` sin extensión. Node exige la extensión `.js` al ejecutar módulos ESM,
> así que el `build/` de esos dos falla con `ERR_MODULE_NOT_FOUND`.
> No es un error del proyecto: es justamente el trabajo que hace un *bundler* y que en Angular
> resuelve la herramienta de construcción. Para esos dos casos usa cualquiera de las otras dos
> configuraciones, que van por `tsx` y no tienen el problema.

## La sentencia `debugger;`

Si escribes `debugger;` en una línea, se comporta como un breakpoint puesto desde el código:

```ts
function aplicarIva(precio: number, iva: number = 21): number {
  debugger; // el depurador se detendrá aquí
  return precio * (1 + iva / 100);
}
```

Es cómodo cuando no sabes en qué fichero va a entrar el programa. **Acuérdate de borrarlo**: a diferencia de un breakpoint, esto sí viaja en el código y se quedaría en la entrega.

## Depurar lo que ya está corriendo

Si estás trabajando con `npm run dev` y no quieres pararlo, activa el **Auto Attach**:

1. `Ctrl+Mayús+P` → `Debug: Toggle Auto Attach` → **Smart**.
2. Abre una terminal **nueva** (las ya abiertas no quedan enganchadas).
3. Lanza `npm run play -- src/11-clases/demo.ts`.

VS Code engancha el depurador solo, y tus breakpoints funcionan sin haber pulsado F5.

## Cuando no funciona

| Síntoma | Causa y solución |
|---|---|
| El breakpoint sale **gris y hueco** | No se ha podido asociar a código real. Suele ser porque abriste una carpeta que no es la raíz del proyecto, o el breakpoint está en una línea sin código (un comentario, una línea en blanco) |
| `Cannot find package 'tsx'` | Falta `npm install` |
| Para en ficheros raros de `node_modules` o de Node | Es lo que evita `skipFiles` en `launch.json`. Si aparece, comprueba que no has borrado esa línea |
| El programa termina sin detenerse | El breakpoint está en código que nunca se ejecuta, o en una función que nadie llama |
| Los valores no cuadran con el código | Estás depurando una versión antigua de `build/`. Vuelve a lanzar `npm run build`, o usa la configuración de `tsx` |
| El editor marca errores distintos a `npm run check` | VS Code está usando su TypeScript y no el del proyecto. `Ctrl+Mayús+P` → `TypeScript: Select TypeScript Version` → **Use Workspace Version** (5.4.5) |

## De aquí a Angular

Todo lo de esta sección se traslada tal cual: breakpoints, F10/F11, Inspección, Pila de llamadas y Consola de depuración son idénticos. La única diferencia es que en Angular el código se ejecuta en el **navegador**, así que la configuración de `launch.json` usa `"type": "chrome"` en lugar de `"type": "node"` y apunta a `http://localhost:4200`. Los breakpoints se siguen poniendo en el `.ts`, y por el mismo motivo: los *source maps*.
