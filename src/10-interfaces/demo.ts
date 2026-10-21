/**
 * 10 - INTERFACES
 *
 * Ejecutar:  npm run play -- src/10-interfaces/demo.ts
 */

// ---------- Declaración ----------
interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

const usuario: Usuario = { id: 1, nombre: "Ana", email: "ana@mail.com" };
console.log("Usuario ->", usuario);

// ---------- Opcionales `?` y `readonly` ----------
interface Producto {
  readonly id: number; // no se puede reasignar tras crear el objeto
  nombre: string;
  descripcion?: string; // puede no venir
  precio: number;
}

const producto: Producto = { id: 10, nombre: "Teclado", precio: 49.9 };
producto.precio = 39.9;
// producto.id = 11;   // Error: Cannot assign to 'id' because it is a read-only property.
console.log("Producto ->", producto, "| desc:", producto.descripcion ?? "sin descripción");

// ---------- Extender interfaces ----------
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

const emp: EmpleadoCompleto = {
  nombre: "Marta",
  edad: 30,
  empresa: "Acme",
  salario: 32000,
  fechaAlta: new Date("2024-09-01"),
};
console.log("EmpleadoCompleto ->", emp.nombre, emp.empresa, emp.fechaAlta.getFullYear());

// ---------- Declaration merging ----------
// Dos interfaces con el MISMO nombre se fusionan. Los `type` no pueden hacer esto.
interface Ventana {
  titulo: string;
}
interface Ventana {
  ancho: number;
}
// Ventana ahora exige titulo Y ancho
const v: Ventana = { titulo: "Panel", ancho: 800 };
console.log("Declaration merging ->", v);

// ---------- Propiedades de tipo función ----------
interface Calculadora {
  // Dos sintaxis equivalentes:
  sumar(a: number, b: number): number; // sintaxis de método
  restar: (a: number, b: number) => number; // propiedad con tipo función
}

const calc: Calculadora = {
  sumar: (a, b) => a + b, // los tipos se infieren de la interfaz
  restar: (a, b) => a - b,
};
console.log("calc ->", calc.sumar(2, 3), calc.restar(9, 4));

// ---------- type vs interface ----------
/**
 * interface:
 *   - solo describe la forma de OBJETOS y funciones
 *   - se puede extender (extends) y fusionar (declaration merging)
 *   - convención en Angular para modelos de datos (DTOs de la API)
 *
 * type:
 *   - puede describir CUALQUIER tipo: unions, intersections, primitivos, tuplas...
 *   - no se fusiona
 *
 * Regla práctica: interface para la forma de un objeto, type para todo lo demás.
 */

// Esto SOLO se puede hacer con type:
type Id = number | string;
type Punto = [number, number];
const id: Id = "abc";
const punto: Punto = [1, 2];
console.log("type para unions y tuplas ->", id, punto);

export {};
