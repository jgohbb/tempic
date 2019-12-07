// main app js file //
$(document).ready(function () {

  // - - - - - - - - - - GLOBAL VARS - - - - - - - - - - //
  let usernameEntered = "";
  // set time limit here
  let minLimit = 10;
  // invoking genMilliseconds() converts minLimit to milliseconds
  const genMilliseconds = () => 1000 * 60 * minLimit;
  // stores selected cities
  let selectedCities = [];

  // - - - - - - - - - - GENERAL FUNCTIONALITY - - - - - - - - - - //
  // hides the main game page on start page load
  $(".content-inner").children(".main-page").hide();

  // selects and displays random background image for the .content 
  // section via .bg class
  var bg_images = ['bg3.jpg', 'bg4.jpg', 'bg5.jpg'];
  $(".bg").css({
    'background-image': 'url(\"assets/images/' +
      bg_images[Math.floor(Math.random() * bg_images.length)] + '\")'
  });

  // converts temp C to F
  function calcFahrenheit(c) {
    return (c * (9 / 5)) + 32;
  }

  // landing page, Let's Play button
  $(".play-button").on("click", function () {
    // get entered username
    name = $(".username-input").children("input").val().trim();
    // checks for valid username input before proceeding
    if (name === "") {
      // highlights input field if blank
      $("input").css("background", "#f0c3bc");
    } else {
      // toggle which page is being shown
      $(".content-inner").children(".landing-page").hide();
      $(".content-inner").children(".main-page").show();
      // update global name var
      usernameEntered = name;
      // calls main-page game setup function
      gameSetup();
    }
  });

  // calls all the functions to run the game
  function gameSetup() {
    // call game functions
    citySelect();
    gatherWeatherData();
    gatherWikiData();
    displayCards();
  }

  // selects the five cities to be used in the game
  function citySelect() {
    numCitiesPerGame = 5;
    for (let i = 0; i < numCitiesPerGame; i++) {
      // selects a city at random
      let sCities = cities.city[Math.floor(Math.random() * cities.city.length)];
      // ensure city obj has not already been selected
      if ($.inArray(sCities.name, selectedCities) === -1) {
        selectedCities.push(sCities);
      } else {
        // recursive action
        citySelect();
      }
    }
    // - - - - // TO BE REMOVED // - - - - - //
    console.log(selectedCities);
  }

  function gatherWeatherData() {
    for (i = 0; i < selectedCities.length; i++) {

  var APIKey = "a981a2689a0391721cbc66577613f812";
  // URL for the OpenWeather
  var weatherURL = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=" +
    selectedCities[i] + "&units=metric&appid=" + APIKey;

  $.ajax({
      url: weatherURL,
      method: "GET"
    })
  // console.log the tempurature for now.
  .then(function (data) {
    console.log("Temperature (F): " + data.main.temp);
  });}
      }
   

  function gatherWikiData() {}

  function displayCards() {}


  // - - - - - - - - - - WEATHER API - - - - - - - - - - //
  // Donavan's API key for OpenWeather
  var APIKey = "a981a2689a0391721cbc66577613f812";
  let cityName = "";
  // URL for the OpenWeather
  var weatherURL = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName + "&units=metric&appid=" + APIKey;
  // Rough Ajax for getting tempurature from OpenWeather,
  // $.ajax({
  //     url: weatherURL,
  //     method: "GET"
  //   })
  // console.log the tempurature for now.
  // .then(function (data) {
  //   console.log("Temperature (F): " + data.main.temp);
  // });

  // - - - - - - - - - - WIKI API - - - - - - - - - - //
  // URL for the Wiki API
  var queryURL =
    "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&prop=text&page=Moscow&format=json";
  // Ajax for the Wiki API
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).then(function (response) {
  //   // gets general city data about each location
  //   let firstParagraph = $(response.parse.text['*']).children("p:nth-of-type(2)").text();
  //   $(".infoOutput").html(firstParagraph);
  //   console.log(firstParagraph)
  // });


  // - - - - - - - - - - MODAL START - - - - - - - - - - //
  // Section from here to be delected to link game functions
  $("#myBtn").on("click", function () {
    callModal(hText, details);
  });

  let hText = "Answer is Correct";
  let details = "The correct answer was: ";
  let activeAns = "Nuuk, Tokyo, Moscow, Mexico City, Perth";
  let close = "CLOSE";
  // To be deleted up to here

  function callModal() {
    // show modal
    $(".modal").addClass("bg-modal");
    $(".modal-inner").addClass("modal-content");
    // add content to modal
    $(".modal-content").html("<div class='modal-heading'>" + hText + "</div>" +
      "<div class='details-modal'>" + details + "</div>" +
      "<div class='details-modal-bold'>" + activeAns + "</div>" +
      "<button type='button' class='btn btn-default'>" + close + "</button>"
    );

    $(".btn").on("click", function () {
      modal.style.display = "none";
      window.location.reload();
    });
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      window.location.reload();
    }
  }
  // MODAL SECTION END


}); // end of document.ready