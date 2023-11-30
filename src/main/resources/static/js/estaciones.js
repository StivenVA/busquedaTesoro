// nuevoScript.js

document.addEventListener("DOMContentLoaded", function () {
    const dynamicButtonsContainer = document.getElementById("dynamic-buttons-container");

    // Obtener propiedades
    const properties = [
        {
            id: 1,
            nombre: "Estacion 1",
            estacion: 1,
            prueba: "algo",
            coords: {
                lat: 4.142425534240816,
                lng: -73.62653684081216,
            },
            enlace: "preguntas_1.html",
            pin: 111,
        },
        {
            id: 2,
            nombre: "Estacion 2",
            estacion: 2,
            prueba: "algomas",
            coords: {
                lat: 4.144227858494155,
                lng: -73.62672876632556,
            },
            enlace: "preguntas_2.html",
            pin: 222,
        },
        {
            id: 3,
            nombre: "Estacion 3",
            estacion: 3,
            prueba: "boton_malo",
            coords: {
                lat: 4.141574059821997,
                lng: -73.62760316643816,
            },
            enlace: "preguntas_3.html",
            pin: 333,
        },
        {
            id: 4,
            nombre: "Estacion 4",
            estacion: "Danesa",
            prueba: "boton_deberia_servir",
            coords: {
                lat: 4.1425037520165535,
                lng: -73.62079482668284,
            },
            enlace: "preguntas_4.html",
            pin: 444,
        },
        {
            id: 5,
            nombre: "Estacion 5",
            estacion: "cerca_papeleria",
            prueba: "boton_deberia_servir2",
            coords: {
                lat: 4.141439021049356,
                lng: -73.62524192925281,
            },
            enlace: "preguntas_5.html",
            pin: 555,
        },
    ];

    // Crear botones dinámicamente
// ... (código existente)

    properties.forEach((property) => {
        const button = document.createElement("button");
        button.textContent = `Estación ${property.estacion}`;
        button.dataset.id = property.id;
        button.dataset.nombre = property.nombre;
        button.dataset.estacion = property.estacion;
        button.classList.add("btn"); // Agrega la clase btn

        button.addEventListener("click", () => {
            // Lógica cuando se hace clic en un botón
            console.log(`Botón ${property.estacion} clickeado: ${property.nombre} (ID: ${property.id})`);
        });

        dynamicButtonsContainer.appendChild(button);
    });

});