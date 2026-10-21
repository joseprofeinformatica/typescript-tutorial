/**
 * 11 - CLASES Y PROGRAMACIÓN ORIENTADA A OBJETOS
 *
 * Ejecutar:  npm run play -- src/11-clases/demo.ts
 */

// ---------- Declaración e instanciación ----------
// Con `strict`, toda propiedad necesita un valor desde que se hace `new`.
// Coche usa las tres formas de dárselo:
class Coche {
  marca: string; // se asigna en el constructor
  modelo: string; // se asigna en el constructor
  kilometros: number = 0; // valor inicial en la declaración
  matricula?: string; // opcional: puede quedarse sin valor

  constructor(marca: string, modelo: string) {
    this.marca = marca;
    this.modelo = modelo;
  }

  conducir(km: number): void {
    this.kilometros += km;
  }

  describir(): string {
    return `${this.marca} ${this.modelo}, ${this.kilometros} km, matrícula ${this.matricula ?? "pendiente"}`;
  }
}

const coche = new Coche("Seat", "Ibiza");
coche.conducir(120);
coche.conducir(35);
console.log("describir ->", coche.describir());

coche.matricula = "1234ABC";
console.log("con matrícula ->", coche.describir());

// Si quitas el `= 0` de kilometros:
// error TS2564: Property 'kilometros' has no initializer and is not definitely assigned in the constructor.

// ---------- Atajo del constructor (parameter properties) ----------
// Declara y asigna la propiedad en un solo paso. Es lo que verás en los
// servicios de Angular:  constructor(private http: HttpClient) {}
class Moto {
  constructor(
    public marca: string,
    public cilindrada: number,
    private readonly bastidor: string = "VF1-000",
  ) {}

  ficha(): string {
    return `${this.marca} ${this.cilindrada}cc (bastidor ${this.bastidor})`;
  }
}
console.log("parameter properties ->", new Moto("Honda", 125).ficha());

// ---------- Modificadores de acceso ----------
class CuentaBancaria {
  public titular: string; // accesible desde cualquier sitio (por defecto)
  protected saldo: number; // accesible en la clase y en sus hijas
  private pin: string; // accesible SOLO dentro de esta clase

  constructor(titular: string, saldoInicial: number, pin: string) {
    this.titular = titular;
    this.saldo = saldoInicial;
    this.pin = pin;
  }

  ingresar(cantidad: number): void {
    if (cantidad <= 0) throw new Error("La cantidad debe ser positiva");
    this.saldo += cantidad;
  }

  consultar(pin: string): number {
    return this.validar(pin) ? this.saldo : -1;
  }

  private validar(pin: string): boolean {
    return this.pin === pin;
  }
}

const cuenta = new CuentaBancaria("Ana", 1000, "1234");
cuenta.ingresar(500);
console.log("saldo con pin correcto ->", cuenta.consultar("1234"));
console.log("saldo con pin erróneo  ->", cuenta.consultar("0000"));
// cuenta.saldo;        // Error: 'saldo' is protected.
// cuenta.validar("x"); // Error: 'validar' is private.

// ---------- Getters y setters ----------
class Temperatura {
  private _celsius = 0;

  get celsius(): number {
    return this._celsius;
  }

  set celsius(valor: number) {
    if (valor < -273.15) throw new Error("Por debajo del cero absoluto");
    this._celsius = valor;
  }

  get fahrenheit(): number {
    return this._celsius * 1.8 + 32;
  }
}

const t = new Temperatura();
t.celsius = 25; // llama al setter, sin paréntesis
console.log(`${t.celsius}ºC son ${t.fahrenheit}ºF`); // llama a los getters

// ---------- Miembros estáticos ----------
class Matematicas {
  static readonly PI = 3.1416;

  static areaCirculo(radio: number): number {
    return Matematicas.PI * radio ** 2;
  }
}
console.log("static ->", Matematicas.areaCirculo(2)); // sin `new`

// ---------- Herencia ----------
class Vehiculo {
  constructor(public marca: string) {}

  arrancar(): string {
    return `${this.marca} arrancando`;
  }
}

class Electrico extends Vehiculo {
  constructor(
    marca: string,
    public autonomia: number,
  ) {
    super(marca); // obligatorio antes de usar `this`
  }

  // "noImplicitOverride" (activo aquí y en Angular) exige la palabra `override`
  override arrancar(): string {
    return `${super.arrancar()} en silencio (${this.autonomia} km)`;
  }
}
console.log("herencia ->", new Electrico("Tesla", 500).arrancar());

// ---------- Implementar interfaces ----------
interface Imprimible {
  imprimir(): void;
}

interface Serializable {
  aJson(): string;
}

class Factura implements Imprimible, Serializable {
  constructor(
    private numero: string,
    private importe: number,
  ) {}

  imprimir(): void {
    console.log(`Factura ${this.numero}: ${this.importe} €`);
  }

  aJson(): string {
    return JSON.stringify({ numero: this.numero, importe: this.importe });
  }
}

const factura = new Factura("F-2025-001", 121);
factura.imprimir();
console.log("aJson ->", factura.aJson());

// ---------- Clases abstractas ----------
// No se pueden instanciar: sirven de plantilla para sus hijas.
abstract class Figura {
  constructor(public nombre: string) {}

  abstract area(): number; // sin cuerpo: la hija está OBLIGADA a implementarlo

  describir(): string {
    // método concreto: se hereda tal cual
    return `${this.nombre} tiene un área de ${this.area().toFixed(2)}`;
  }
}

class Circulo extends Figura {
  constructor(private radio: number) {
    super("Círculo");
  }
  override area(): number {
    return Math.PI * this.radio ** 2;
  }
}

class Rectangulo extends Figura {
  constructor(
    private base: number,
    private altura: number,
  ) {
    super("Rectángulo");
  }
  override area(): number {
    return this.base * this.altura;
  }
}

// new Figura("x");   // Error: Cannot create an instance of an abstract class.

// ---------- Polimorfismo ----------
// Una misma llamada hace cosas distintas según el objeto que haya detrás.

// Con una clase base (aquí, abstracta)
const figuras: Figura[] = [new Circulo(3), new Rectangulo(4, 5)];
figuras.forEach((f) => console.log("polimorfismo ->", f.describir()));

// Con herencia normal: Electrico sobrescribe arrancar()
const flota: Vehiculo[] = [new Vehiculo("Seat"), new Electrico("Tesla", 500)];
flota.forEach((v) => console.log("flota ->", v.arrancar()));

// Con interfaces: Ticket y Factura no tienen ningún padre en común
class Ticket implements Imprimible {
  constructor(
    private caja: number,
    private total: number,
  ) {}

  imprimir(): void {
    console.log(`Ticket de la caja ${this.caja}: ${this.total.toFixed(2)} €`);
  }
}

const documentos: Imprimible[] = [new Factura("F-2025-001", 121), new Ticket(2, 8.5)];
documentos.forEach((d) => d.imprimir());

// Para qué sirve: esta función vale para figuras que todavía no existen
function areaTotal(lista: Figura[]): number {
  return lista.reduce((acc, f) => acc + f.area(), 0);
}

class Triangulo extends Figura {
  constructor(
    private base: number,
    private altura: number,
  ) {
    super("Triángulo");
  }
  override area(): number {
    return (this.base * this.altura) / 2;
  }
}

figuras.push(new Triangulo(6, 2)); // areaTotal no cambia ni una línea
console.log(`área total -> ${areaTotal(figuras).toFixed(2)}`);

// Lo que se pierde: a través de Figura no se ve lo propio de cada clase
// figuras[0].radio;   // Error: Property 'radio' does not exist on type 'Figura'.
const circulos = figuras.filter((f) => f instanceof Circulo).length;
console.log(`instanceof -> círculos: ${circulos} de ${figuras.length}`);

export {};
