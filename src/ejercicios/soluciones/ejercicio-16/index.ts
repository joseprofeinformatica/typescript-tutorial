/**
 * EJERCICIO 16 — Repartir el código en módulos
 * Capítulo 14 (import / export, import type, barrel files)
 *
 * Ejecutar: npm run play -- src/ejercicios/soluciones/ejercicio-16/index.ts
 */

// Import desde el BARREL: no hace falta la ruta completa al fichero
import { AlumnoService } from "./servicios";

// Import solo de tipos (desaparece en el JavaScript generado)
import type { Alumno, Ciclo } from "./modelos/alumno.model";

// Import de valores
import { NOTA_APROBADO } from "./modelos/alumno.model";

// Import con nombre y renombrado
import { capitalizar, iniciales as siglasDe } from "./utilidades/formato";

const servicio = new AlumnoService();
servicio.alta("ana serrano", "DAM", 8.5);
servicio.alta("luis gil", "DAW", 4);
servicio.alta("marta ruiz", "DAM", 9.25);

const todos: Alumno[] = servicio.listar();

todos.forEach((a) => {
  console.log(`${siglasDe(a.nombre)} ${capitalizar(a.nombre)} — ${a.ciclo} — ${a.nota}`);
});

const ciclo: Ciclo = "DAM";
console.log(
  `De ${ciclo} ->`,
  servicio.porCiclo(ciclo).map((a) => capitalizar(a.nombre)),
);

console.log(`Nota de aprobado: ${NOTA_APROBADO}`);
console.log(`Aprobados: ${servicio.aprobados().length} de ${todos.length}`);
console.log(`Media del grupo: ${servicio.mediaFormateada()}`);

// La copia protege el estado interno del servicio
todos.push({ id: 99, nombre: "intruso", ciclo: "ASIR", nota: 10 });
console.log(`Tras intentar colar un alumno: el servicio sigue con ${servicio.listar().length}`);

export {};
