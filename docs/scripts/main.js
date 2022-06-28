// /* --gameCheck-- */
let firstPick;
let secondPick;
let isPicked = false;
let checking = false;
let totalCard = 6;
/* --Time-- */
// let interval;
// let sec = 0;
// let ten = 0;
// let appendTen = document.getElementById('ten');
// let appendSec = document.getElementById('sec');
/* --Shuffle-- */
const itemList = ['isHen', 'isDolphin', 'isDucky', 'isJellyfish', 'isSnail', 'isToad'];
const listArray = itemList.slice(0).concat(itemList);

const reset = () => [null, null, false, false];

const match = (first, second) => {
  if (firstPick.classList.value !== secondPick.classList.value) {
    checking = true;
    setTimeout(() => {
      first.classList.remove('flip');
      second.classList.remove('flip');
      [first, second, isPicked, checking] = reset();
    }, 600);
  } else {
    checking = true;
    totalCard -= 1;
    first.removeEventListener('click', gameCheck);
    second.removeEventListener('click', gameCheck);
    // checkGameTime(totalCard);
    setTimeout(() => {
      first.classList.add('match');
      second.classList.add('match');
      if (document.body.animate) {
        // getParticlePosition(first, second);
      }
      [first, second, isPicked, checking] = reset();
    }, 600);
  }
};

// eslint-disable-next-line func-names
const gameCheck = function () {
  // checkGameTime(totalCard);
  if (checking) {
    return;
  }
  if (this.classList.length > 2) {
    return;
  }
  this.classList.add('flip');
  if (!isPicked) {
    isPicked = true;
    firstPick = this;
  } else {
    secondPick = this;
    match(firstPick, secondPick);
  }
};

const shuffle = (card) => {
  listArray.sort(() => Math.random() - 0.5);
  card.classList.add(listArray[0]);
  listArray.shift();
};

const cards = document.querySelectorAll('.card');
cards.forEach((card) => {
  shuffle(card);
  card.addEventListener('click', gameCheck);
});
