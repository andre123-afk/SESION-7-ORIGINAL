// SESIÓN 1.7 - Manipulación Avanzada del DOM
// Proyecto base para estudiantes

const btnCargar = document.querySelector("#btn-cargar");
const btnAgregarFinal = document.querySelector("#btn-agregar-final");
const btnAgregarInicio = document.querySelector("#btn-agregar-inicio");
const btnAviso = document.querySelector("#btn-aviso");
const btnResumen = document.querySelector("#btn-resumen");
const btnReemplazarPrimera = document.querySelector("#btn-reemplazar-primera");

const resumen = document.querySelector("#resumen");
const panelEquipos = document.querySelector("#panel-equipos");
const listaEquipos = document.querySelector("#lista-equipos");

function crearTarjetaEquipo(equipo) {
  // TODO 1: crear un article con document.createElement("article")
  const article = document.createElement("article");
  
  // TODO 2: agregar la clase card-equipo
  article.classList.add("card-equipo");
  
  // TODO 3: si equipo.destacado es true, agregar la clase destacado
  if (equipo.destacado) {
    article.classList.add("destacado");
  }
  
  // TODO 4: crear h3 y párrafos con createElement()
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  
  // TODO 5: asignar contenido con textContent
  h3.textContent = equipo.nombre;
  p.textContent = equipo.detalle;
  
  // TODO 6: crear botón eliminar
  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  
  // TODO 7: al hacer clic, eliminar la tarjeta usando parentElement y remove()
  btnEliminar.addEventListener("click", () => {
    const tarjeta = btnEliminar.parentElement;
    tarjeta.remove();
  });
  
  // TODO 8: agregar los elementos internos con append()
  article.append(h3, p, btnEliminar);
  
  // TODO 9: retornar la tarjeta
  return article;
}

async function cargarEquipos() {
  try {
    // TODO: usar fetch("data/equipos.json")
    const respuesta = await fetch("data/equipos.json");
    
    // TODO: convertir la respuesta con .json()
    const datos = await respuesta.json();
    
    // TODO: limpiar el contenedor con replaceChildren()
    listaEquipos.replaceChildren();
    
    // TODO: recorrer datos.equipos y crear tarjetas
    datos.equipos.forEach(equipo => {
      const tarjeta = crearTarjetaEquipo(equipo);
      // TODO: insertar cada tarjeta con append()
      listaEquipos.append(tarjeta);
    });
    
    // TODO: actualizar el resumen
    actualizarResumen();
  } catch (error) {
    console.error("Error al cargar equipos:", error);
  }
}

function agregarEquipoAlFinal() {
  // TODO: crear un objeto equipo de prueba
  const equipoPrueba = {
    nombre: "Equipo Final",
    detalle: "Agregado dinámicamente al final.",
    destacado: false
  };
  
  // TODO: crear una tarjeta y agregarla con append()
  const nuevaTarjeta = crearTarjetaEquipo(equipoPrueba);
  listaEquipos.append(nuevaTarjeta);
}

function agregarEquipoAlInicio() {
  // TODO: crear un objeto equipo de prueba
  const equipoPrueba = {
    nombre: "Equipo Inicial",
    detalle: "Agregado dinámicamente al inicio.",
    destacado: true
  };
  
  // TODO: crear una tarjeta y agregarla con prepend()
  const nuevaTarjeta = crearTarjetaEquipo(equipoPrueba);
  listaEquipos.prepend(nuevaTarjeta);
}

function insertarAviso() {
  // TODO: crear un elemento p
  const p = document.createElement("p");
  
  // TODO: asignar clase aviso y texto
  p.classList.add("aviso");
  p.textContent = "Este es un aviso importante sobre los equipos.";
  
  // TODO: insertarlo antes del panel con before()
  panelEquipos.before(p);
}

function actualizarResumen() {
  // TODO: usar listaEquipos.children.length
  const total = listaEquipos.children.length;
  
  // TODO: crear un p con el total de tarjetas
  const mensaje = document.createElement("p");
  mensaje.textContent = `Total de equipos: ${total}`;
  
  // TODO: usar resumen.replaceChildren(mensaje)
  resumen.replaceChildren(mensaje);
}

function reemplazarPrimeraTarjeta() {
  // TODO: obtener listaEquipos.firstElementChild
  const primeraTarjeta = listaEquipos.firstElementChild;
  
  // TODO: validar si existe
  if (primeraTarjeta) {
    // TODO: crear una nueva tarjeta
    const equipoReemplazo = {
      nombre: "Equipo Reemplazo",
      detalle: "Tarjeta que sustituye a la anterior.",
      destacado: false
    };
    const nuevaTarjeta = crearTarjetaEquipo(equipoReemplazo);
    
    // TODO: reemplazar la primera tarjeta con replaceWith()
    primeraTarjeta.replaceWith(nuevaTarjeta);
  }
}

btnCargar.addEventListener("click", cargarEquipos);
btnAgregarFinal.addEventListener("click", agregarEquipoAlFinal);
btnAgregarInicio.addEventListener("click", agregarEquipoAlInicio);
btnAviso.addEventListener("click", insertarAviso);
btnResumen.addEventListener("click", actualizarResumen);
btnReemplazarPrimera.addEventListener("click", reemplazarPrimeraTarjeta);