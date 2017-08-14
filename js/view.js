function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: locations.startingPlace
  });
  var marker = new google.maps.Marker({
    position: locations.startingPlace,
    map: map
  });
}
