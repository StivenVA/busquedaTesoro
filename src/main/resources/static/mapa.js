const placeInput =document.getElementById("place-input")
let map;
let autocomplete;
let properties=[
    {
        id: 1,
        nombre: "test_1",
        estacion: 1,
        prueba:"algo",
        coords:{
            lat:4.144492649268406,
            lng:-73.64366876354258
        }
    },
    {
        id: 2,
        nombre: "test_2",
        estacion: 2,
        prueba:"algomas",
        coords:{
            lat:4.147087005973939,
            lng:-73.61355813661032,
        }
    }
]
function iniciarMap() {

    firstPositionMap()
    let infoWindow = new google.maps.InfoWindow();
    const addMarker =(properties)=>{
        properties.forEach((propertie) => {
            const informationCard = createInfoWindow(propertie);
            const marker = new google.maps.Marker({
                position: propertie.coords,
                map,
                icon: "./icons/marker.svg",
            });
            google.maps.event.addListener(marker, "click", () => {
                infoWindow.setContent(informationCard);
                infoWindow.open(map, marker);
                map.setCenter(propertie.coords);
                map.setZoom(14);
            });
        });
    };
    getYourApproximateLocation();
    addMarker(properties);
    searchGoogleMap();
};

const searchGoogleMap = callback => {
    autocomplete = new google.maps.places.Autocomplete(placeInput);
    autocomplete.addListener("place_changed", () => {
        if (placeInput.value !== "") {
            const place = autocomplete.getPlace();
            map.setCenter(place.geometry.location);
            map.setZoom(13);
        }
    });
};
const firstPositionMap = () => {
    const coords = { lat: 19.406940428320986, lng: -99.14819687896599 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: coords,
    });
};

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
const getYourApproximateLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                const coords = {
                    lat: latitude,
                    lng: longitude,
                };
                map.setCenter(coords);
                map.setZoom(13);
                new google.maps.Marker({
                    position: coords,
                    map: map,
                    icon: "./icons/marker.svg",
                });
            },
            () => {
                alert(
                    "Tu navegador esta bien, pero ocurrio un error al obtener tu ubicación"
                );
            }
        );
    } else {
        alert("Tu navegador no cuenta con localizacion ");
    }
};