$(document).ready(function(){

var sportsTeam = ["Texas A&M Aggies", "Dallas Cowboys", "Texas Rangers", "Dallas Stars", "Dallas Mavericks"]


function buttons(arrayToUse, classToAdd, addToArea) {

 $(addToArea).empty();

 for (i = 0; i < arrayToUse.length; i++){

 var b = $("<button>");
 b.addClass(classToAdd);
 b.attr("data-type", arrayToUse[i]);
 b.text(arrayToUse[i]);
 $(addToArea).append(b);
 console.log(b);

 }

}

$(document).on("click", ".team-button", function(){

    $("#sportsTeams").empty();
    $(".team-button").removeClass("active");
    $(this).addClass("active");

    var topic = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=9Rav83Ou7Eo52HDdCX72BtXEtk9LhWDU&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

     .then(function(response){
      var results = response.data;

      for (i = 0; i < results.length; i++){
      var teamDiv = $("<div class='sports-item'>");

      var rating = results[i].rating;

      console.log(results);

      var p = $("<p>").text("Rating: " + rating);

      var animated = results[i].images.fixed_height.url;
      var still = results[i].images.fixed_height_still.url;

      var teamImage = $("<img>");
      teamImage.attr("src", still);
      teamImage.attr("data-still", still);
      teamImage.attr("data-animate", animated);
      teamImage.attr("data-state", "still");
      teamImage.addClass("team-image");
      teamDiv.append(p);
      teamDiv.append(teamImage);
      $("#sportsTeams").append(teamDiv);

      }
      


    });

  });

  $(document).on("click", ".team-image", function(){

    var state = $(this).attr("data-state");

    if (state === "still"){

      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");

    }
    else{

        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  
    }

  });
    
  $("#addTeam").on("click", function(event){
   event.preventDefault();

   var newTeam = $("input").val();

   if (newTeam.length > 2) {

    sportsTeam.push(newTeam);

   }

     buttons(sportsTeam, "team-button", "#teamButtons")
  });

     buttons(sportsTeam, "team-button", "#teamButtons")
});