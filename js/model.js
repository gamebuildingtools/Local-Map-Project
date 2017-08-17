var locations = [];

locations.startingPlace = {
  lat: 39.772945,
  lng: -86.151869
}

// This information would preferably come from a server.
locations.myPlaces = [
  {
    title: "Bakersfield",
    address: "334 Massachusetts Ave, Indianapolis, IN 46204",
    location: {lat: 39.771933, lng: -86.153661}
  },
  {
    title: "Bazbeaux",
    address: "329 Massachusetts Ave, Indianapolis, IN 46204",
    location: {lat: 39.771448, lng: -86.153460}
  },
  {
    title: "Bru Burger Bar",
    address: "410 Massachusetts Ave, Indianapolis, IN 46204",
    location: {lat: 39.773337, lng: -86.152088}
  },
  {
    title: "Chatterbox Jazz Club",
    address: "435 Massachusetts Ave, Indianapolis, IN 46204",
    location: {lat: 39.773239, lng: -86.151211}
  },
  {
    title: "Louie's Wine & Dine",
    address: "345 Massachusetts Ave, Indianapolis, IN 46204",
    location: {lat: 39.771838, lng: -86.153122}
  },
  {
    title: "Murat Theatre",
    address: "502 N New Jersey St, Indianapolis, IN 46204",
    location: {lat: 39.774461, lng: -86.151043}
  },
  {
    title: "Nine Irish Brothers",
    address: "575 Massachusetts Ave, Indianapolis, IN 46204",
    location: {lat: 39.774862, lng: -86.148956}
  },
  {
    title: "Old Point Tavern",
    address: "401 Massachusetts Ave, Indianapolis, IN 46204",
    location: {lat: 39.772730, lng: -86.151887}
  },
  {
    title: "Rathskellar",
    address: "401 E Michigan St, Indianapolis, IN 46204",
    location: {lat: 39.773753, lng: -86.150309}
  },
  {
    title: "Roberts Park Church",
    address: "401 N Delaware St, Indianapolis, IN 46204",
    location: {lat: 39.772997, lng: -86.153665}
  },
  {
    title: "The Tap",
    address: "306 N Delaware St, Indianapolis, IN 46204",
    location: {lat: 39.771496, lng: -86.154568}
  },

];

//https://api.yelp.com/v3/businesses/search

/*var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&imlimit=5&format=json&callback=wikiCallback';
$.ajax({
  url:wikiUrl,
  dataType:'jsonp'
}).done(function(data){
  console.log(data);

  var articleUrl = data[3][0];
  var articleDescr = data[2][0];
  var articleURL = data[3][0];

  //Error handle
  if(articleUrl === undefined) {
      infowindow.setContent('<div>'+ marker.title+'<p>Sorry!! UNABLE TO FIND WIKIPEDIA FOR SELECTED ENTRY</p></div>');
      infowindow.open(map, marker);
  }else{
      infowindow.marker = marker;
      infowindow.setContent('<div><strong>'+marker.title+'</strong><p>'+articleDescr+'</p><p><a href="'+articleURL+'" target="_blank"></a></p></div>');
      infowindow.open(map, marker);
  }

  //Error handle if api fails
}).fail(function(){
  infowindow.setContent('<div>'+ marker.title+'<p>Sorry!! UNABLE TO FIND WIKIPEDIA FOR SELECTED ENTRY</p></div>');
  infowindow.open(map, marker);
});*/

/*var yelpAPI = 'https://api.yelp.com/v3/businesses/search?term=Bru%20Burger%20Bar';

$.ajax({
  url:yelpAPI,
  dataType:'jsonp'
}).done(function(data){
  console.log(data);
});*/
