let carrito = [];

function formatoPrecio(precio) {
    return "$" + precio.toLocaleString("es-CO");
}

function abrirCarrito() {
    document.getElementById("panel-carrito")
        .classList.add("abierto");

    document.getElementById("fondo-carrito")
        .classList.add("abierto");

    document.body.style.overflow = "hidden";
}

function cerrarCarrito() {
    document.getElementById("panel-carrito")
        .classList.remove("abierto");

    document.getElementById("fondo-carrito")
        .classList.remove("abierto");

    document.body.style.overflow = "";
}

function agregarProducto(nombre, precio, boton) {
    carrito.push({
        nombre: nombre,
        precio: precio
    });

    mostrarCarrito();
    abrirCarrito();

    if (boton) {
        boton.classList.remove("btn-agregado");
        void boton.offsetWidth;
        boton.classList.add("btn-agregado");

        const textoOriginal = boton.textContent;

        boton.textContent = "✓ ¡Agregado!";

        setTimeout(function () {
            boton.textContent = textoOriginal;
            boton.classList.remove("btn-agregado");
        }, 1000);
    }

    mostrarMensaje(nombre + " añadido al carrito 💗");
}

function mostrarMensaje(texto) {
    const anterior = document.querySelector(".mensaje-agregado");

    if (anterior) {
        anterior.remove();
    }

    const mensaje = document.createElement("div");

    mensaje.className = "mensaje-agregado";
    mensaje.textContent = texto;
    mensaje.setAttribute("role", "status");

    document.body.appendChild(mensaje);

    setTimeout(function () {
        mensaje.remove();
    }, 2200);
}

function eliminarProducto(indice) {
    if (indice < 0 || indice >= carrito.length) {
        return;
    }

    const nombre = carrito[indice].nombre;

    carrito.splice(indice, 1);

    mostrarCarrito();
    mostrarMensaje(nombre + " eliminado del carrito");
}

function vaciarCarrito() {
    if (carrito.length === 0) {
        mostrarMensaje("Tu carrito ya está vacío 🛒");
        return;
    }

    carrito = [];

    mostrarCarrito();
    mostrarMensaje("Carrito vaciado correctamente 💗");
}

function mostrarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const total = document.getElementById("total");
    const contador = document.getElementById("contador-carrito");

    let suma = 0;

    carrito.forEach(function (producto) {
        suma += producto.precio;
    });

    if (contador) {
        contador.textContent = carrito.length;
    }

    if (total) {
        total.textContent = formatoPrecio(suma);
    }

    if (!lista) {
        return;
    }

    lista.innerHTML = "";

    if (carrito.length === 0) {
        const mensaje = document.createElement("li");
        mensaje.textContent = "Tu carrito está vacío 🐥";
        lista.appendChild(mensaje);
        return;
    }

    carrito.forEach(function (producto, indice) {
        const elemento = document.createElement("li");
        const informacion = document.createElement("span");
        const botonQuitar = document.createElement("button");

        informacion.textContent =
            producto.nombre + " - " + formatoPrecio(producto.precio);

        botonQuitar.textContent = "Quitar";
        botonQuitar.type = "button";

        botonQuitar.onclick = function () {
            eliminarProducto(indice);
        };

        elemento.appendChild(informacion);
        elemento.appendChild(botonQuitar);

        lista.appendChild(elemento);
    });
}

document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
        cerrarCarrito();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    mostrarCarrito();
});
