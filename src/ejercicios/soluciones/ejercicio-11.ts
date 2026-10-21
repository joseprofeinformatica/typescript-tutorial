/**
 * EJERCICIO 11 — Contratos con interfaces
 * Capítulo 10 (interface, extends, propiedades función, declaration merging)
 */

// 1. Interfaz base
interface Persona {
  readonly id: number;
  nombre: string;
  email?: string;
}

// 2. Extender: un alumno ES una persona y además tiene sus datos
interface Alumno extends Persona {
  expediente: number;
  ciclo: "DAM" | "DAW" | "ASIR";
}

// 3. Extender de varias a la vez
interface Docente extends Persona {
  departamento: string;
}

interface Tutor extends Docente {
  grupo: string;
}

const alumna: Alumno = {
  id: 1,
  nombre: "Ana Serrano",
  expediente: 1001,
  ciclo: "DAM",
};

const tutor: Tutor = {
  id: 50,
  nombre: "Carlos Mendoza",
  email: "jose@ies.es",
  departamento: "Informática",
  grupo: "DAM2",
};

console.log(`Alumna: ${alumna.nombre} (${alumna.ciclo}), expediente ${alumna.expediente}`);
console.log(`Tutor:  ${tutor.nombre}, ${tutor.departamento}, grupo ${tutor.grupo}`);

/**
 * 4. Propiedad de tipo función: la interfaz describe QUÉ debe saber hacer
 *    un objeto, no CÓMO lo hace.
 *    En la interfaz el parámetro lleva su tipo (sin él: error TS7006).
 */
interface Calculadora {
  media: (notas: number[]) => number;
}

const calculadora: Calculadora = {
  // El tipo de `notas` se deduce de la interfaz: no hay que repetirlo
  media: (notas) => notas.reduce((acc, n) => acc + n, 0) / notas.length,
};

console.log(`Media -> ${calculadora.media([7, 8, 9]).toFixed(2)}`);

/**
 * 5. Declaration merging: dos interfaces con el mismo nombre se FUSIONAN.
 *    Los `type` no pueden hacer esto.
 *
 * ⚠️ OJO: la fusión afecta a TODO el fichero, no solo de aquí en adelante.
 *    Si añadiésemos `fechaAlta: Date` a la interfaz Alumno de arriba,
 *    el objeto `alumna` (declarado antes) dejaría de compilar.
 *    Por eso aquí se usa otra interfaz distinta.
 */
interface Matricula {
  curso: string;
}

interface Matricula {
  confirmada: boolean;
}

// Matricula ahora exige las dos propiedades, vengan de donde vengan
const matricula: Matricula = { curso: "2024/25", confirmada: true };
console.log(`Matrícula ${matricula.curso} confirmada: ${matricula.confirmada}`);

/**
 * Esto sirve para ampliar tipos de una librería sin tocar su código.
 * Con `type` sería imposible: daría "Duplicate identifier".
 */

export {};
