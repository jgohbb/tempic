base wiki API data setup

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Wiki API</title>
</head>

<body>

  <div class="infoOutput"></div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script type="text/javascript">

    var queryURL =
      "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&prop=text&page=Moscow&format=json";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      // gets general city data about each location
      let firstParagraph = $(response.parse.text['*']).children("p:nth-of-type(2)").text();
      $(".infoOutput").html(firstParagraph);
    });
  </script>

</body>

</html>