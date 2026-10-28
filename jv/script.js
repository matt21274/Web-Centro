const formulario = document.getElementById("form-contacto");
const respuesta = document.getElementById("respuesta-contacto");

if (formulario && respuesta) {
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        respuesta.textContent = "¡Gracias por contactarte con el Centro Madre Teresa! Tu mensaje fue registrado en esta página.";

        formulario.reset();
    });
}

const parametros = new URLSearchParams(window.location.search);
const motivo = parametros.get("motivo");
const selectorMotivo = document.getElementById("motivo");

if (selectorMotivo && motivo) {
    selectorMotivo.value = motivo;
}

const tarjetasInteractivas = document.querySelectorAll(".tarjeta-interactiva");
const paneles = document.querySelectorAll(".panel-detalle");

function cerrarPaneles() {
    paneles.forEach(function(panel) {
        panel.hidden = true;
    });

    tarjetasInteractivas.forEach(function(tarjeta) {
        tarjeta.setAttribute("aria-expanded", "false");
    });
}

function alternarPanel(tarjeta) {
    const idPanel = tarjeta.dataset.panel;
    const panel = document.getElementById(idPanel);

    if (!panel) {
        return;
    }

    const estabaAbierto = !panel.hidden;

    cerrarPaneles();

    if (!estabaAbierto) {
        panel.hidden = false;
        tarjeta.setAttribute("aria-expanded", "true");

        panel.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}

tarjetasInteractivas.forEach(function(tarjeta) {
    tarjeta.addEventListener("click", function() {
        alternarPanel(tarjeta);
    });

    tarjeta.addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            alternarPanel(tarjeta);
        }
    });
});

document.querySelectorAll("[data-cerrar-panel]").forEach(function(boton) {
    boton.addEventListener("click", function() {
        cerrarPaneles();
    });
});
document.querySelectorAll("[data-destino]").forEach(function(tarjeta) {
    function irAlDestino() {
        const destino = document.querySelector(tarjeta.dataset.destino);

        if (destino) {
            destino.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }

    tarjeta.addEventListener("click", irAlDestino);

    tarjeta.addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            irAlDestino();
        }
    });
});

const tarjetasGrupo = document.querySelectorAll(".tarjeta-abrir-grupo");
const panelGrupo = document.getElementById("panel-grupo");
const cerrarGrupo = document.getElementById("cerrar-grupo");
const imagenGrupo = document.getElementById("imagen-modal-grupo");
const tituloGrupo = document.getElementById("titulo-modal-grupo");
const descripcionGrupo = document.getElementById("descripcion-modal-grupo");
const detallesGrupo = document.getElementById("detalles-modal-grupo");

if (panelGrupo && cerrarGrupo && imagenGrupo && tituloGrupo &&
    descripcionGrupo && detallesGrupo) {

    function abrirGrupo(tarjeta) {
        imagenGrupo.src = tarjeta.dataset.imagen;
        imagenGrupo.alt = tarjeta.dataset.titulo;
        tituloGrupo.textContent = tarjeta.dataset.titulo;
        descripcionGrupo.textContent = tarjeta.dataset.descripcion;
        detallesGrupo.replaceChildren();

        if (tarjeta.dataset.tipo === "oratorio") {
            const espacios = [
                {
                    titulo: "Oratorio",
                    texto: "Un lugar para que los niños compartan juegos, deportes, talleres y momentos de convivencia.",
                    imagen: "imagen/oratorio.jpeg",
                    alt: "Niños compartiendo actividades en el Oratorio"
                },
                {
                    titulo: "Misiones",
                    texto: "Una experiencia de encuentro con otras personas, para compartir la fe y servir a la comunidad.",
                    imagen: "imagen/Concordia.jpeg",
                    alt: "Personas compartiendo una experiencia misionera"
                }
            ];

            espacios.forEach(function(espacio) {
                const bloque = document.createElement("article");
                bloque.className = "detalle-espacio";

                const foto = document.createElement("img");
                foto.src = espacio.imagen;
                foto.alt = espacio.alt;
                foto.loading = "lazy";

                const titulo = document.createElement("h3");
                titulo.textContent = espacio.titulo;

                const texto = document.createElement("p");
                texto.textContent = espacio.texto;

                bloque.append(foto, titulo, texto);
                detallesGrupo.appendChild(bloque);
            });

            const enlace = document.createElement("a");
            enlace.className = "boton-contacto";
            enlace.href = "contacto.html?motivo=actividades";
            enlace.textContent = "Consultar por estas actividades";
            detallesGrupo.appendChild(enlace);
        }

        panelGrupo.hidden = false;
        document.body.classList.add("modal-abierto");
        cerrarGrupo.focus();
    }

    function cerrarPanelGrupo() {
        panelGrupo.hidden = true;
        document.body.classList.remove("modal-abierto");
    }

    tarjetasGrupo.forEach(function(tarjeta) {
        tarjeta.addEventListener("click", function() {
            abrirGrupo(tarjeta);
        });

        tarjeta.addEventListener("keydown", function(event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                abrirGrupo(tarjeta);
            }
        });
    });

    cerrarGrupo.addEventListener("click", cerrarPanelGrupo);

    panelGrupo.addEventListener("click", function(event) {
        if (event.target === panelGrupo) {
            cerrarPanelGrupo();
        }
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && !panelGrupo.hidden) {
            cerrarPanelGrupo();
        }
    });
}
