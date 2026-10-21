/**
 * EJERCICIO 18 — Decoradores para el sistema académico
 * Capítulo 16 (decoradores de clase, método, propiedad y parámetro)
 */

// 1. DECORADOR DE CLASE: se ejecuta al CARGAR el fichero, no al instanciar
function Entidad(constructor: Function): void {
  console.log(`[Entidad] registrada la clase "${constructor.name}"`);
}

/**
 * 2. DECORADOR DE MÉTODO: envuelve el método original.
 *    El patrón es siempre el mismo: guardar el original, sustituirlo
 *    por otro que hace algo antes y después, y llamar al original en medio.
 */
function Auditar(_objetivo: any, nombre: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`  [Auditar] ${nombre}(${args.join(", ")})`);
    const resultado = original.apply(this, args);
    console.log(`  [Auditar] ${nombre} devolvió ${resultado}`);
    return resultado;
  };

  return descriptor;
}

// 3. DECORADOR DE MÉTODO CON PARÁMETROS (decorator factory)
function Reintentar(veces: number) {
  return function (_objetivo: any, nombre: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      for (let intento = 1; intento <= veces; intento++) {
        try {
          return original.apply(this, args);
        } catch {
          console.log(`  [Reintentar] ${nombre} falló (intento ${intento}/${veces})`);
          if (intento === veces) return null;
        }
      }
      return null;
    };

    return descriptor;
  };
}

/**
 * 4. DECORADOR DE PROPIEDAD: intercepta lectura y escritura.
 *    Es el tipo que usa Angular para @Input().
 */
function EnRango(min: number, max: number) {
  return function (objetivo: any, nombre: string): void {
    let valor: number = min;

    Object.defineProperty(objetivo, nombre, {
      get: () => valor,
      set: (nuevo: number) => {
        if (nuevo < min || nuevo > max) {
          console.log(`  [EnRango] ${nombre}=${nuevo} fuera de [${min}, ${max}], se ignora`);
          return;
        }
        valor = nuevo;
      },
      enumerable: true,
      configurable: true,
    });
  };
}

// 5. DECORADOR DE PARÁMETRO: solo registra metadatos, no intercepta
function Obligatorio(_objetivo: any, metodo: string, indice: number): void {
  console.log(`[Obligatorio] parámetro ${indice} de ${metodo}() es obligatorio`);
}

@Entidad
class Expediente {
  @EnRango(0, 10)
  nota!: number;

  private intentos = 0;

  @Auditar
  calificar(@Obligatorio nombre: string, nota: number): string {
    this.nota = nota;
    return `${nombre}: ${this.nota >= 5 ? "APTO" : "NO APTO"}`;
  }

  // Falla las dos primeras veces y a la tercera funciona
  @Reintentar(3)
  sincronizar(): string {
    this.intentos++;
    if (this.intentos < 3) throw new Error("red caída");
    return `sincronizado al intento ${this.intentos}`;
  }
}

console.log("--- uso ---");
const exp = new Expediente();

console.log(exp.calificar("Ana Serrano", 8));
console.log(exp.calificar("Luis Gil", 4));

exp.nota = 50; // rechazado por @EnRango
console.log(`Nota final: ${exp.nota}`);

console.log(`Sincronizar -> ${exp.sincronizar()}`);

export {};
