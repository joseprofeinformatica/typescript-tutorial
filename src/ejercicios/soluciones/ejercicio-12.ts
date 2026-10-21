/**
 * EJERCICIO 12 — El expediente como clase
 * Capítulo 11 (encapsulación, getters/setters, estáticos)
 */

class Expediente {
  // Atajo del constructor: declara Y asigna. Es lo que verás en Angular.
  constructor(
    public readonly numero: number,
    public nombre: string,
    private notas: number[] = [],
  ) {}

  // Contador compartido por TODAS las instancias
  private static creados = 0;

  static registrar(nombre: string): Expediente {
    Expediente.creados++;
    return new Expediente(1000 + Expediente.creados, nombre);
  }

  static get total(): number {
    return Expediente.creados;
  }

  /**
   * El array de notas es privado: nadie puede meter un 15 desde fuera.
   * La única vía de entrada valida el dato.
   */
  anadirNota(nota: number): void {
    if (nota < 0 || nota > 10) {
      throw new Error(`Nota fuera de rango: ${nota}`);
    }
    this.notas.push(nota);
  }

  // Getter: se usa SIN paréntesis, como si fuera una propiedad
  get media(): number {
    if (this.notas.length === 0) return 0;
    return this.notas.reduce((a, n) => a + n, 0) / this.notas.length;
  }

  get calificacion(): string {
    const m = this.media;
    if (m >= 9) return "Sobresaliente";
    if (m >= 7) return "Notable";
    if (m >= 5) return "Suficiente";
    return "Insuficiente";
  }

  // Devuelve una COPIA: así nadie modifica el array interno
  get historial(): number[] {
    return [...this.notas];
  }
}

const ana = Expediente.registrar("Ana Serrano");
ana.anadirNota(8);
ana.anadirNota(9.5);
ana.anadirNota(7);

console.log(`Expediente ${ana.numero} — ${ana.nombre}`);
console.log(`Notas: ${ana.historial.join(", ")}`);
console.log(`Media: ${ana.media.toFixed(2)} (${ana.calificacion})`);

const luis = Expediente.registrar("Luis Gil");
luis.anadirNota(4);
console.log(`Expediente ${luis.numero} — ${luis.nombre}: ${luis.calificacion}`);

console.log(`Expedientes creados: ${Expediente.total}`);

// La encapsulación protege los datos:
try {
  ana.anadirNota(15);
} catch (error) {
  if (error instanceof Error) console.log(`Rechazado -> ${error.message}`);
}

// Modificar la copia no afecta al original
const copia = ana.historial;
copia.push(10);
console.log(`Historial real tras tocar la copia: ${ana.historial.length} notas`);

// ana.notas.push(15);   // ❌ Error: 'notas' is private
// ana.numero = 9999;    // ❌ Error: 'numero' is readonly

export {};
