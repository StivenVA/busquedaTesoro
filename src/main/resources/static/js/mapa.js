let map;
let properties = [
    {
        id: 1,
        nombre: "Estacion 1",
        estacion: 1,
        prueba: "algo",
        coords: {
            lat: 4.142977722191746,
            lng: -73.6262676723069,
        },
        enlace:"preguntas_1.html",
    },
    {
        id: 2,
        nombre: "Estacion 2",
        estacion: 2,
        prueba: "algomas",
        coords: {
            lat: 4.147087005973939,
            lng: -73.61355813661032,
        },
        enlace:"preguntas_2.html",
    },
    {
        id: 3,
        nombre: "Estacion 3",
        estacion: 3,
        prueba: "boton_malo",
        coords: {
            lat: 4.032274864687695,
            lng: -73.79460346617878,
        },
        enlace:"preguntas_3.html",
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
        enlace:"preguntas_4.html",
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
        enlace:"preguntas_5.html",
    },

];
const stationCodes = {
    1: "cod1",
    2: "cod2",
    3: "cod3",
    4: "cod4",
    5: "cod5",
};
const allButtons = [];
let lastEnteredCode = null;
const maxDistance = 0.8;
let userLocation = null;

function iniciarMap() {

    firstPositionMap()
    let infoWindow = new google.maps.InfoWindow();


    const locationButton = document.createElement("button");
    locationButton.id = "go-to-location-btn";
    locationButton.classList.add("btn");
    locationButton.innerText = "Mi ubicación";
    locationButton.addEventListener("click", goToUserLocation);
    document.getElementById("my-location-container").appendChild(locationButton);
    //    let buttonsCreated = false;
    const addMarker = (properties) => {
        properties.forEach((propertie) => {
            const informationCard = createInfoWindow(propertie);
            const marker = new google.maps.Marker({
                position: propertie.coords,
                map,
                icon: "../icons/marker.svg",
            });

            const buttonId = `button${propertie.id}`;
            const button = document.createElement("button");
            button.id = buttonId;
            button.classList.add("btn");

            // Hace que el botón de la estación 1 esté habilitado y visible por defecto
            if (propertie.id === 1) {
                button.disabled = false;
                button.style.display = "block";
                allButtons.push(button);
            } else {
                button.disabled = true; // Por defecto, los botones están deshabilitados
                button.style.display = "none"; // Por defecto, los botones están ocultos
            }

            if (propertie.enlace) {
                button.setAttribute("target", "_blank");  // Asigna el enlace al botón
                button.addEventListener("click", () => {
                    const enteredCode = prompt("Ingresa el código:");
                    if (enteredCode) {
                        checkEnteredCode(propertie.id, enteredCode);
                    }
                });
            } else {
                button.addEventListener("click", () => {
                    const enteredCode = prompt("Ingresa el código:");
                    if (enteredCode) {
                        checkEnteredCode(propertie.id, enteredCode);
                    }
                });
            }

            // Almacena la información de la estación en el botón utilizando data-*
            button.dataset.id = propertie.id;
            button.dataset.nombre = propertie.nombre;
            button.dataset.estacion = propertie.estacion;

            google.maps.event.addListener(marker, "click", () => {
                infoWindow.setContent(informationCard);
                infoWindow.open(map, marker);
                map.setCenter(propertie.coords);
                map.setZoom(19);
            });

            // Agrega el botón al contenedor de botones
            document.getElementById("buttons-container").appendChild(button);
        });
    };
//fin addMarker()
    const checkEnteredCode = (stationId, enteredCode) => {
        const correctCode = stationCodes[stationId];
        if (enteredCode === correctCode) {
            alert("Código correcto. Redirigiendo a la página de preguntas...");
            const stationUrl = `preguntas_${stationId}.html`;
            window.location.href = stationUrl; // Redirige la ventana actual a la nueva URL
        } else {
            alert("Código incorrecto. Inténtalo de nuevo.");
        }
    };


    const getYourApproximateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                    userLocation = { lat: latitude, lng: longitude };
                    map.setCenter(userLocation);
                    map.setZoom(19);
                    new google.maps.Marker({
                        position: userLocation,
                        map: map,
                        icon: "../icons/user.svg",
                    });

                    // Después de obtener la ubicación del usuario, verifica las distancias
                    checkDistances();
                },
                () => {
                    alert(
                        "Tu navegador está bien, pero ocurrió un error al obtener tu ubicación"
                    );
                }
            );
        } else {
            alert("Tu navegador no cuenta con localización ");
        }
    };


    getYourApproximateLocation();
    addMarker(properties);

    setInterval(() => {
        checkDistances();
    }, 1000);
}

function goToUserLocation() {
    if (userLocation) {
        map.setCenter(userLocation);
        map.setZoom(19);
    } else {
        alert("No se pudo obtener la ubicación actual.");
    }
}

const checkDistances = () => {
    if (userLocation) {
        properties.forEach((propertie) => {
            const distance = calculateDistance(
                userLocation.lat,
                userLocation.lng,
                propertie.coords.lat,
                propertie.coords.lng
            );
            const buttonId = `button${propertie.id}`;
            const button = document.getElementById(buttonId);

            if (button) {
                button.disabled = distance > maxDistance;
                button.style.display = lastEnteredCode === null || stationCodes[propertie.id] === lastEnteredCode ? "block" : "none";

            }
        });
        // Crear el botón "Mi ubicación"
        const locationButton = document.getElementById("go-to-location-btn") || document.createElement("button");

        locationButton.id = "go-to-location-btn";
        locationButton.classList.add("btn");
        locationButton.innerText = "Mi ubicación";
        locationButton.addEventListener("click", goToUserLocation);

        // Agregar el botón al contenedor específico
        document.getElementById("my-location-container").appendChild(locationButton);
        allButtons.push(locationButton);
    }
};

function ingresarCodigo(codigo) {
    const isValidCode = Object.values(stationCodes).includes(codigo);
    if (isValidCode) {
        lastEnteredCode = codigo;
        alert("Código ingresado correctamente.");
        // Actualiza la visibilidad de los botones y marcadores
        checkDistances();
    } else {
        alert("Código incorrecto. Inténtalo de nuevo.");
    }
}


const firstPositionMap = () => {
    const coords = { lat: 19.406940428320986, lng: -99.14819687896599 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: coords,
    });
};

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distancia en kilómetros
    return distance;
}

// Función para convertir grados a radianes
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

const createInfoWindow = (propertie) => {
    return `
  <div>
    <h3 class="text-reset py-1">${propertie.nombre}</h3>
    <div class="d-flex justify-content-space-between">
      <p><b>Estacion: </b>${propertie.estacion}</p>
    </div>
    <p><b>Prueba: </b>${propertie.prueba}</p>
  </div>
  `;
};
