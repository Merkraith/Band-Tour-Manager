
// Search a band by name, 
// Display location on map 
// Display venue, city, time in card below the map

//Mapbox converts address to geocode or geocode to street address

let searchResults = [];
let bandsintownKey = "cef0c58f01fb18ddece18ed752b9c2d2";

$(document).ready(function () {
  //Search band by name:
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    
    searchForBand()

  })
  //bandsintown API call.....
  function searchForBand() {
    let artistSearch = $("#search-input").val().trim();
    let bandsintownKey = "cef0c58f01fb18ddece18ed752b9c2d2";
    let queryURL = `https://rest.bandsintown.com/artists/${artistSearch}/events/?app_id=${bandsintownKey}`;
    $.ajax({
      url: queryURL,
      method: "GET", cors: true, secure: true, headers: { 'Access-Control-Allow-Origin': '*' }, crossDomain:true
    }).then(function (response) {

      console.log(response);

    });
  }
  // //return band in town band data from event 
  // //object will get city, from city, we'll get geocode, geocode will then populate on map 
  // // mapbox api
  // function renderMap() {
  //   mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zZXBoYnJpbWV5ZXIiLCJhIjoiY2s5cHZqOGQ5MDd6ZjNtbHp1dGx0aGp1MSJ9.LFiwHWlUhkLBhQsprDvCnA';
  //   var map = new mapboxgl.Map({
  //     container: 'map',
  //     style: 'mapbox://styles/mapbox/streets-v11',
  //     center: [12.550343, 55.665957],
  //     zoom: 8
  //   });

  //   };
  //   var marker = new mapboxgl.Marker()
  //     .setLngLat([12.550343, 55.665957])
  //     .addTo(map);

  //   let mapboxToken = pk.eyJ1Ijoiam9zZXBoYnJpbWV5ZXIiLCJhIjoiY2s5cHZqOGQ5MDd6ZjNtbHp1dGx0aGp1MSJ9.LFiwHWlUhkLBhQsprDvCnA
  //   let queryURL2; 
  //   $.ajax({
  //     url: queryURL2,
  //     method: "GET"
  //   }).then(function (response) {

  //     console.log(response);

  //   });



  //return from map api function to populate the card
  // let bandResult = $("#band-result").val().trim();
  //   let venueResult = $("#venue-result");
  //   let addressResult = $("#address-result");
  //   let cityResult = $("#city-result");
  //   let timeResult = $("#time-result");

  //   // Methods run on jQuery selectors return the selector they we run on
  //   // This is why we can create and save a reference to a td in the same statement we update its text
  //   let cardBody = $("#card-body");
  //   let cardRow = $("#card-row");
  // //need to update response path with exact location of data from object - all response paths below are placeholders
  //   let bandNameCard = $(bandresult).text(response);
  //   let venueCard = $(venueResult).text(response.venue);
  //   let addressCard = $(addressResult).text(response.address);
  //   let cityCard = $(cityResult).text(response.city);
  //   let timeCard = $(timeResult).text(response.time);
  //   // Append the newly created data together in card
  //   cardRow.append(bandNameCardard, venueCard, addressCard, cityCard, timeCard);
  //   // Append the card data to card body 
  //   cardBody.append(cardRow);

});
