// Variables
var athletes = ["Bo Jackson", "Michael Jordan", "Larry Bird", "Randy Moss", "Lionel Messi"];



// Loop through array and create buttons for existing array of athletes
function createButton(){
    $("#athleteButtons").empty();
    for (var i = 0; i < athletes.length; i++) {
        //console.log(athletes[i]);
        var a = $("<button>");
        a.addClass("athleteName");
        a.attr("data-athlete", athletes[i]);
        a.text(athletes[i]);
        $("#athleteButtons").append(a);
    };
};

// Run the function so buttons are created on page load
createButton();

// On-click function for adding new athlete and pushing it to the array
$("#add-athlete").on("click", function(event) { 
    event.preventDefault();
    var newAthlete = $("#athlete-input").val().trim();
    athletes.push(newAthlete);
    createButton();
    $("#athlete-input").val("");

}); 

function displayGIFs() {

    var athletePlaceholder = $(this).attr("data-athlete");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + athletePlaceholder + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

            // Store response.data into variable results
            var results = response.data;
            console.log(results);
            
            // Loop over results and exclude content rated R or PG-13
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    
                    // Create a div for the new gif
                    var gifDiv = $("<div class='newGif'>");
                    
                    // Store the rating for gif in variable 
                    var rating = results[i].rating;
                    
                    // Create paragraph that displays gif rating
                    var p = $("<p>").text("Rating: " + rating);
                    
                    // Create image tag
                    var athleteImage = $("<img class='gifImage'>");
                    
                    // Apply on load image (still), and add attributes for still and animated image. Set default data-state to "still", and add class for targeting onClick. 
                    athleteImage.attr("src", results[i].images.fixed_height_still.url).attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-state", "still").addClass("gifImage");
                    
                    //Appending rating text and image to the created div.
                    gifDiv.append(p);
                    gifDiv.append(athleteImage);
                    
                    // Prepending div above to existing html placeholder div
                    $("#athleteGifs").prepend(gifDiv);

                };

            };
                $(".gifImage").on("click", function() {
                        var state = $(this).attr("data-state");
                            if (state === "still"){
                                $(this).attr("src", $(this).attr("data-animate"));
                                $(this).attr("data-state", "animate");
                            }

                            else {

                                $(this).attr("src", $(this).attr("data-still"));
                                $(this).attr("data-state", "still");
                            }

                    });
    });
};

$("body").on("click", ".athleteName", displayGIFs);





