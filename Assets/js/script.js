let searchResults = [];
let bandsintownKey = "98be37a3554e53a3d70cf973e8da57cb";
let lat;
let lon;

renderMap();

function renderMap() {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoiam9zZXBoYnJpbWV5ZXIiLCJhIjoiY2s5cHZqOGQ5MDd6ZjNtbHp1dGx0aGp1MSJ9.LFiwHWlUhkLBhQsprDvCnA";
  var map = new mapboxgl.Map({
    container: "map", // container id
    style: "mapbox://styles/mapbox/streets-v11", //stylesheet location
    center: [-122.331356, 47.613245], //starting position [lng , lat]
    zoom: 1, //starting zoom
  });
  var marker = new mapboxgl.Marker()
    .setLngLat([-122.331356, 47.613245])
    .addTo(map);
}
// });
//Search band by name:
$("#searchBtn").on("click", function (event) {
  event.preventDefault();

  searchForBand();
  $("#artist-search").empty();
});
//bandsintown API call.....
function searchForBand() {
  let artistSearch = $("#search-input").val().trim();
  let bandsintownKey = "98be37a3554e53a3d70cf973e8da57cb";
  let queryURL = `https://bands.alex-hansen.com/artists/${artistSearch}/events/?app_id=${bandsintownKey}`;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    if (response[0] === undefined) {
      // let sorryCard = $("<h1>").text("Sorry," + bandNameCard + "does not have any shows sheduled.");
      // cardBody.style.visibility = "hidden";
      // sorryCard.style.visibility = "visible";
      alert("Sorry, we have no upcoming shows!");
      $("#search-input").val("");
      return;
    }

    let cardBody = $("#card-body");
    let cardRow = $("#card-row");
    let bandNameCard = $("#band-result").text(response[0].artist.name);
    let venueCard = $("#venue-result").text("Venue: " + response[0].venue.name);
    let cityCard = $("#city-result").text("City: " + response[0].venue.city);
    let momentVar = moment().format("dddd, MMMM Do, YYYY h:mm a");

    let gigDate = moment(response[0].datetime).format("LLL");
    $("#time-result").text(gigDate);

    // Append the newly created data together in card
    cardRow.append(bandNameCard, venueCard, cityCard);
    // Append the card data to card body
    cardBody.append(cardRow);

    renderVenue(response);
  });
}

function renderVenue(response) {
  $("#artist-search").empty();
  mapboxgl.accessToken =
    "pk.eyJ1Ijoiam9zZXBoYnJpbWV5ZXIiLCJhIjoiY2s5cHZqOGQ5MDd6ZjNtbHp1dGx0aGp1MSJ9.LFiwHWlUhkLBhQsprDvCnA";
  var map = new mapboxgl.Map({
    container: "map", // container id
    style: "mapbox://styles/mapbox/streets-v11", //stylesheet location
    center: [-122.331356, 47.613245], //starting position [lng , lat]
    zoom: 1, //starting zoom
  });

  let responseLong = response[0].venue.longitude;
  let responseLat = response[0].venue.latitude;
  var marker = new mapboxgl.Marker()
    .setLngLat([responseLong, responseLat])
    .addTo(map);

  getAddress(responseLong, responseLat);
  $("#search-input").val("");
}
function getAddress(responseLong, responseLat) {
  $.get(
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      responseLong +
      "," +
      responseLat +
      ".json?access_token=" +
      mapboxgl.accessToken,
    function (response) {
      let gigAddress = $("#address-result").text(
        "Address: " + response.features[0].place_name
      );
    }
  ).fail(function (jqXHR, textStatus, errorThrown) {
    alert("There was an error while geocoding: " + errorThrown);
  });
  printCard();
}

function printCard() {}
