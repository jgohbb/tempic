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
  // set card generation limit
  let numCitiesPerGame = 5;

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
    displayCards();
    setTimeout(gatherWikiData, 1000);
    setTimeout(gatherWeatherData, 1000);
  }

  // selects the five cities to be used in the game
  function citySelect() {
    while (selectedCities.length < numCitiesPerGame) {
      // selects a city at random
      let sCities = cities.city[Math.floor(Math.random() * cities.city.length)];
      // ensure city obj has not already been selected
      if ($.inArray(sCities, selectedCities) === -1) {
        // if not in the array - adds it to the array
        selectedCities.push(sCities);
      }
    }
  }

  // adds the temp data (C) to each of the selectedCities 
  function gatherWeatherData() {
    var APIKey = "a981a2689a0391721cbc66577613f812"; // Donavan's API key
    // loops through the selected cities list and makes a call for each city
    for (let i = 0; i < selectedCities.length; i++) {
      // OpenWeather url
      weatherURL = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=" +
        selectedCities[i].name + "&units=metric&appid=" + APIKey;
      $.ajax({
        url: weatherURL,
        method: "GET"
        // waits for resonse and then adds temp data to the city
      }).then(function (response) {
        let temp = response.main.temp;
        selectedCities[i].currentTemp = temp;
        console.log(selectedCities);
      });
    }
  }

  // adds the wiki data to each of the selectedCities 
  function gatherWikiData() {
    let firstParagraph = "";
    // loops through the selected cities list and makes a call for each city
    for (let i = 0; i < selectedCities.length; i++) {
      var queryURL =
        "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&prop=text&page=" +
        selectedCities[i].name + "&format=json";
      $.ajax({
        url: queryURL,
        method: "GET"
        // waits for resonse and then parses and adds the data to the city
      }).then(function (response) {
        // gets general city data about each location
        firstParagraph = $(response.parse.text['*']).children("p:nth-of-type(2)").text();
        selectedCities[i].wikiData = firstParagraph;
      });
    }
  }

  // displays cards on main page
  function displayCards() {
    for (let i = 0; i < numCitiesPerGame; i++) {
      $(".card-output").append("<div class='card'>" +
        "<div class='card-image'>" + selectedCities[i].image + "</div>" +
        "<div class='card-data'>" +
        "<div class='city'>" + selectedCities[i].name + "</div>" +
        "<div class='country'>" + selectedCities[i].country + "</div>" +
        "<div class='population mk-block'>" +
        "<span class='f-left'>Pop:</span>" +
        "<span class='f-right'>" + selectedCities[i].population + "</span>" +
        "</div>" +
        "<div class='annual-sun  mk-block'>" +
        "<span class='f-left'>Sun:</span>" +
        "<span class='f-right'>" + selectedCities[i].sunshineHours + "</span>" +
        "</div>" +
        "</div>" +
        "<div class='card-button'>More Info</div>" +
        "</div>");
    }
  }

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