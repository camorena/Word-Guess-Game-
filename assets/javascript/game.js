/*
    WORD GUESS GAME
    Carlos Moreno
    U of M Coding Bootcamp 02/11/2019
*/

var aWords = [
    "Hoover",
    "Truman",
    "Johnson",
    "Nixon",
    "Reagan",
    "Ford",
    "Bush",
    "Carter",
    "Clinton",
    "Bush",
    "Obama",
    "Trump",
];

var maxTries = 0;               // Max user tries 
var totTries = 0;               // Number of tries
var aLettersGuessed = [];       // User guessed words
var aWordToGuess = [];          // Word to be guessed
var gameOn = false;             // Indicate if game is on
var gameWin = false;            // Indicate if game is user win
var gameLose = false;           // Indicate if game is lose
var userWins = 0;               // User wins counter
var userLoses = 0;               // User wins counter

// Game sounds
var keySound = new Audio('assets/sounds/typewriter-key.wav');
var youWinSound = new Audio('assets/sounds/you-win.wav');
var youLoseSound = new Audio('assets/sounds/you-lose.wav');




function addLetter(id, text) {
    var wordDiv = document.getElementById("control");
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", id);
    newDiv.textContent = text;
    wordDiv.appendChild(newDiv);
}

function updateLetter(id, value) {
    var wordDiv = document.getElementById(id);
    wordDiv.textContent = value;
}

function changeImg(value) {
    var imgId = document.getElementById("header-bg");
    imgId.setAttribute("src", value);
}

function changeMsg(text, img) {
    var msgDiv = document.getElementById("game-start");
    msgDiv.textContent = text;
    var imgId = document.getElementById("header-bg");
    imgId.setAttribute("src", img);
}

function updateGuessed() {
    var letters = "";
    for (var i = 0; i < aLettersGuessed.length; i++) {
        if (aLettersGuessed[i] != "_" ) {
            letters += aLettersGuessed[i] + " ";
        }
    }
    
    var msgDiv = document.getElementById("label-letter");
    msgDiv.textContent = "Guessed Letters";
    var msgDiv = document.getElementById("letters");
    msgDiv.textContent = letters;
}

function updateStats() {
    var msgWin = document.getElementById("wins");
    msgWin.textContent = " Total wins :  " + userWins;
    var msgRem = document.getElementById("remaining");
    msgRem.textContent = " Total Guesses Remaining :  " + (maxTries - totTries);
}

function removeLetters() {

    for (var i = 0; i < aWordToGuess.length; i++) {
        elemId = "pos-" + i;
        var elem = document.getElementById(elemId);
        elem.parentNode.removeChild(elem);
    }
}


// Select word to be guessed; initialize <div>s with underscore "_" 
function start() {

    if (!gameOn) {

        var totTries = 0;

        aLettersGuessed = [];

        updateGuessed()

        updateStats();

        removeLetters();

        changeMsg("Topic : Presidents", "assets/images/header.png");

        var random = Math.floor(Math.random() * 12) + 1;

        aWordToGuess = aWords[random].split('');

        //calculate number of tries 
        maxTries = aWordToGuess.length + 6

        //Initialize guess word with underscore 
        for (var i = 0; i < aWordToGuess.length; i++) {
            aWordToGuess[i] = aWordToGuess[i].toLowerCase();
            addLetter("pos-" + i, "_");
            aLettersGuessed[i] = "_";
        }

        gameOn = true;
    }
}

// validate keys & update letters on <div> 
function guessWord() {
    if (gameOn) {
        totTries++;
        keySound.play();
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            for (var i = 0; i < aWordToGuess.length; i++) {
                var letter = aWordToGuess[i].toLowerCase();
                if (event.key === letter) {
                    aLettersGuessed[i] = letter;
                    updateGuessed()
                    updateLetter("pos-" + i, letter);
                }
            }
        }
        updateStats();
    }
}

function win() {
    // compare arrays to determine a win 
    for (var i = 0; i < aWordToGuess.length; i++) {
        if (aWordToGuess[i] != aLettersGuessed[i]) {
            return false;
        }
    }
    changeMsg("Press any key to start again!", "assets/images/you-win.png");
    youWinSound.play();
    userWins++;
    updateStats();
    totTries = 0;
    gameOn = false;
}

function lost() {
    if (totTries === maxTries) {
        changeMsg("Press any key to start again!", "assets/images/game-over.png");
        youLoseSound.play();
        userLoses++;
        updateStats();
        gameOn = false;
        totTries = 0;
    }
}

// Event listener
document.onkeydown = function (event) {

    //Select word to be guessed; initialize <div>s with underscore "_"
    start();

    //validate keys & update letters on <div> 
    guessWord();

    // Display message when user win   
    win();

    // Display message when user loose
    lost();

};

