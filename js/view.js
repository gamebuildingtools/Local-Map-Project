var map;
var locationsList = ko.observableArray([]);
var markers = [];

function initMap() {

  // Create a map and zoom in on Massachusetts Avenue
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: locations.startingPlace
  });

  // Apply Bindings along with the map init
  ko.applyBindings(new DisplayLocations());
}

function populateInfoWindow(marker, infowindow) {
  if(infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '<br />' + marker.address + '</div>');
    infowindow.open(map, marker);

    infowindow.addListener('closeclick',function(){
      infowindow.marker = null;
    });
  }
}

function ViewModel(){
  /*var self = this;
  this.filter = ko.observable();
  var myLocations = [];

  locations.myPlaces.forEach(function(location, index) {
    myLocations.push(location);
  });

  this.places = ko.observableArray(myLocations);

  this.myPlaces = ko.computed(function(){
    return this.places().filter(function(place){
      if(!self.filter() || place.title.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1) {
        console.log( place.title.toLowerCase() );
        return place;
      }
    });
  }, this);*/

}

//ko.applyBindings(new ViewModel());

function DisplayLocations() {

  var self = this;
  this.filter = ko.observable();
  this.locations = locations.myPlaces;
  this.places = ko.observableArray(this.locations);

  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  this.locations.forEach(function(location, index) {

    // Create a marker for each location
    var marker = new google.maps.Marker({
      position: location.latlng,
      map: map,
      title: location.title,
      address: location.address,
      animation: google.maps.Animation.DROP,
    });

    // Push the marker to my markers array
    markers.push(marker);

    // Add a click event to open the marker
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
  });

  // Create the filter
  this.myPlace = ko.computed(function(){
    return this.places().filter(function(place){
      if(!self.filter() || place.title.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1) {
        //console.log( place.title.toLowerCase() );
        return place;
      }
    });
  }, this);

}
