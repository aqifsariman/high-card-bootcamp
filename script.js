
let playersTurn = 1; // matches with starting instructions
let player1Card;
let player2Card;
let container1;
let innerContainer1;
let container2;
let innerContainer2;
let player1Hand =[];
let player2Hand =[];
let canClick = true;
let difference1 =0;
let difference2 =0;

const gameInfo = document.createElement('h2');
gameInfo.classList.add('game-message')
document.body.appendChild(gameInfo)
// fill game info div with starting instructions
gameInfo.innerText = "It's player 1's turn. Click to draw a card!";
document.body.appendChild(gameInfo);

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['❤', '♦', '♣', '♠'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }
      
      if (currentSuit === '❤' || currentSuit ==='♦'){
        var color = 'red';
      } else if (currentSuit === '♠' || currentSuit === '♣'){
        var color = 'black'
      }

      
      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        cardColor: color
      };
      

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());

const sortArray = (array) => {
  array.sort((a,b) =>b - a);
};

const rankDiff = (array) => {
  sortArray(array);
  const rankDifference = array[0] - array[array.length - 1];
  return rankDifference;
}

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit',cardInfo.cardColor);
  suit.innerText = cardInfo.suit;
  const name = document.createElement('div');
  name.classList.add('name');
  name.innerText = cardInfo.name;
  const card = document.createElement('div');
  card.classList.add('card');
  card.appendChild(name);
  card.appendChild(suit);
  return card;
};

const createCard2 = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit',cardInfo.cardColor);
  suit.innerText = cardInfo.suit;
  const name = document.createElement('div');
  name.classList.add('name');
  name.innerText = cardInfo.name;
  const card = document.createElement('div');
  card.classList.add('card2');
  card.appendChild(name);
  card.appendChild(suit);
  return card;
};

const output =(message) => {
  gameInfo.innerText = message;
}

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const player1Click = () => {
  if (playersTurn === 1 && canClick === true) {
    canClick = false;
    setTimeout(() => {
      player1Card = deck.pop();
      player1Hand.push(player1Card.rank)
      const cardElement = createCard(player1Card);
      // in case this is not the 1st time
      // in the entire app,
      container1.appendChild(cardElement) 
      canClick = true;
    }, 2000);
  } 
};

const player2Click = () => {
  if (playersTurn === 2 && canClick === true) {
    canClick = false;
    setTimeout(() => {
      const player2Card = deck.pop();
      player2Hand.push(player2Card.rank)
      const cardElement = createCard2(player2Card);
      container2.appendChild(cardElement) 
      difference1 = rankDiff(player1Hand);
      difference2 = rankDiff(player2Hand);
      console.log(difference1)
      console.log(difference2)
      if (difference1 > difference2){
      output('Player 1 wins!')
      } else if (difference1 < difference2){
      output('Player 2 wins!')
    } else if ( difference1 == difference2){
      output("its a tie!")
    
    } 
    canClick = true;
    }, 2000);
  }
};

const initGame = () => {
for (i=0;i<1;i++){

container1= document.createElement('div');
container1.classList.add('p1container') 
document.body.appendChild(container1)

innerContainer1=document.createElement('div')

const player1Button = document.createElement('button');
player1Button.classList.add('p1button')
player1Button.innerText = 'Player 1 Draw';
innerContainer1.appendChild(player1Button)
container1.appendChild(innerContainer1)

const player1EndButton = document.createElement('button');
player1EndButton.classList.add('p1button')
player1EndButton.innerText = 'Player 1 End'
innerContainer1.appendChild(player1EndButton)
container1.appendChild(innerContainer1)

container2=document.createElement('div')
container2.classList.add('p2container')
document.body.appendChild(container2)

innerContainer2=document.createElement('div')

const player2Button = document.createElement('button');
player2Button.classList.add('p2button')
player2Button.innerText = 'Player 2 Draw';
innerContainer2.appendChild(player2Button)
container2.appendChild(innerContainer2)
player2Button.disabled= true;

const player2EndButton = document.createElement('button');
player2EndButton.classList.add('p2button')
player2EndButton.innerText = 'Player 2 End'
innerContainer2.appendChild(player2EndButton)
container2.appendChild(innerContainer2)
player2EndButton.disabled= true;





  // initialize button functionality
/* 
document.body.appendChild(player1Button);


document.body.appendChild(player1EndButton);


document.body.appendChild(player2Button);


document.body.appendChild(player2EndButton); */
  
/* cardContainer = document.createElement('div');
cardContainer.classList.add('card-container');
document.body.appendChild(cardContainer); */




player1Button.addEventListener('click', player1Click);
player2Button.addEventListener('click', player2Click);
player1EndButton.addEventListener('click', function(){ 
    playersTurn = 2
    player2Button.disabled= false;
    player2EndButton.disabled= false;
    player1Button.disabled= true;
    player1EndButton.disabled= true;
    gameInfo.innerText = "It's Player 2's turn now. Click to draw a card!"
  
  });
player2EndButton.addEventListener('click', function(){ 
    playersTurn = 1
    player2Button.disabled= true;
    player2EndButton.disabled= true;
    player1Button.disabled= false;
    player1EndButton.disabled= false;
    gameInfo.innerText = "It's Player 1's turn now. Click to draw a card!"
  });
}
};

initGame();