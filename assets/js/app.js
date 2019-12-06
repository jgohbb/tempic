// main app js file //
$(document).ready(function () {

    // selects and displays random background image for the .content section via .bg class
    var bg_images = ['bg3.jpg', 'bg4.jpg', 'bg5.jpg'];
    $(".bg").css({
        'background-image': 'url(\"assets/images/' +
            bg_images[Math.floor(Math.random() * bg_images.length)] + '\")'
    });

    // converts temp C to F
    function calcFahrenheit(c) {
        return (c * (9 / 5)) + 32;
    }

    // Donavan's API key for OpenWeather
var APIKey = "a981a2689a0391721cbc66577613f812";

// URL for the OpenWeather, using imperial units.
weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIKey;

// Rough Ajax for getting tempurature from OpenWeather,
$.ajax({
  url: weatherURL,
  method: "GET"
})
// console.log the tempurature for now.
  .then(function(data) {
    console.log("Temperature (F): " + data.main.temp);
  });


// URL for the Wiki API
 var queryURL =
  "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&prop=text&page=Moscow&format=json";

  // Ajax for the Wiki API
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  // gets general city data about each location
  let firstParagraph = $(response.parse.text['*']).children("p:nth-of-type(2)").text();
  $(".infoOutput").html(firstParagraph);
  console.log(firstParagraph)
});

  // MODAL START
  // Section from here be delected to link game functions
  $("#myBtn").on("click", function() {
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
      
      $(".btn").on("click", function() {
          modal.style.display = "none";
      });
  };

  window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      //  insert code for reseting game
      }
  }
  // MODAL SECTION END

    // end of document.ready
});