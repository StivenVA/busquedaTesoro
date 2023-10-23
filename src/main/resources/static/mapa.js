
function iniciarMap() {
    let coords =  {lat:4.135001188609769,lng: -73.62184632576512};
    let map = new google.maps.Map(document.getElementById('map'),{
        zoom :16,
        center :coords,
    });
    let markerOptions ={
        position: new google.maps.LatLng(4.135001188609769, -73.62184632576512)
    }

    let marker = new google.maps.Marker({
        position: coords,
        map,
        icon:"./icons/marker.svg",
    });
    marker.addEventListener('click',function (){
        if(map){
            map.setZoom(16);
            map.setCenter(coords);
        }
    });
}