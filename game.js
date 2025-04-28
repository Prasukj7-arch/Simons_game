var gameStart = false;
var level = 0;

function start(){
    level = 0;
    $(document).keydown(function (event){
        console.log(event);
        if(gameStart === false && event.key === "r"){
            $("h2").text("");
            level++;
            gameStart = true;
            $("h1").text("Level "+level);
            setTimeout(function(){
                sequence();
            }, 100);
        }
    })
}

var colors = ["green","red","blue","yellow"];
var newSequence = [];

function sequence(){
    $("h1").text("Level "+level);
    level++;
    var random = Math.floor(Math.random()*4);
    var randomColour = colors[random];
    newSequence.push(randomColour);
    ScreenColour(randomColour);
}
    
$(".btn").click(function(){
    if(gameStart === false){
        errorScreen();
    }
    else{
        var clickedButton = $(this).attr("id");
        check(clickedButton);
    }   
});


var i = 0;
var succesLength = 0;
function check(clickedButton){
    if(newSequence[i] === clickedButton && i<newSequence.length){
        ScreenColour(clickedButton);
        succesLength++;
        i++;
        if(succesLength === newSequence.length){
            setTimeout(function (){
                sequence();
            }, 1000);
            succesLength = 0;
            i = 0;
        }
    }
    else{
        errorScreen();
        results(level);
        gameStart = false;
        level = 0;
        newSequence = [];
        start();
    }
}

start();

function errorScreen(){
    $("h1").text("Game Over, Press 'R' to restart" );
    $("body").addClass("red");
    setTimeout(function(){
        $("body").removeClass("red");
    }, 100);
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
}

function ScreenColour(color){
    $("#"+color).fadeOut(100).fadeIn(100);
    $("body").addClass(color);
    setTimeout(function(){
        $("body").removeClass(color);
    }, 100);
    var audio = new Audio("./sounds/"+color+".mp3");
    audio.play();
}

function results(level){
    $("h2").text("Your score is : "+ (level-2));
}
