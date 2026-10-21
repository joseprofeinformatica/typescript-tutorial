/**
 * EJERCICIO 15 — Un modelo, muchas vistas
 * Capítulo 13 (Partial, Pick, Omit, Record, ReturnType)
 */

interface Alumno {
  id: number;
  nombre: string;
  email: string;
  password: string;
  ciclo: "DAM" | "DAW" | "ASIR";
  activo: boolean;
}

const ana: Alumno = {
  id: 1,
  nombre: "Ana Serrano",
  email: "ana@ies.es",
  password: "secreta",
  ciclo: "DAM",
  activo: true,
};

/**
 * La idea del capítulo: se declara el modelo UNA vez y todo lo demás
 * se DERIVA. Si mañana añades un campo a Alumno, todos los tipos
 * derivados se actualizan solos.
 */

// 1. Lo que se envía al crear: todo menos el id, que lo genera el servidor
type NuevoAlumno = Omit<Alumno, "id">;

const nuevo: NuevoAlumno = {
  nombre: "Luis Gil",
  email: "luis@ies.es",
  password: "1234",
  ciclo: "DAW",
  activo: true,
};
console.log("Alta ->", nuevo.nombre, nuevo.ciclo);

// 2. Lo que devuelve la API: todo menos la contraseña
type AlumnoPublico = Omit<Alumno, "password">;

function aPublico(a: Alumno): AlumnoPublico {
  const { password, ...resto } = a; // se extrae password y el resto se queda
  return resto;
}
console.log("Público ->", aPublico(ana));

// 3. Lo que se muestra en el listado: solo dos campos
type FilaListado = Pick<Alumno, "id" | "nombre">;

const listado: FilaListado[] = [
  { id: 1, nombre: "Ana Serrano" },
  { id: 2, nombre: "Luis Gil" },
];
console.log("Listado ->", listado);

// 4. Edición parcial: llegan solo los campos que cambian
function actualizar(original: Alumno, cambios: Partial<Alumno>): Alumno {
  return { ...original, ...cambios };
}
const editada = actualizar(ana, { email: "ana.serrano@ies.es", activo: false });
console.log(`Editada -> ${editada.email}, activa: ${editada.activo}`);

// 5. Record: tabla de permisos con claves cerradas.
//    Si añades un rol a la unión, el compilador te obliga a definirlo.
type Rol = "alumno" | "docente" | "secretaria";

const permisos: Record<Rol, string[]> = {
  alumno: ["ver-notas"],
  docente: ["ver-notas", "poner-notas"],
  secretaria: ["ver-notas", "matricular", "anular"],
};
console.log("Permisos docente ->", permisos.docente);

// 6. Agrupar alumnos por ciclo con Record
type Ciclo = Alumno["ciclo"]; // indexed access: extrae el tipo de una propiedad

const porCiclo: Record<Ciclo, string[]> = { DAM: [], DAW: [], ASIR: [] };
[ana, { ...nuevo, id: 2 } as Alumno].forEach((a) => porCiclo[a.ciclo].push(a.nombre));
console.log("Por ciclo ->", porCiclo);

// 7. ReturnType: nombrar lo que ya devuelve una función, sin repetirlo
function generarCredenciales(a: Alumno) {
  return { usuario: a.email.split("@")[0], expira: 30 };
}
type Credenciales = ReturnType<typeof generarCredenciales>;

const cred: Credenciales = generarCredenciales(ana);
console.log(`Credenciales -> ${cred.usuario}, expira en ${cred.expira} días`);

// 8. Formulario de edición: id obligatorio, el resto opcional, sin password
type FormularioEdicion = Pick<Alumno, "id"> & Partial<Omit<Alumno, "id" | "password">>;

const form: FormularioEdicion = { id: 1, ciclo: "ASIR" };
console.log("Formulario ->", form);

export {};
