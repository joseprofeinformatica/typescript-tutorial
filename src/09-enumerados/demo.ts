/**
 * 09 - ENUMERADOS (enum)
 *
 * Ejecutar:  npm run play -- src/09-enumerados/demo.ts
 */

// ---------- enum numérico ----------
// Si no asignas valores, empieza en 0 y va sumando 1.
enum Dia {
  Lunes, // 0
  Martes, // 1
  Miercoles, // 2
  Jueves, // 3
  Viernes, // 4
}

console.log("Dia.Miercoles ->", Dia.Miercoles); // 2
console.log("Dia[2]        ->", Dia[2]); // "Miercoles"  (mapeo inverso)

// ---------- Numeración personalizada ----------
enum CodigoHttp {
  Ok = 200,
  Creado = 201,
  NoAutorizado = 401,
  NoEncontrado = 404,
  ErrorServidor = 500,
}
console.log("CodigoHttp.NoEncontrado ->", CodigoHttp.NoEncontrado);

// Si asignas solo el primero, los siguientes continúan la cuenta.
enum Nivel {
  Bajo = 1,
  Medio, // 2
  Alto, // 3
}
console.log("Nivel.Alto ->", Nivel.Alto);

// ---------- enum de cadenas ----------
// Más legible al depurar: el valor se ve tal cual en logs y en la API.
enum EstadoPedido {
  Pendiente = "PENDIENTE",
  Enviado = "ENVIADO",
  Entregado = "ENTREGADO",
}

const estado: EstadoPedido = EstadoPedido.Enviado;
console.log("EstadoPedido ->", estado); // "ENVIADO"

// Los enum de cadenas NO tienen mapeo inverso.

// ---------- Uso en switch ----------
function mensajeEstado(e: EstadoPedido): string {
  switch (e) {
    case EstadoPedido.Pendiente:
      return "Tu pedido se está preparando";
    case EstadoPedido.Enviado:
      return "Tu pedido va de camino";
    case EstadoPedido.Entregado:
      return "Pedido entregado";
  }
}
console.log(mensajeEstado(estado));

// ---------- Recorrer un enum de cadenas ----------
console.log("Valores ->", Object.values(EstadoPedido));

// ---------- EL PELIGRO DE LOS ENUM NUMÉRICOS ----------
/**
 * Este es el motivo principal por el que hoy se prefieren las uniones de literales.
 * Supón que guardas el estado de un ticket como NÚMERO en la base de datos.
 */
enum EstadoTicket {
  Abierto, // 0
  EnProgreso, // 1
  Cerrado, // 2
}

const estadoDesdeDB = 1; // este 1 viene de la base de datos

// Usamos el mapeo inverso para saber qué significa
console.log("EstadoTicket[1] ->", EstadoTicket[estadoDesdeDB]); // "EnProgreso" ✅

/**
 * Meses después, alguien añade un estado nuevo AL PRINCIPIO.
 * Parece inofensivo: solo se ha insertado una línea.
 */
enum EstadoTicketV2 {
  Urgente, // 0   <-- nuevo
  Pendiente, // 1   <-- antes era "Abierto"
  EnProgreso, // 2   <-- antes era 1
  Cerrado, // 3
}

// El código anterior sigue compilando SIN UN SOLO ERROR, pero ya está roto:
console.log("EstadoTicketV2[1] ->", EstadoTicketV2[estadoDesdeDB]); // "Pendiente" ❌

/**
 * Todos los tickets que estaban "EnProgreso" pasan a interpretarse como
 * "Pendiente" y nadie se entera. Es un bug silencioso de lógica de negocio.
 */

// Con una unión de literales el problema no existe: valor y nombre son lo mismo.
type EstadoTicketType = "urgente" | "pendiente" | "en-progreso" | "cerrado";

const estadoSeguro: EstadoTicketType = "en-progreso"; // el valor es descriptivo

if (estadoSeguro === "en-progreso") {
  console.log("union de literales -> sigue funcionando tras añadir estados ✅");
}

// ---------- enum vs union de literales ----------
/**
 * enum:
 *   - genera código JavaScript real (un objeto en tiempo de ejecución)
 *   - permite mapeo inverso (solo los numéricos)
 *   - se puede recorrer con Object.values()
 *
 * union de literales:
 *   - NO genera código: desaparece al transpilar (cuesta 0 bytes)
 *   - se escribe directamente el string: estado = "ENVIADO"
 *   - es lo que más se usa hoy en proyectos Angular modernos
 */
type EstadoPedidoUnion = "PENDIENTE" | "ENVIADO" | "ENTREGADO";

const estado2: EstadoPedidoUnion = "ENTREGADO";
console.log("Union de literales ->", estado2);

export {};
