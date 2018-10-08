$(document).ready(function () {
    //creating array to store actions 
    //Array already had some actions
    var actionArray = ["jumping", "running", "walking", "catching", "singing", "kissing", "spooning", "lazysleeping"];
    var actionIndex = 0

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
            actionButton.attr("id", actionArray[i]);
            actionButton.text(actionArray[i]);
            var newbutton = $("#actionButton").append(actionButton);
        }
    }
    //console.log(actionButton);
    //call displayGiphyButton function
    displayGiphyButton();

    // create new function to add new action into the list
    function addAction() {
        $("#addAction").on("click", function () {
            // take the value in the input box and store in new variable
            var newAction = $("#inputAction").val().trim();
            //do not take empty input
            if (newAction ==! " ") {
                return;
            }
            //if it's not empty
            else {
                // take input from the add an action box and push into the action array
                actionArray.push(newAction);
                //console.log(actionArray);
                // display it as a new button
                displayGiphyButton();
            }
        })
    }
    //call addAction
    addAction();
    

    //create new function for API with an AJAX call





















})