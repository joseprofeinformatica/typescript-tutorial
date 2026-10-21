/**
 * SERVICIO — la lógica. Estructuralmente, un servicio de Angular
 * sin el decorador @Injectable.
 */

// `import type` importa SOLO tipos: desaparece al transpilar.
import type { Alumno, Ciclo } from "../modelos/alumno.model";

// Import normal: son valores que existen en tiempo de ejecución.
import { estaAprobado } from "../modelos/alumno.model";
import { conDecimales } from "../utilidades/formato";

export class AlumnoService {
  private alumnos: Alumno[] = [];

  alta(nombre: string, ciclo: Ciclo, nota: number): Alumno {
    const alumno: Alumno = { id: this.alumnos.length + 1, nombre, ciclo, nota };
    this.alumnos.push(alumno);
    return alumno;
  }

  // Devuelve una copia: nadie puede modificar el array interno
  listar(): Alumno[] {
    return [...this.alumnos];
  }

  porCiclo(ciclo: Ciclo): Alumno[] {
    return this.alumnos.filter((a) => a.ciclo === ciclo);
  }

  aprobados(): Alumno[] {
    return this.alumnos.filter(estaAprobado);
  }

  mediaFormateada(): string {
    if (this.alumnos.length === 0) return "0.00";
    const suma = this.alumnos.reduce((acc, a) => acc + a.nota, 0);
    return conDecimales(suma / this.alumnos.length);
  }
}
