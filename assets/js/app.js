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
  // order of cities from cold to warm
  let winOrder = [];

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
      $("input").css({
        "background": "#f0c3bc",
        "font-weight": "bold",
      });
    } else {
      // toggle which page is being shown
      $(".content-inner").children(".landing-page").hide();
      $(".content-inner").children(".main-page").show();
      // update global name var
      usernameEntered = name;
      // add user name on greeting text on main page
      $(".user-name").html(usernameEntered);
      // calls main-page game setup function
      gameSetup();
    }
  });

  // main page - submit button
  $(".submit-button").on("click", function () {
    // verify user card order
    let hasWon = checkOrder();
    if (hasWon === true) {
      // trigger end modal
      alert("you just won");
    }
  });

  // checks card order against winOrder
  function checkOrder() {
    let uCardOrder = $(".card-output").children();
    let numCorrect = 0;
    for (let i = 0; i < uCardOrder.length; i++) {
      let uco = $(uCardOrder[i]).children("div:nth-child(3)").attr("value");
      if (uco === winOrder[i][0]) {
        numCorrect++;
      }
    }
    // return true if all five are in the correct order
    if (numCorrect === uCardOrder.length) {
      return true;
    }
    $(".guess-feedback").text("Cities in correct order: " + numCorrect);
  }

  // calls all the functions to run the game
  function gameSetup() {
    // call game functions
    citySelect();
    displayCards();
    setTimeout(gatherWikiData, 1000);
    setTimeout(gatherWeatherData, 1000);
    setTimeout(cityWinOrder, 4000);
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

  // displays cards on main page
  function displayCards() {
    for (let i = 0; i < numCitiesPerGame; i++) {
      $(".card-output").append("<div class='card' id='_" + i + "_' draggable='true'>" +
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
        "<div class='card-button' value='" + selectedCities[i].name + "'>More Info</div>" +
        "</div>");
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
      });
    }
  }

  // adds the wiki data to each of the selectedCities 
  function gatherWikiData() {
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
        let = firstParagraph = $(response.parse.text['*']).children("p:nth-of-type(2)").text();
        // pStripped is the paragraph with the [2] and [6] type referances removed
        let pStripped = firstParagraph.replace(/\[\d+\]/g, '');
        // add the modified paragraph to the selectedCities array
        selectedCities[i].wikiData = pStripped;
      });
    }
  }

  // orders the cities from coldest to warmest
  function cityWinOrder() {
    let currentOrder = [];
    winOrder = [];
    // loops through and adds all temps in current order
    for (let i = 0; i < selectedCities.length; i++) {
      let c_name = selectedCities[i].name;
      // ensures values are numbers
      let c_temp = parseFloat(selectedCities[i].currentTemp);
      // adds values to array
      currentOrder.push([c_name, c_temp]);
    }
    // compares actual temp values to ensure correct order
    // multiplying by 100 ensures the sort() takes the decimal points into account
    winOrder = currentOrder.sort((a, b) => a[1] * 100 - b[1] * 100);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
    // WE WILL WANT TO LEAVE THIS CONSOLE.LOG WHILE WE CODE AND TEST
    console.log("win order is: " + winOrder); // - - - - - - - - - - - - - - - //
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
  }

  // runs sortable function //
  $("#isSortable").sortable();


  // - - - - - - - - - - MODAL START - - - - - - - - - - //
  $(document).on("click", ".card-button", function (event) {
    let returnDiv = event.target;
    let dValue = $(returnDiv).attr("value");
    getCityInfo(dValue);
  });

  function getCityInfo(city) {
    for (let i = 0; i < selectedCities.length; i++) {
      if (selectedCities[i].name === city) {
        let cInfo = selectedCities[i]
        cardInfoModal(cInfo);
      }
    }
  }

  function cardInfoModal(sCityInfo) {
    $("#modal").addClass("bg-modal");
    $("#modal").html("<div class='modal-content'>" +
      sCityInfo.image +
      "<div class='modal-info'>" +
      "<h2 class='city-name'>" + sCityInfo.name + ", " + sCityInfo.country + "</h2>" +
      "<div class='m-info'>" +
      "<div class='modal-info-small f-left'>Population: " + sCityInfo.population + "</div>" +
      "<div class='modal-info-small f-right'>Annual sun: " + sCityInfo.sunshineHours + "/hrs</div>" +
      "</div>" +
      "<div class='city-details'>" + sCityInfo.wikiData + "</div>" +
      "<button type='button' class='modal-button m-btn'>Close</button></div>");
    $(".modal-content").children("img").addClass("imageModal");
  }

  $(document).on("click", ".m-btn", function () {
    $("#modal").removeClass("bg-modal");
  });

  // // *** Section to be deleted FROM here.. link game functions ***
  $("#myBtnEnd").on("click", function () {
    endModal();
  });
  // modal end game hardcoded
  let endModalTitle = "Answer is incorrect";
  let endModalText = "The correct answer was: ";
  let activeAns = "Nuuk, Tokyo, Moscow, Mexico City, Perth";
  let tryAgain = "PLAY AGAIN";
  // // *** Section to be deleted TO here.. link game functions ***

  function endModal() {
    $(".modal-end").addClass("modal-content");
    $(".modal-content").html("<div class='modal-heading'>" + endModalTitle + "</div>" +
      "<div class='details-modal'>" + endModalText + "</div>" +
      "<div class='details-modal-bold'>" + activeAns + "</div>" +
      "<button type='button' class='modal-button m-btn'>" + tryAgain + "</button>"
    );

    $(".m-btn").on("click", function () {
      modal.style.display = "none";
      window.location.reload();
    });
  };

  // optional functionality - allow reset by clicking outside the close button
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      window.location.reload();
    }
  }
  // // MODAL SECTION END
  // MODAL SECTION END


}); // end of document.ready