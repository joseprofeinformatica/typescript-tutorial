/**
 * EJERCICIO 17 — Cargar las notas desde el servidor
 * Capítulo 15 (promesas, async/await, Promise.all, fetch)
 */

interface Alumno {
  id: number;
  nombre: string;
  nota: number;
}

/**
 * 1. Simulamos el servidor con una promesa que tarda.
 *    Promise<T> es genérico: T es el tipo que resolverá.
 */
function buscarAlumno(id: number): Promise<Alumno> {
  return new Promise<Alumno>((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error(`Id no válido: ${id}`));
        return;
      }
      resolve({ id, nombre: `Alumno ${id}`, nota: 5 + (id % 5) });
    }, 120);
  });
}

// 2. Consumirla con async/await y try/catch
async function mostrarUno(): Promise<void> {
  try {
    const alumno = await buscarAlumno(3);
    console.log(`Encontrado -> ${alumno.nombre} con ${alumno.nota}`);

    await buscarAlumno(-1); // esta rechaza
  } catch (error) {
    // Lo capturado es `unknown`: hay que comprobar qué es
    if (error instanceof Error) {
      console.log(`Error controlado -> ${error.message}`);
    }
  }
}

/**
 * 3. SECUENCIAL frente a PARALELO.
 *    Si las peticiones no dependen entre sí, encadenarlas con await
 *    triplica el tiempo sin ningún motivo.
 */
async function comparar(): Promise<void> {
  const t1 = Date.now();
  await buscarAlumno(1);
  await buscarAlumno(2);
  await buscarAlumno(3);
  const secuencial = Date.now() - t1;

  const t2 = Date.now();
  const alumnos = await Promise.all([buscarAlumno(1), buscarAlumno(2), buscarAlumno(3)]);
  const paralelo = Date.now() - t2;

  console.log(`Secuencial: ~${Math.round(secuencial / 100) * 100} ms`);
  console.log(`Paralelo:   ~${Math.round(paralelo / 100) * 100} ms`);
  console.log(`Media de los 3 -> ${(alumnos.reduce((a, x) => a + x.nota, 0) / 3).toFixed(2)}`);
}

// 4. allSettled: no falla aunque alguna promesa rechace
async function tolerante(): Promise<void> {
  const resultados = await Promise.allSettled([buscarAlumno(1), buscarAlumno(-5), buscarAlumno(2)]);

  resultados.forEach((r, i) => {
    if (r.status === "fulfilled") {
      console.log(`  [${i}] OK -> ${r.value.nombre}`);
    } else {
      console.log(`  [${i}] KO -> ${(r.reason as Error).message}`);
    }
  });
}

// 5. fetch real y tipado contra una API pública
interface PostApi {
  id: number;
  title: string;
}

async function desdeApi(): Promise<void> {
  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts/1");

    // fetch NO lanza error con un 404 o un 500: hay que comprobarlo
    if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);

    const post = (await respuesta.json()) as PostApi;
    console.log(`API -> post ${post.id}: ${post.title.slice(0, 30)}…`);
  } catch (error) {
    if (error instanceof Error) console.log(`Sin conexión: ${error.message}`);
  }
}

// Top-level await: permitido porque este fichero es un módulo ESM
await mostrarUno();
await comparar();
console.log("allSettled:");
await tolerante();
await desdeApi();

export {};
