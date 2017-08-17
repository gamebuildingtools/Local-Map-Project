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

// Display information inside the popup on each marker
function populateInfoWindow(marker, infowindow) {
  if(infowindow.marker != marker) {

    var windowContent = "";
    var streetViewService = new google.maps.StreetViewService();
    var radius = 40;

    // In case the status is OK, which means the pano was found, compute the
    // position of the streetview image, then calculate the heading, then get a
    // panorama from that and set the options, courtesy of Udacity
    function getStreetView(data, status) {
      if (status == google.maps.StreetViewStatus.OK) {

        var nearStreetViewLocation = data.location.latLng;
        var heading = google.maps.geometry.spherical.computeHeading(
          nearStreetViewLocation, marker.position);
          infowindow.setContent('<div id="infoWindowStyle">' + marker.title + ' is located at ' + marker.address + '. ' + marker.weather + '<div id="pano"></div></div>');
          var panoramaOptions = {
            position: nearStreetViewLocation,
            pov: {
              heading: heading,
              pitch: 0
            }
          };
        var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), panoramaOptions);
      } else {
        infowindow.setContent('<div>' + marker.title + '</div>' +
          '<div>No Street View Found</div>');
      }
    }

    // Use streetview service to get the closest streetview image within 30 meters of the markers position
    streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);

    // Open the infowindow on the correct marker.
    infowindow.open(map, marker);

    infowindow.addListener('closeclick',function(){
      infowindow.marker = null;
    });

  }
}

// Display the locations on the map
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
      position: location.location, // this contains the lat/lng coordinates
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

    // Store the lat/lng variables
    var lat = marker.getPosition().lat();
    var lng = marker.getPosition().lng();

    // Get the local weather via openweathermap.org. Do this when the markers are created to prepare it for display
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&appid=67811cdcf4babdc897c8f34c86df2345&units=imperial";
    var weatherMessage = "Weather API";
    $.ajax({
      url: weatherURL,
      dataType: 'json'
    }).done(function(data){
      marker.weather = "The temperature is " + data.main.temp + " with " + data.clouds.all + "% cloud.";
    }).fail(function(){
      // Weather api call failed
      marker.weather = "The weather API is unavailable";
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
