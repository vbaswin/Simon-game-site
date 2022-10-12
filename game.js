var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence() {
    userClickedPattern = [];
    ++level;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4) 

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100); // as #color have .color class so no problem in interchanging 

    playSound(randomChosenColour);
    console.log("game: " + gamePattern + " user: " + userClickedPattern);
}

$(document).keypress(function() {
    if (!started) {
        nextSequence();
        started = true;
    }
})

function check(currentLevel) {
    if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) 
        startOver();
    else if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(() => {$("body").removeClass("game-over")}, 200);
    started = false;
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id"); // this.id;
    userClickedPattern.push(userChosenColour);
    check(userClickedPattern.length-1);
    playSound(userChosenColour);
    animatePress(userChosenColour)
    
});

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {$("#"+currentColour).removeClass("pressed")}, 100);
}