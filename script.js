let carrito = [];
let total = 0;

// Número de WhatsApp (ejemplo México)
const numeroWhatsApp = "529611816238";

// Carrusel de imágenes
const imagenes = [
  "https://via.placeholder.com/900x300.png?text=Bienvenidos+a+Regalitos+Grettel",
  "https://via.placeholder.com/900x300.png?text=Ofertas+Especiales",
  "https://via.placeholder.com/900x300.png?text=Nuevos+Productos"
];

let index = 0;
const bannerImg = document.getElementById("banner-img");

setInterval(() => {
  index = (index + 1) % imagenes.length;
  bannerImg.src = imagenes[index];
}, 3000);

// Agregar productos al carrito
function agregarAlCarrito(producto, precio) {
  carrito.push({ producto, precio });
  total += precio;
  actualizarCarrito();
}

// Actualizar carrito
function actualizarCarrito() {
  const lista = document.getElementById("carrito");
  const totalTexto = document.getElementById("total");
  const contador = document.getElementById("contador");

  lista.innerHTML = "";
  carrito.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.producto} - $${item.precio}`;
    lista.appendChild(li);
  });

  totalTexto.textContent = `Total: $${total}`;
  contador.textContent = carrito.length;
}

// Vaciar carrito
function vaciarCarrito() {
  carrito = [];
  total = 0;
  actualizarCarrito();
}

// Mostrar/Ocultar secciones
function mostrarSeccion(id) {
  document.getElementById("banner").classList.add("oculto");

  document.querySelectorAll("main section").forEach(sec => {
    sec.classList.add("oculto");
  });

  const seccion = document.getElementById(id);
  seccion.classList.remove("oculto");

  // Mostrar carrito solo en productos
  const widget = document.getElementById("carrito-widget");
  if (id === "oferta" || id === "nuevos") {
    widget.classList.remove("oculto");
  } else {
    widget.classList.add("oculto");
  }
}

// Toggle carrito tipo chat
function toggleCarrito() {
  document.getElementById("carrito-contenido").classList.toggle("oculto");
}

function realizarPedido() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  // Fecha y hora del pedido
  const fechaHora = new Date().toLocaleString();

  // Generar ticket en pantalla
  const ticket = document.getElementById("ticket");
  ticket.classList.remove("oculto");

  document.getElementById("ticket-fecha").textContent = "📅 Fecha: " + fechaHora;
  document.getElementById("ticket-lista").innerHTML = "";
  document.getElementById("ticket-total").textContent = "Total: $" + total;

  carrito.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.producto} - $${item.precio}`;
    document.getElementById("ticket-lista").appendChild(li);
  });

  // Preparar mensaje para WhatsApp
  let mensaje = `Hola, me interesa realizar un pedido:\n\nFecha: ${fechaHora}\n`;
  carrito.forEach(item => {
    mensaje += `- ${item.producto} ($${item.precio})\n`;
  });
  mensaje += `Total: $${total}\n\n¿Podemos acordar la entrega y forma de pago?`;

  let url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

  // Abrir WhatsApp
  window.open(url, "_blank");

  // 🔄 Vaciar carrito después del pedido
  carrito = [];
  total = 0;
  actualizarCarrito();
}

function imprimirTicket() {
  const ticket = document.getElementById("ticket");
  window.print(); // abrir diálogo de impresión
  ticket.classList.add("oculto"); // ocultar ticket después de imprimir
}



