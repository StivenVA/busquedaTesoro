let map;
let autocomplete;
let properties = [
    { id: 1,
        nombre: "test_1",
        estacion: 1,
        prueba: "algo",
        coords: {
            lat: 4.144492649268406,
            lng: -73.64366876354258
        },
        enlace:"preguntas_1.html",
    },
    {
        id: 2,
        nombre: "test_2",
        estacion: 2,
        prueba: "algomas",
        coords: {
            lat: 4.147087005973939,
            lng: -73.61355813661032,
        },
        enlace:"preguntas_1.html",
    },
    {
        id: 3,
        nombre: "test_3_lejos",
        estacion: 3,
        prueba: "boton_malo",
        coords: {
            lat: 4.032274864687695,
            lng: -73.79460346617878,
        },
        enlace:"preguntas_1.html",
    },
    {


        id: 4,
        nombre: "danesa_cerca",
        estacion: "Danesa",
        prueba: "boton_deberia_servir",
        coords: {
            lat: 4.1425037520165535,
            lng: -73.62079482668284,
        },
        enlace:"preguntas_1.html",
    },
    {


        id: 5,
        nombre: "papel_cerca",
        estacion: "cerca_papeleria",
        prueba: "boton_deberia_servir2",
        coords: {
            lat: 4.141439021049356,
            lng: -73.62524192925281,
        },
        enlace:"preguntas_1.html",
    },

];

const maxDistance = 0.8;
let userLocation = null;

function iniciarMap() {

    firstPositionMap()
    let infoWindow = new google.maps.InfoWindow();
    //    let buttonsCreated = false;
    const addMarker = (properties) => {
        properties.forEach((propertie) => {
            const informationCard = createInfoWindow(propertie);
            const marker = new google.maps.Marker({
                position: propertie.coords,
                map,
                icon: "./icons/marker.svg",
            });

            const buttonId = `button${propertie.id}`;
            const button = document.createElement("button");
            button.id = buttonId;
            button.classList.add("btn");
            button.textContent = propertie.nombre; // Utiliza el nombre como contenido del botón
            button.disabled = true; // Por defecto, los botones están deshabilitados

            if (propertie.enlace) {
                button.setAttribute("target", "_blank");
                // Asigna el enlace al botón
                button.addEventListener("click", () => {
                    window.open(propertie.enlace, "_blank");
                });
            } else {
                // Si no hay enlace, agrega el evento click estándar
                button.addEventListener("click", () => {
                    const stationId = button.dataset.id;
                    const stationName = button.dataset.nombre;
                    const stationNumber = button.dataset.estacion;
                    alert(`Botón ${stationNumber}: ${stationName} (ID: ${stationId})`);
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
                map.setZoom(14);
            });

            // Agrega el botón al contenedor de botones
            document.getElementById("buttons-container").appendChild(button);
        });
    };


    const getYourApproximateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                    userLocation = { lat: latitude, lng: longitude };
                    map.setCenter(userLocation);
                    map.setZoom(13);
                    new google.maps.Marker({
                        position: userLocation,
                        map: map,
                        icon: "./icons/marker.svg",
                    });
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
};

const checkDistances = () => {
    if (userLocation) {
        properties.forEach((propertie) => {
            const distance = calculateDistance(
                userLocation.lat,
                userLocation.lng,
                propertie.coords.lat,
                propertie.coords.lng
            );
            console.log(`Distance to Station ${propertie.id}: ${distance} km`);

            const buttonId = `button${propertie.id}`;
            const button = document.getElementById(buttonId);

            if (button) {
                button.disabled = distance > maxDistance;
            }
        });
    }
};

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
