/**
 * 15 - ASINCRONÍA: Promesas, async/await y fetch
 *
 * Es el puente directo hacia `HttpClient` de Angular.
 *
 * Ejecutar:  npm run play -- src/15-async/demo.ts
 */

// ---------- Síncrono vs asíncrono ----------
console.log("1. Empieza el programa");

setTimeout(() => console.log("3. Esto llega después (asíncrono)"), 0);

console.log("2. Esto se ejecuta antes que el setTimeout");

// ---------- Crear una promesa ----------
// Promise<T>: es genérico. T es el tipo del valor que resolverá.
function esperar(ms: number): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (ms < 0) {
      reject(new Error("El tiempo no puede ser negativo"));
      return;
    }
    setTimeout(() => resolve(`Han pasado ${ms} ms`), ms);
  });
}

// ---------- Consumir con .then() / .catch() / .finally() ----------
esperar(100)
  .then((mensaje) => console.log("then ->", mensaje))
  .catch((error: Error) => console.error("catch ->", error.message))
  .finally(() => console.log("finally -> pase lo que pase"));

// ---------- Funciones asíncronas: async y await ----------
// await detiene SOLO la función en la que está, no el programa.
async function mostrarEspera(): Promise<void> {
  console.log("Antes del await");
  const mensaje = await esperar(200); // la función se detiene aquí
  console.log(mensaje);
}

// Una función async devuelve SIEMPRE una promesa.
async function doble(n: number): Promise<number> {
  return n * 2; // el return da un number; la función devuelve Promise<number>
}

// Gestionar los errores con try/catch
// `async` hace que la función devuelva SIEMPRE una Promise.
async function conAwait(): Promise<void> {
  try {
    const mensaje = await esperar(200); // pausa aquí hasta que resuelva
    console.log("await ->", mensaje);

    await esperar(-1); // esta rechaza
  } catch (error) {
    // El error es `unknown`: hay que comprobar el tipo antes de usarlo.
    if (error instanceof Error) {
      console.error("await catch ->", error.message);
    }
  }
}

// ---------- Secuencial vs paralelo ----------
async function secuencial(): Promise<void> {
  const inicio = Date.now();
  await esperar(150);
  await esperar(150); // espera a que acabe la anterior
  console.log(`secuencial -> ~${Date.now() - inicio} ms`);
}

async function paralelo(): Promise<void> {
  const inicio = Date.now();
  // Promise.all lanza todas a la vez y espera a la última.
  const [a, b] = await Promise.all([esperar(150), esperar(150)]);
  console.log(`paralelo -> ~${Date.now() - inicio} ms (${a} | ${b})`);
}

// Promise.allSettled: no falla aunque alguna rechace.
async function todasConResultado(): Promise<void> {
  const resultados = await Promise.allSettled([esperar(50), esperar(-1)]);
  resultados.forEach((r, i) =>
    console.log(`allSettled[${i}] -> ${r.status}`),
  );
}

// ---------- fetch tipado ----------
// Así se consume una API REST. En Angular será this.http.get<T>(url).
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function obtenerPost(id: number): Promise<Post> {
  const respuesta = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  // fetch NO lanza error con códigos 4xx/5xx: hay que comprobarlo a mano.
  if (!respuesta.ok) {
    throw new Error(`Error HTTP ${respuesta.status}`);
  }

  // `.json()` devuelve Promise<any>: `as Post` indica el tipo, pero no lo comprueba.
  return (await respuesta.json()) as Post;
}

async function demoFetch(): Promise<void> {
  try {
    const post = await obtenerPost(1);
    console.log("fetch ->", post.title);

    // Varias peticiones en paralelo
    const posts = await Promise.all([obtenerPost(2), obtenerPost(3)]);
    posts.forEach((p) => console.log(`fetch paralelo -> [${p.id}] ${p.title}`));
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error de red ->", error.message);
    }
  }
}

// ---------- Orquestar la demo ----------
// await de nivel superior (top-level await): permitido en módulos ESM.
mostrarEspera();
console.log("Esto sale antes que el mensaje");

const resultado = await doble(4);
console.log(resultado); // 8

await conAwait();
await secuencial();
await paralelo();
await todasConResultado();
await demoFetch();

/**
 * CÓMO SE TRADUCE A ANGULAR
 *
 * Angular no usa Promises para HTTP, usa Observables (RxJS):
 *
 *   // Servicio
 *   obtenerPosts(): Observable<Post[]> {
 *     return this.http.get<Post[]>('https://.../posts');
 *   }
 *
 *   // Componente
 *   this.servicio.obtenerPosts().subscribe({
 *     next: posts => this.posts = posts,
 *     error: err  => console.error(err)
 *   });
 *
 * Diferencias clave:
 *   - Promise: un único valor, se ejecuta al crearla, no se cancela.
 *   - Observable: 0..N valores, no hace nada hasta el subscribe, se cancela.
 *
 * Se puede convertir:  const posts = await firstValueFrom(this.http.get<Post[]>(url));
 */

export {};
