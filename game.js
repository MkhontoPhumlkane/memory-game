const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...letters, ...letters];
cards = cards.sort(() => 0.5 - Math.random()); 


const board = document.getElementById('game-board');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function createCard(letter) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.letter = letter;
  card.innerHTML = `<span>${letter}</span>`;

  card.addEventListener('click', () => {
    if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      lockBoard = true;

      const match = firstCard.dataset.letter === secondCard.dataset.letter;

      if (match) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;

        resetTurn();

        if (matchedPairs === 8) {
          setTimeout(() => alert('🎉 You win! All pairs matched.'), 300);
        }
      } else {
        setTimeout(() => {
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
          resetTurn();
        }, 1000);
      }
    }
  });

  board.appendChild(card);
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

cards.forEach(letter => createCard(letter));
