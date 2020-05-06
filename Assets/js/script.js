// Search a band by name, 
// Display location on map 
// Display venue, city, time in card below the map

//Mapbox converts address to geocode or geocode to street address

let searchResults = [];
let bandsintownKey = "cef0c58f01fb18ddece18ed752b9c2d2";
let lat;
let lon;


  renderMap()
  // // //return band in town band data from event 
  // // //object will get city, from city, we'll get geocode, geocode will then populate on map 
  // //  mapbox api
  function renderMap() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zZXBoYnJpbWV5ZXIiLCJhIjoiY2s5cHZqOGQ5MDd6ZjNtbHp1dGx0aGp1MSJ9.LFiwHWlUhkLBhQsprDvCnA';
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11',  //stylesheet location
      center: [-122.331356, 47.613245],  //starting position [lng , lat]
      zoom: 1  //starting zoom
    });
    var marker = new mapboxgl.Marker()
      .setLngLat([-122.331356, 47.613245])
      .addTo(map);


  };
  // });
      //Search band by name:
      $("#searchBtn").on("click", function (event) {
        event.preventDefault();

        searchForBand()
        // renderVenue()

      })
      //bandsintown API call.....
      function searchForBand() {
        let artistSearch = $("#search-input").val().trim();
        let bandsintownKey = "cef0c58f01fb18ddece18ed752b9c2d2";
        let queryURL = `https://bands.alex-hansen.com/artists/${artistSearch}/events/?app_id=${bandsintownKey}`;
        $.ajax({
          url: queryURL,
          method: "GET",
        }).then(function (response) {
            console.log(response);
            // return from bands in town api function to populate the card
            // $("p").text(JSON.stringify(response));

            // let addressResult = $("#address-result");
            // let cityResult = $("#city-result");
            // let timeResult = $("#time-result");
            lat = response[0].venue.latitude;
            console.log(lat);
            lon = response[0].venue.longitude;
            console.log(lon);
            renderVenue();
            
            let cardBody = $("#card-body");
            let cardRow = $("#card-row");
            //need to update response path with exact location of data from object - all response paths below are placeholders
            let bandNameCard = $("#band-result").text(response[0].artist.name);
            console.log(response[0].artist.name);
            let venueCard = $("#venue-result").text("Venue: " + response[0].venue.name); 
            console.log(response[0].venue.name);
              // let addressCard = $("#address-result").text(response[0].venue);
            let cityCard = $("#city-result").text("City: " + response[0].venue.city);
            console.log(response[0].venue.city);
            let momentVar = moment().format('dddd, MMMM Do, YYYY h:mm a');
            console.log(momentVar);
           
            let gigDate = moment(response[0].datetime).format('LLL');
            $("#time-result").text(gigDate);
            console.log(response[0].datetime);

            // let gigDate = response[0].datetime.split(' ')[0];
            console.log(gigDate);
            
            // console.log(realGigDate);


            // Append the newly created data together in card
            cardRow.append(bandNameCard, venueCard, addressCard, cityCard, timeCard);
            // Append the card data to card body 
            cardBody.append(cardRow);


            });
              function renderVenue() {
                  mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zZXBoYnJpbWV5ZXIiLCJhIjoiY2s5cHZqOGQ5MDd6ZjNtbHp1dGx0aGp1MSJ9.LFiwHWlUhkLBhQsprDvCnA';
                  var map = new mapboxgl.Map({
                    container: 'map', // container id
                    style: 'mapbox://styles/mapbox/streets-v11',  //stylesheet location
                    center: [-122.331356, 47.613245],  //starting position [lng , lat]
                    zoom: 1  //starting zoom
                  });
                  var marker = new mapboxgl.Marker()
                    .setLngLat([lon, lat])
                    .addTo(map);
              
              }
        }
        