var map;
var locationsList = ko.observableArray([]);
var markers = [];

function initMap() {

  // Create a map and zoom in on Massachusetts Avenue
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: locations.startingPlace
  });

  // Set the max zoom to 20, this helps with filtering to individual locations
  map.setOptions({maxZoom: 20});

  // Apply Bindings along with the map init
  ko.applyBindings(new DisplayLocations());

  // Toggle the sidebar menu
  $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
  });
}

function populateInfoWindow(marker, infowindow) {
  

  if(infowindow.marker != marker) {
    infowindow.marker = marker;
    //infowindow.setContent('<div>' + marker.title + '<br />' + marker.address + '</div>');
    infowindow.open(map, marker);

    infowindow.addListener('closeclick',function(){
      infowindow.marker = null;
    });
  }
}

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
      toggleBounce(this);
      populateInfoWindow(this, largeInfowindow);
    });
  });

  // Bounce an individual marker and cancel bounce after two bounces
  function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      setTimeout(function(){
          marker.setAnimation(null);
      },1475);
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  // Function to hide all markers
  function hideListings() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
      markers[i].isVisible = false;
    }
  }

  // This function will loop through the markers array and display the specified index marker
  function showListing(index) {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    markers[index].setMap(map);
    markers[index].isVisible = true;

    // Update the map bounds based on current list of locations
    for (var i = 0; i < markers.length; i++) {
      if(markers[i].isVisible === true) {
        bounds.extend(markers[i].position);
      }
    }
    map.fitBounds(bounds);

  }

  // Create the filter, I had some help from StackOverflow for this function
  this.myPlace = ko.computed(function(){
    hideListings();

    return this.places().filter(function(place, index){
      if(!self.filter() || place.title.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1) {
        showListing(index);
        return place;
      }
    });
  }, this);

  // Display the information window when a location from the list in sidebar is clicked
  self.locationListClick = function(data, event) {
    toggleBounce(markers[event.target.id]);
    populateInfoWindow(markers[event.target.id], largeInfowindow);
  }

}
