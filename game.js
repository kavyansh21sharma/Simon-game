var buttonColours = ["red" , "blue", "green"  , "yellow"];
var gamePattern=[];
var userClickedPattern=[];


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence()
{
    var randomNumber =  Math.floor(Math.random() * 4);
    var  randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("level " + level);
    userClickedPattern = [];
}

function playSound(name)
{
    var audio = new Audio('sounds/' + name + '.mp3'); 
    audio.play();
}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

var started = false;
function handleKeyPress (event)
{
    if (!started) {
        // Call nextSequence() on the first keypress
        nextSequence();
        gameStarted = true;
        
      
    }
}
$(document).keydown(handleKeyPress);

var level = 0;

function checkAnswer(currentLevel)
{
if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
{
    console.log("sucess")
    if (userClickedPattern.length === gamePattern.length)
    {
        setTimeout(function () {
            nextSequence();
          }, 1000);
    }
} else {

    console.log("wrong");
    playSound("wrong")
    $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over , Press any key to Restart");
      startOover();
  }

}
function startOover()
{
    level = 0;
    gamePattern =[];
    started = false;
}
