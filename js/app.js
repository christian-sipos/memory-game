/*
 * Create a list that holds all of your cards
 */

let cardlist = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o",
   "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-cube",
   "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle",
   "fa fa-bomb", "fa fa-bomb", "fa fa-bolt", "fa fa-bolt"];

let openCards = [];

let clickNumber = 0;

// Variable to store number of matched pairs: 8 = game win
let matchedPairs = 0;

const deck = document.querySelector('.deck');

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cardlist) {
    var currentIndex = cardlist.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardlist[currentIndex];
        cardlist[currentIndex] = cardlist[randomIndex];
        cardlist[randomIndex] = temporaryValue;
    }
    return cardlist;
}

// Call function to shuffle the cardlist
cardlist = shuffle(cardlist);

// Function to display the clicks
function clickCounter() {
    clickDisplay = document.querySelector(".moves");
    clickDisplay.innerHTML = clickNumber;
}

// Function to adjust the stars
function starsShown() {
    starsDisplay = document.querySelector(".stars");
    if (clickNumber >= 23 && starsDisplay.childElementCount == 3) {
        starsDisplay = starsDisplay.removeChild(starsDisplay.childNodes[0]);
    } else if (clickNumber >= 28 && starsDisplay.childElementCount == 2) {
        starsDisplay = starsDisplay.removeChild(starsDisplay.childNodes[0]);
      }
}

// Function to rstore the stars if reset 
function starsRestore() {
    for (i = starsDisplay.childElementCount; i < 3; i++) {
        let newStarLi = document.createElement('li');
        starsDisplay.appendChild(newStarLi);
        let newStar = document.createElement('i');
        newStar.setAttribute('class', 'fa fa-star');
        newStarLi.appendChild(newStar);
    }
}

//function to start & stop the timer
let countSek = 0;
let timer;
let timerStatus = 0;

function timedCount() {
    document.getElementById("timer").innerHTML = countSek;
    countSek = countSek + 1;
    timer = setTimeout(timedCount, 1000);
}

function startTimer() {
    if (!timerStatus) {
        timerStatus = 1;
        timedCount();
    }
}

function stopTimer() {
    if (matchedPairs == 8) {
        clearTimeout(timer);
        timerStatus = 0;
        winMessage();
    }
}

// Function to display game win message
function winMessage() {
    countSekMes = countSek - 1;
    if (confirm("You won in " + clickNumber + " Moves and needed " +
        countSekMes + " Sec. " + starsDisplay.childElementCount +
        " Stars for you! \nPress OK to restart the game.")) {
        restart();
    } else {
      console.log("Bye!");
      }
}

// Function to restart the game
function restart() {
    openCards = [];
    clickNumber = 0;
    clickCounter();
    countSek = 0;
    document.getElementById("timer").innerHTML = 0;
    starsRestore();
    matchedPairs = 0;
    shuffle(cardlist);
    oldCards = document.querySelectorAll('li.card');
    for (let i = 0; i < oldCards.length ; i++) {
		    oldCards[i].remove();
    }
    init();
}

// Assign restart function to restart button
function restartIcon() {
    restartI = document.querySelector('.restart');
    restartI.addEventListener('click', restart);
}

// Function to create cards with classes from cardlist
function init() {
    restartIcon();
    let i;
    for (i = 0; i < cardlist.length; i++) {
        let newLi = document.createElement('li');
        newLi.setAttribute('class', 'card');
        newLi.addEventListener('click', showCard);
        deck.appendChild(newLi);
        let newIcon = document.createElement('i');
        newIcon.setAttribute('class', cardlist[i]);
        newLi.appendChild(newIcon);
    }
}

// Call function to create cards with classes from cardlist
init();

// Function to show icon after click on card and check if cards match
function showCard(ev) {
    let cardClicked = ev.target;
    clickNumber ++;
    clickCounter();
    starsShown();
    startTimer();
    cardClicked.className = "card show";
    cardClicked.removeEventListener('click', showCard);
    openCards.push(cardClicked.firstChild.className);
    console.log(openCards);
    if (openCards.length === 2) {
        if (openCards[0] !== openCards[1]) {
            openCards.length = 0;
            console.log("cards do not match");
            setTimeout(twoCardsReset, 1000);
            let cardClasses = deck.childNodes;
            function twoCardsReset() {
                for (i = 0; i < cardClasses.length; i++) {
                    if (cardClasses[i].className === "card show") {
                        console.log(cardClasses[i]);
                        cardClasses[i].addEventListener('click', showCard);
                        cardClasses[i].className = "card";
                    }
                }
            }
        } else {
            console.log("cards match");
            matchedPairs ++;
            console.log(matchedPairs);
            cardClasses = deck.childNodes;
            setTimeout(twoCardsMatch, 1000);
            function twoCardsMatch() {
                for (i = 0; i < cardClasses.length; i++) {
                    if (cardClasses[i].className === "card show") {
                        cardClasses[i].className = "card match";
                    }
                }
            }
            setTimeout(stopTimer, 1100);
          }
          openCards.length = 0;
    }
}
