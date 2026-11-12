/**
 * EJERCICIO 17 — Las tareas del servidor
 * Capítulo 15 (async/await, fetch, try/catch, Promise.all)
 */

// 1. Lo que devuelve la API (en inglés) y cómo lo queremos en la aplicación
interface TareaApi {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
}

// 2. Función asíncrona: pide las tareas de un usuario y las mapea a nuestra interfaz
async function obtenerTareas(usuario: number): Promise<Tarea[]> {
  const respuesta = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${usuario}`);

  // fetch NO lanza error con un 404 o un 500: hay que comprobarlo a mano
  if (!respuesta.ok) {
    throw new Error(`Error HTTP ${respuesta.status}`);
  }

  // .json() no conoce la forma de los datos: `as` indica el tipo, pero no lo comprueba
  const datos = (await respuesta.json()) as TareaApi[];

  // Mapeo: cada TareaApi se convierte en una Tarea
  return datos.map((t) => ({ id: t.id, titulo: t.title, completada: t.completed }));
}

// 3-6. Programa principal. Todo dentro de try/catch: la red puede fallar
try {
  const tareas = await obtenerTareas(1);

  // 3. Recuento
  const completadas = tareas.filter((t) => t.completada);
  const porcentaje = (completadas.length / tareas.length) * 100;
  console.log(`Usuario 1: ${tareas.length} tareas`);
  console.log(`Completadas: ${completadas.length} (${porcentaje.toFixed(1)} %)`);
  console.log(`Pendientes: ${tareas.length - completadas.length}`);

  // 4. Las tres primeras pendientes
  console.log("Primeras pendientes:");
  tareas
    .filter((t) => !t.completada)
    .slice(0, 3)
    .forEach((t) => console.log(`  - ${t.titulo}`));

  // 5. El título más largo, con reduce
  const masLarga = tareas.reduce((max, t) => (t.titulo.length > max.titulo.length ? t : max));
  console.log(`Título más largo: ${masLarga.titulo}`);

  // 6. Dos peticiones a la vez: no dependen una de otra
  const [deUno, deDos] = await Promise.all([obtenerTareas(1), obtenerTareas(2)]);
  const contar = (lista: Tarea[]): number => lista.filter((t) => t.completada).length;
  console.log(`Completadas -> usuario 1: ${contar(deUno)} | usuario 2: ${contar(deDos)}`);
} catch (error) {
  // Lo capturado es `unknown`: hay que comprobar qué es
  if (error instanceof Error) {
    console.log(`No se pudieron cargar las tareas: ${error.message}`);
  }
}

export {};
