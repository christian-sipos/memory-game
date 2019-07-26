/*
 * Create a list that holds all of your cards
 */

let cardlist = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o",
   "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-cube",
   "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle",
   "fa fa-bomb", "fa fa-bomb", "fa fa-bolt", "fa fa-bolt"];

let openCards = [];

let clickNumber = 0;

const deck = document.querySelector('.deck');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
console.log(cardlist); // check if shuffle works



// Function to create cards with classes from cardlist
function init() {
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

// Function to show icon after click on card
function showCard(ev) {
    let cardClicked = ev.target;
    cardClicked.className = "card show";
    cardClicked.removeEventListener('click', showCard);
    openCards.push(cardClicked.firstChild.className);
    console.log(openCards);
    clickNumber ++;
    if (openCards.length === 2) {
      if (openCards[0] !== openCards[1]) {
        openCards.length = 0;
        console.log("cards do not match");
        setTimeout(twoCardsReset, 1000);
        let cardClasses = deck.childNodes;
        function twoCardsReset() {
          for (i = 0; i < cardClasses.length; i++) {
            if (cardClasses[i] = "li.card.show") {
              cardClasses[i].className = "card";
              cardClasses[i].parentElement.addEventListener('click', showCard);
            }
          }
          console.log(cardClasses);
        }
      } else {
          console.log("cards match");
          let cardClasses = deck.childNodes;
          setTimeout(twoCardsMatch, 1000);
          function twoCardsMatch() {
            for (i = 0; i < cardClasses.length; i++) {
              if (cardClasses[i] = "li.card.show") {
                cardClasses[i].className = "card match";
            }
          }
        }
      }
      openCards.length = 0;
    }
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
