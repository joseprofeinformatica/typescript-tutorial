/**
 * MODELOS — solo tipos y constantes del dominio.
 * En Angular sería src/app/modelos/alumno.model.ts
 */

export type Ciclo = "DAM" | "DAW" | "ASIR";

export interface Alumno {
  id: number;
  nombre: string;
  ciclo: Ciclo;
  nota: number;
}

export const NOTA_APROBADO = 5;

export function estaAprobado(alumno: Alumno): boolean {
  return alumno.nota >= NOTA_APROBADO;
}
