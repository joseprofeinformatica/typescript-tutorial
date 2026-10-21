# Ejercicios

Diecinueve ejercicios repartidos en tres bloques, todos sobre el **mismo hilo conductor**: la gestión académica de un ciclo formativo. Cada bloque parte de donde lo dejó el anterior, así que al terminar tendrás un mini-sistema completo construido con todo lo del curso.

Los enunciados, con la salida esperada de cada uno, están en el [README principal](../../README.md#contenido).

```bash
npm run play -- src/ejercicios/soluciones/ejercicio-01.ts
```

## Bloque 1 — Datos y colecciones (capítulos 01-06)

| Nº | Título | Capítulos | Conceptos |
|----|--------|-----------|-----------|
| 01 | [La ficha del módulo](soluciones/ejercicio-01.ts) | 01-03 | `const` / `let`, template literals, ternario, mutar un objeto `const` |
| 02 | [Notas que pueden no existir](soluciones/ejercicio-02.ts) | 02-03 | `number \| null`, `??` frente a `\|\|`, `?.`, `unknown` + narrowing |
| 03 | [Calificaciones y convocatorias](soluciones/ejercicio-03.ts) | 04 | `if/else if`, `switch`, ternario, `continue`, `break` |
| 04 | [La lista de clase](soluciones/ejercicio-04.ts) | 05 | `push`/`pop`/`shift`/`unshift`, `includes`, `indexOf`, `sort` sin mutar |
| 05 | [Estadísticas de la evaluación](soluciones/ejercicio-05.ts) | 05 | `map`, `filter`, `reduce`, acumulador objeto, `Math.max` con spread |
| 06 | [Fichas con tuplas](soluciones/ejercicio-06.ts) | 06 | Tuplas con nombre, retorno múltiple, desestructuración con hueco |

## Bloque 2 — Modelar el dominio (capítulos 07-11)

| Nº | Título | Capítulos | Conceptos |
|----|--------|-----------|-----------|
| 07 | [Funciones del cuaderno](soluciones/ejercicio-07.ts) | 07 | Parámetros por defecto, opcionales, `rest`, unión + narrowing |
| 08 | [Criterios intercambiables](soluciones/ejercicio-08.ts) | 07 | Callbacks tipadas, `this` en arrow functions |
| 09 | [Modelar el alumno con `type`](soluciones/ejercicio-09.ts) | 08 | Uniones de literales, `readonly`, opcionales, `&`, template literal types |
| 10 | [Validar lo que llega de fuera](soluciones/ejercicio-10.ts) | 08 | Type guards (`x is T`), narrowing con `in`, `unknown` |
| 11 | [Estados de la matrícula](soluciones/ejercicio-11.ts) | 09 | `enum`, unión de literales, el bug del enum numérico |
| 12 | [Contratos con interfaces](soluciones/ejercicio-12.ts) | 10 | `extends` encadenado, propiedades función, merging |
| 13 | [El expediente como clase](soluciones/ejercicio-13.ts) | 11 | Encapsulación, getters, miembros estáticos, validación |
| 14 | [Jerarquía del personal](soluciones/ejercicio-14.ts) | 11 | Clase abstracta, herencia en 3 niveles, `override`, `super`, polimorfismo |

## Bloque 3 — Hacia Angular (capítulos 12-16)

| Nº | Título | Capítulos | Conceptos |
|----|--------|-----------|-----------|
| 15 | [Un repositorio para cualquier entidad](soluciones/ejercicio-15.ts) | 12 | Genéricos, restricción `extends`, `keyof`, `Map` |
| 16 | [Un modelo, muchas vistas](soluciones/ejercicio-16.ts) | 13 | `Omit`, `Pick`, `Partial`, `Record`, `ReturnType`, indexed access |
| 17 | [Repartir el código en módulos](soluciones/ejercicio-17/) | 14 | `import`/`export`, `import type`, barrel file, estructura Angular |
| 18 | [Cargar las notas del servidor](soluciones/ejercicio-18.ts) | 15 | `Promise<T>`, `async`/`await`, `Promise.all`, `allSettled`, `fetch` |
| 19 | [Decoradores académicos](soluciones/ejercicio-19.ts) | 16 | Decoradores de clase, método, propiedad y parámetro; factories |

> El ejercicio 17 es **multi-fichero**. Se ejecuta con:
> ```bash
> npm run play -- src/ejercicios/soluciones/ejercicio-17/index.ts
> ```

## Cómo trabajarlos

1. Lee el enunciado y **la salida esperada** en el README principal.
2. Escribe tu versión en un fichero nuevo, sin mirar la solución.
3. Ejecútala y compara la salida con la esperada.
4. Pasa `npm run check` antes de darlo por terminado: comprueba los tipos de todo el proyecto.
5. Solo entonces, abre la solución y compárala con la tuya.

Las soluciones están **comentadas explicando el porqué**, no solo el qué. En varias hay líneas comentadas con `// ❌ Error:` que puedes descomentar para ver qué dice el compilador: forman parte del ejercicio.
