var listOfWords = ['record', 'vinyl', 'needle', 'turntable', 'volume',
'phonograpgh', 'stereo', 'amplifier', 'analog', 'digital'];

const maxTries = 10;

var usedLetters = [];
var guessingWordIndex;
var guessingWord = [];
var remainingGuesses = 0;
var gameStarted = false;
var hasFinished = false;
var wins = 0;

function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;


    // Math.floor to round down to nearest integer//
    wordIndex = Math.floor(Math.random() * (wordList.length));

    // Clear out arrays//
    usedLetters = [];
    guessingWord = [];

    //build the guessing word and clear it out//
    for (var i=0; i < listOfWords[wordIndex].length; i++) {
        guessingWord.push('_');
    }

    document.getElementById('pressKeyTryAgain').style.cssText= 'display: none';
    document.getElementById('you_lose').style.cssText = 'display: none';
    document.getElementById('win_image').style.cssText = 'display: none';
    
    updateDisplay();
};

    function updateDisplay (); {


    document.getElementById('totalWIns').innerText = wins;
    document.getElementById('guessingWord').innerText = '';
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById('guessingWord').innetText += guessingWord[i];
    }
    document.getElementById('remainingGuesses').innerText = remainingGuesses;
    document.getElementById('usedLetters').innerText = usedLetters;
    if (remainingGuesses <= 0) {
        document.getElementById('you_lose').style.cssText = 'display: block';
        document.getElementById('pressKeyTryAgain').style.cssText = 'display: block';
        hasFinished = true;
    }
};

    document.onkeydown = function(event) {
    //once the game has finished, this resets with the pressing of any key.  keystroke is null//
        if (hasFinished) {
            resetGame();
            hasFinished = false;
        } else {
            //a-z was pressed?//
        if(event.keyCode > 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }
        
        //checking the letter to see if it has been used//
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    updateDisplay();
    checkWin();
};

function evaluateGuess(letter) {
    //array to store o[position of letter in string//
    var positions = [];
    
    for (var i = 0; i < listOfWords[guessingWordIndex].length; i++) {
        if (listOfWords[guessingWordIndex][i] === letter) {
            positions.push(i);
        }
    }
}

if (positions.length <= 0) {
    remainingGuesses--;
    else {
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;

        }
    }
};

function checkWin() {
    if(guessingWord.indexOf('') === -1) {
        document.getElementById('win_image').style.cssText = 'display: block';
        document.getElementById('you_lose').style.cssText = 'display: block';
        wins++
        hasFinished = true;
    }
};






