var gameStarted = false;
var colors = ["green", "red", "yellow", "blue"];
var randomColorsList = [];
var playerColorsList = [];
var bestScoreList = [0];
var level = 1;

//-------------- GAME STARTER ---------------//

  $(document).on("click", function() {
    if(gameStarted === false){
    gameStarted = true;
startSequence();
    setTimeout(function() {
      nextSequence();
    }, 3000)
    }
  }
);

//-------------- RANDOM BUTTON CLICKS ---------------//

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = colors[randomNumber];

  $("#level-title").text("Level " + level);

  randomColorsList.push(randomColor);
  setTimeout(function() {
    buttonAnimation(randomColor);
    playSound(randomColor);
  }, 500)

};

//-------------- PLAYER BUTTON CLICKS ---------------//

$(".btn").on("click", function (event) {

  var selectedColor = event.currentTarget.id;

  if(gameStarted === true){
    playerColorsList.push(selectedColor);

    buttonAnimation(selectedColor);
    playSound(selectedColor);
    answerCheck(playerColorsList.length - 1);
    }
  }
);

//-------------- ANSWER CHECK ---------------//

function answerCheck(currentLevel){
  if(playerColorsList[currentLevel] === randomColorsList[currentLevel]) {
    if(playerColorsList.length === randomColorsList.length){
      level++;
      setTimeout(function () {
        playerColorsList = [];
        nextSequence();
      }, 1000);
    }
  } else {
      $("body").css("background-color", "red");
      setTimeout(function () {
        $("body").css("background-color", "#011F3F");
      }, 100);
      $("#level-title").text("Whoops! Press a key to try again...");
      bestScoreKeeper();
      gameReset();
      playSound("wrong");
  }
}

//-------------- GAME RESET ---------------//

function gameReset() {
  gameStarted = false;
  randomColorsList = [];
  playerColorsList = [];
  level = 1;
}


//-------------- BEST SCORE KEEPER ---------------//

function bestScoreKeeper() {
  var bestScore = bestScoreList[bestScoreList.length - 1];

  if(level > bestScore){

    bestScoreList.push(level - 1);

    $("#best-score").text("Best score : " + bestScoreList[bestScoreList.length - 1]);
  }
}

//-------------- PLAY SOUND ---------------//

function playSound(sound){
  var audio = new Audio("sounds/" + sound + ".mp3");
  return audio.play();
};

//-------------- BUTTON ANIMATION ---------------//

function buttonAnimation(color){
$("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
};

//-------------- START SEQUENCE ---------------//

function startSequence() {
  playSound("green");
  buttonAnimation("green");
  setTimeout(function () {
    playSound("red");
    buttonAnimation("red");
  }, 200);
  setTimeout(function () {
    playSound("blue");
    buttonAnimation("blue");
  }, 400);
  setTimeout(function () {
    playSound("yellow");
    buttonAnimation("yellow");
  }, 600);
  setTimeout(function () {
    playSound("green");
    buttonAnimation("green");
    playSound("red");
    buttonAnimation("red");
    playSound("blue");
    buttonAnimation("blue");
    playSound("yellow");
    buttonAnimation("yellow");
  }, 800);
}
