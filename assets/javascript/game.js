var listOfWords = ['record', 'vinyl', 'needle', 'turntable', 'volume',
    'phonograph', 'stereo', 'amplifier', 'analog', 'digital'];
 
const maxTries = 10;

var guessedLetters = [];
var currentWordIndex;
var currentWord = listOfWords[0];
var remainingGuesses = 0;
var gameStarted = false;
var hasFinished = false;
var wins = 0;

        // var keySounds = new Audio('./asssets/music/firework.mp3');
        // var keySounds = new Audio('./asssets/music/firework.mp3');
        // console.log(currentWord)

listOfWords.sort(function(){
    return 0.5 - Math.random()
            });
console.log(listOfWords)

function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;
    currentWordIndex = Math.floor(Math.random() * (listOfWords.length));
    
        // Clear out arrays
    guessedLetters = [];
    currentWord = [];
   
        // document.getElementById('dotsimage').src = "";
  
        // //build the current word and clear it out//
    for (var i = 0; i < listOfWords[currentWordIndex].length; i++) {
        currentWord.push('_');
}

    document.getElementById('pressKeyTryAgain').style.cssText = 'display: none';
    document.getElementById('you_lose').style.cssText = 'display: none';
    document.getElementById('win_image').style.cssText = 'display: none';

        // Sound goes here//
        // keySounds.pause

    updateDisplay();
};

function updateDisplay() {
        // console.log('update')
    document.getElementById('totalWins').innerText = wins;
    var currentWordText = '';
        // document.getElementById('currentWord').innerText = '_';
        // var currentWordText = '';
    for (var i = 0; i < currentWord.length; i++) {
        currentWordText += currentWord[i];
    }
    document.getElementById('currentWord').innerText = currentWordText;
    document.getElementById('remainingGuesses').innerText = remainingGuesses;
    document.getElementById('guessedLetters').innerText = guessedLetters;
}

function evaluateGuess(letter) {
        //array to store position of letter in string//
    var positions = [];

for (var i = 0; i < listOfWords[currentWordIndex].length; i++) {
    if (listOfWords[currentWordIndex][i] === letter) {
        positions.push(i);
    }
}

        // removing guesses //
    if (positions.length <= 0) {
        remainingGuesses--;
        } else {
        for (var i = 0; i < positions.length; i++) {
        currentWord[positions[i]] = letter;
        }
    }
}

function checkWin() {
    if (currentWord.indexOf('_') === -1) {
        document.getElementById('win_image').style.cssText = 'display: block';
        document.getElementById('pressKeyTryAgain').style.cssText = 'display: block';
        wins++;
        hasFinished = true;
    }
};

        // Check for a loss //
function checkLoss() {
    if (remainingGuesses <= 0) {
        document.getElementById('you_lose').style.cssText = "display: block";
        document.getElementById('pressKeyTryAgain').style.cssText = "display:block";
        hasFinished = true;
    }
}

        // Make a guess //
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        //checking the letter to see if it has been used//
    if (guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);
        evaluateGuess(letter);
        }
    }

};

// Event listener //
document.onkeydown = function (event) {
    console.log(guessedLetters)
    //once the game has finished, this resets with the pressing of any key.  keystroke is null//
    if (hasFinished) {
        resetGame();
        hasFinished = false;
    } else if (event.keyCode >= 65 && event.keyCode <= 90) {
        //a-z was pressed?//
        // console.log(event.key)
        makeGuess(event.key.toLowerCase());
        updateDisplay();
        checkWin();
        checkLoss();
    }
}