/**
 * UTILIDADES — funciones sueltas, sin estado.
 */

export function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

export function conDecimales(n: number, decimales = 2): string {
  return n.toFixed(decimales);
}

// Lo que NO se exporta es privado del fichero: nadie más puede usarlo.
function siglas(texto: string): string {
  return texto
    .split(" ")
    .map((p) => p[0])
    .join("");
}

export function iniciales(nombreCompleto: string): string {
  return siglas(nombreCompleto).toUpperCase();
}
