var listOfWords = ['record', 'vinyl', 'needle', 'turntable', 'volume',
    'phonograph', 'stereo', 'amplifier', 'analog', 'digital'];

const maxTries = 10;
const space = 'space';

var guessedLetters = [];
var currentWordIndex;
var guessingWord = [];
var remainingGuesses = 0;
var gameStarted = false;
var hasFinished = false;
var wins = 0;


function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

var length = currentWord.length;
for (var i = 0; i < length; i++) {
    console.log (length)

    if(currentWord[i] === '') {
        guessingWord.push(space);
    } else {
        guessingWord.push('_');
    }
    }
}



    // Math.floor to round down to nearest integer//
    currentWordIndex = Math.floor(Math.random() * (listOfWords.length));

    // var listOfWords = listOfWords [Math.floor(Math.random() * listOfWords.length)];
    

    // Clear out arrays//
    guessedLetters = [];
    guessingWord = [];


    // //build the guessing word and clear it out//
    // for (var i = 0; i < listOfWords[currentWordIndex].length; i++) {
    //     guessingWord.push('_');
    // }

    document.getElementById('pressKeyTryAgain').style.cssText = 'display: none';
    document.getElementById('you_lose').style.cssText = 'display: none';
    document.getElementById('win_image').style.cssText = 'display: none';

    updateDisplay();

function updateDisplay() {
    // console.log('update')


    document.getElementById('totalWins').innerText = wins;
    document.getElementById('currentWord').innerText = '_';
    // var currentWordText = '';
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById('currentWord').innerText += guessingWord[i];
        // guessingWordText += guessingWord[i];
    }
    // document.getElementById('guessingWord').innerText = guessingWordText;
    document.getElementById('remainingGuesses').innerText = remainingGuesses;
    document.getElementById('guessedLetters').innerText = guessedLetters;
}
// if(remainingGuesses <= 0) {
//     document.getElementById('you_lose').style.cssText = 'display: block';
//     document.getElementById('pressKeyTryAgain').style.cssText = 'display: block';
//     hasFinished = true;
// }

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
            guessingWord[positions[i]] = letter;
        }
    }
}
function checkWin() {
    if (guessingWord.indexOf('') === -1) {
        document.getElementById('win_image').style.cssText = 'display: block';
        document.getElementById('you_lose').style.cssText = 'display: block';
        wins++
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
    //once the game has finished, this resets with the pressing of any key.  keystroke is null//
    if (hasFinished) {
        resetGame();
        hasFinished = false;
    } else if (event.keyCode >= 65 && event.keyCode <= 90) {
        //a-z was pressed?//
        // console.log(event.key)
        makeGuess(event.key.toLowerCase());
        updateDisplay();
        //checkWin();
        //checkLoss();
    }
}