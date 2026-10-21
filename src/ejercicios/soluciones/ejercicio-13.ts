/**
 * EJERCICIO 13 — Jerarquía del personal del centro
 * Capítulo 11 (clases abstractas, herencia, override, polimorfismo)
 */

/**
 * Clase abstracta: no se puede instanciar.
 * Define lo común y OBLIGA a las hijas a completar lo que falta.
 */
abstract class MiembroComunidad {
  constructor(
    public readonly id: number,
    public nombre: string,
  ) {}

  // Sin cuerpo: cada hija lo resuelve a su manera
  abstract get rol(): string;
  abstract horasSemanales(): number;

  // Concreto: se hereda tal cual y usa los métodos abstractos
  presentarse(): string {
    return `${this.nombre} (${this.rol}) — ${this.horasSemanales()} h/semana`;
  }
}

class Alumno extends MiembroComunidad {
  constructor(
    id: number,
    nombre: string,
    private modulos: number,
  ) {
    super(id, nombre); // obligatorio antes de usar `this`
  }

  override get rol(): string {
    return "Alumno";
  }

  override horasSemanales(): number {
    return this.modulos * 4;
  }
}

class Docente extends MiembroComunidad {
  constructor(
    id: number,
    nombre: string,
    protected grupos: number,
  ) {
    super(id, nombre);
  }

  override get rol(): string {
    return "Docente";
  }

  override horasSemanales(): number {
    return 18 + this.grupos * 2;
  }
}

/**
 * Tres niveles de herencia. `override` es obligatorio en este proyecto
 * y en Angular ("noImplicitOverride"): avisa si el padre cambia el método.
 */
class Tutor extends Docente {
  constructor(
    id: number,
    nombre: string,
    grupos: number,
    private grupoTutorizado: string,
  ) {
    super(id, nombre, grupos);
  }

  override get rol(): string {
    return `Tutor de ${this.grupoTutorizado}`;
  }

  // super.x() llama a la versión del padre y le suma lo propio
  override horasSemanales(): number {
    return super.horasSemanales() + 3;
  }
}

// const x = new MiembroComunidad(1, "Nadie");  // ❌ no se puede instanciar

/**
 * POLIMORFISMO: un array de la clase base, pero cada elemento
 * ejecuta SU propia versión de rol() y horasSemanales().
 */
const comunidad: MiembroComunidad[] = [
  new Alumno(1, "Ana Serrano", 5),
  new Docente(50, "Marta Ruiz", 3),
  new Tutor(51, "Carlos Mendoza", 3, "DAM2"),
];

comunidad.forEach((m) => console.log(m.presentarse()));

// El código que recorre no necesita saber de qué clase es cada uno
const totalHoras = comunidad.reduce((acc, m) => acc + m.horasSemanales(), 0);
console.log(`Total de horas de la comunidad: ${totalHoras}`);

// Si hace falta distinguir, se usa instanceof
const soloDocentes = comunidad.filter((m) => m instanceof Docente);
console.log(`Docentes (incluidos tutores): ${soloDocentes.length}`);

export {};
