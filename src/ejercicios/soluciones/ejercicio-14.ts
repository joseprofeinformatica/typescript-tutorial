/**
 * EJERCICIO 14 — Un repositorio que sirva para cualquier entidad
 * Capítulo 12 (genéricos, restricciones, keyof)
 */

interface Alumno {
  id: number;
  nombre: string;
  ciclo: "DAM" | "DAW";
}
interface Modulo {
  id: number;
  titulo: string;
  horas: number;
}

/**
 * La restricción `T extends { id: number }` es lo que permite escribir
 * `item.id` dentro de la clase. Sin ella el compilador no sabría
 * que ese campo existe.
 */
class Repositorio<T extends { id: number }> {
  private datos = new Map<number, T>();

  guardar(item: T): void {
    this.datos.set(item.id, item);
  }

  // Devuelve T | undefined porque Map.get() puede no encontrar nada
  porId(id: number): T | undefined {
    return this.datos.get(id);
  }

  todos(): T[] {
    return [...this.datos.values()];
  }

  // Callback genérica: el criterio lo pone quien llama
  buscar(criterio: (item: T) => boolean): T[] {
    return this.todos().filter(criterio);
  }

  borrar(id: number): boolean {
    return this.datos.delete(id);
  }

  get cantidad(): number {
    return this.datos.size;
  }
}

// Una sola clase, dos entidades distintas y totalmente tipadas
const alumnos = new Repositorio<Alumno>();
alumnos.guardar({ id: 1, nombre: "Ana Serrano", ciclo: "DAM" });
alumnos.guardar({ id: 2, nombre: "Luis Gil", ciclo: "DAW" });
alumnos.guardar({ id: 3, nombre: "Marta Ruiz", ciclo: "DAM" });

const modulos = new Repositorio<Modulo>();
modulos.guardar({ id: 10, titulo: "Programación", horas: 256 });
modulos.guardar({ id: 11, titulo: "Bases de Datos", horas: 192 });

console.log("Alumno 2 ->", alumnos.porId(2));
console.log(
  "De DAM   ->",
  alumnos.buscar((a) => a.ciclo === "DAM").map((a) => a.nombre),
);
console.log(
  "Módulos largos ->",
  modulos.buscar((m) => m.horas > 200).map((m) => m.titulo),
);
console.log(`Alumnos: ${alumnos.cantidad} | Módulos: ${modulos.cantidad}`);

console.log("Borrar id 3 ->", alumnos.borrar(3));
console.log("Borrar id 9 ->", alumnos.borrar(9));
console.log(`Quedan ${alumnos.cantidad} alumnos`);

// alumnos.guardar({ id: 4, titulo: "x", horas: 1 });  // ❌ no es un Alumno

/**
 * Función genérica con `keyof`: la clave debe existir en T, y el tipo
 * del resultado CAMBIA según la clave que pidas.
 */
function extraer<T, K extends keyof T>(items: T[], clave: K): T[K][] {
  return items.map((item) => item[clave]);
}

console.log("Nombres ->", extraer(alumnos.todos(), "nombre")); // string[]
console.log("Horas   ->", extraer(modulos.todos(), "horas")); // number[]
// extraer(modulos.todos(), "ciclo");   // ❌ "ciclo" no es clave de Modulo

export {};
