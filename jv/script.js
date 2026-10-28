
const formulario = document.getElementById("form-contacto");
const respuesta = document.getElementById("respuesta-contacto");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    respuesta.textContent = "¡Gracias por contactarte con el Centro Madre Teresa! Tu mensaje fue registrado en esta página.";

    formulario.reset();
});
