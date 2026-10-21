/**
 * EJERCICIO 10 — Estados de la matrícula
 * Capítulo 09 (enum y unión de literales)
 */

// --- OPCIÓN A: enum de cadenas ---
enum EstadoMatricula {
  Preinscrita = "PREINSCRITA",
  Confirmada = "CONFIRMADA",
  Anulada = "ANULADA",
}

function mensaje(estado: EstadoMatricula): string {
  switch (estado) {
    case EstadoMatricula.Preinscrita:
      return "Pendiente de confirmar el pago";
    case EstadoMatricula.Confirmada:
      return "Matrícula en vigor";
    case EstadoMatricula.Anulada:
      return "Matrícula anulada";
  }
}

console.log(`enum -> ${EstadoMatricula.Confirmada}: ${mensaje(EstadoMatricula.Confirmada)}`);
console.log("enum, todos los valores ->", Object.values(EstadoMatricula));

// --- OPCIÓN B: unión de literales (lo habitual hoy en Angular) ---
type Estado = "PREINSCRITA" | "CONFIRMADA" | "ANULADA";

const estadoActual: Estado = "PREINSCRITA";
console.log(`unión -> ${estadoActual}`);

/**
 * La unión NO genera código: desaparece al transpilar.
 * A cambio, no se puede recorrer con Object.values().
 */

/**
 * POR QUÉ NO USAR ENUM NUMÉRICO.
 * Si el estado se guarda como número y alguien inserta un valor
 * al principio, todos los datos antiguos cambian de significado
 * sin que el compilador diga nada.
 */
enum EstadoV1 {
  Preinscrita, // 0
  Confirmada, // 1
  Anulada, // 2
}

const guardadoEnBD = 1; // significaba "Confirmada"
console.log(`V1: el ${guardadoEnBD} es ${EstadoV1[guardadoEnBD]}`);

enum EstadoV2 {
  Borrador, // 0  <-- insertado después
  Preinscrita, // 1
  Confirmada, // 2
  Anulada, // 3
}
console.log(`V2: el mismo ${guardadoEnBD} ahora es ${EstadoV2[guardadoEnBD]} ❌`);

// Recuento de matrículas por estado
const matriculas: Estado[] = [
  "CONFIRMADA",
  "PREINSCRITA",
  "CONFIRMADA",
  "ANULADA",
  "CONFIRMADA",
];

const recuento = matriculas.reduce<Record<Estado, number>>(
  (acc, e) => {
    acc[e]++;
    return acc;
  },
  { PREINSCRITA: 0, CONFIRMADA: 0, ANULADA: 0 },
);
console.log("Recuento ->", recuento);

export {};
