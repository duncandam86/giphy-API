$(document).ready(function () {
    //creating array to store actions 
    //Array already had some actions
    var actionArray = ["RuPaul Charles", "Trixie Mattel", "Shangela", "Bianca Del Rio", "Raja", "Raven", "Kimchi", "Bob the Drag Queen"];


    //function to display the button of the action in the Array
    function displayGiphyButton() {
        //empty the span before add buttons
        $("#actionButton").empty();
        //create a for loop to display all the current action from the array
        for (var i = 0; i < actionArray.length; i++) {
            var actionButton = $("<button>");
            actionButton.addClass("action");
            actionButton.addClass("btn btn-success");
            actionButton.attr("type", "button");
            actionButton.attr("data-action", actionArray[i]);
            actionButton.text(actionArray[i]);
            $("#actionButton").append(actionButton);
        }
    }
    //console.log(actionButton);


    // create new function to add new action into the list
    function addAction() {
        $("#addAction").on("click", function () {
            // take the value in the input box and store in new variable
            var newAction = $("#inputAction").val().trim();
            //do not take empty input
            if (newAction == ! " ") {
                return;
            }
            //if it's not empty
            else {
                // take input from the add an action box and push into the action array
                actionArray.push(newAction);
                console.log(actionArray);
                // display it as a new button
                displayGiphyButton();
                giphyDisplay();
            }

        })
    }

    //create new function for API with an AJAX call
    function giphyDisplay() {
        //adding click even to all button

        $("button").on("click", function () {
            // create variable to store value of button
            var action = $(this).attr("data-action");
            console.log(action);
            //constructing a queryURL using the action name
            var queryURL = "https://api.giphy.com/v1/gifs/search?q="
                + action + "&api_key=rRYb44zbEG9a9yHY6jfV0gSrFV9zWQRP&limit=15";

            //performing and AJAX request with the queryURL
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                // After data has been retrieved from the request
                .then(function (response) {
                    console.log(queryURL);
                    console.log(response);
                    // empty div that giphyimages will be shown
                    $("#giphyImages").empty();
                    //storing the data from the AJAX request in the results variable
                    var results = response.data;

                    //looping through each result item
                    for (var i = 0; i < results.length; i++) {
                        //creating and storing a div tag
                        var actionDiv = $("<div>");
                        actionDiv.addClass("col-sm-4");

                        //creating a paragraph tag to store the rating
                        var pRating = $("<p>").text("Rating:" + results[i].rating);

                        //creating a image tag to store the giphy
                        var actionGiphyImage = $("<img>");
                        //add class to the img tag
                        actionGiphyImage.addClass("gif");

                        //setting the src attribute for the giphy image to propery that comes from the result item
                        actionGiphyImage.attr("src", results[i].images.fixed_height_still.url);
                        //setting the attribute for still image
                        actionGiphyImage.attr("data-still", results[i].images.fixed_height_still.url);
                        //setting the attribute for animate image
                        actionGiphyImage.attr("data-animate", results[i].images.fixed_height.url);
                        //setting the state of the image
                        actionGiphyImage.attr("data-state", "still")

                        //appending the pRating tag to the div tag
                        actionDiv.append(pRating);
                        //appending the image tag to the div tag
                        actionDiv.append(actionGiphyImage);
                        // prepend the action div to the html page 
                        $("#giphyImages").prepend(actionDiv);
                    }
                })
        })

    }
    //giphy click function 
    $(document).on("click", ".gif", function () {
        // set the state of the image and store it in the new variable
        var state = $(this).attr("data-state");
        // if the state is still, when click update to animate
        if (state === "still") {
            //set the src attribute to the animate attribute of data-animate
            $(this).attr("src", $(this).attr("data-animate"));
            // change data-state to animate
            $(this).attr("data-state", "animate");
        }
        // if the state is not still or it is animate
        else {
            // set the src attribute to the still attribute of data-still
            $(this).attr("src", $(this).attr("data-still"));
            //change data-state to still
            $(this).attr("data-state", "still");
        }
    });


    //call function
    displayGiphyButton();
    giphyDisplay();
    addAction();

})