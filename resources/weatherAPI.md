// Donavan's API key for OpenWeather
    var APIKey = "a981a2689a0391721cbc66577613f812";

    // URL for the weather
    https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + APIKey;

    // Rough Ajax
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log("Temperature (C): " + response.main.temp);
      });