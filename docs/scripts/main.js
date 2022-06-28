// /* --gameCheck-- */
let firstPick;
let secondPick;
let isPicked = false;
let checking = false;
let totalCard = 6;
/* --Time-- */
let interval;
let sec = 0;
let ten = 0;
const appendTen = document.querySelector('.time-tens');
const appendSec = document.querySelector('.time-second');
/* --Shuffle-- */
const itemList = ['isHen', 'isDolphin', 'isDucky', 'isJellyfish', 'isSnail', 'isToad'];
const listArray = itemList.slice(0).concat(itemList);

const stopWatch = () => {
  ten += 1;
  if (ten <= 9) {
    appendTen.innerHTML = `0${ten}`;
  }
  if (ten > 9) {
    appendTen.innerHTML = ten;
  }
  if (ten > 99) {
    sec += 1;
    appendSec.innerHTML = `0${sec}`;
    ten = 0;
    appendTen.innerHTML = `0${0}`;
  }
  if (sec > 9) {
    appendSec.innerHTML = sec;
  }
};

const checkGameTime = (total) => {
  if (total === 0) {
    clearInterval(interval);
  } else {
    clearInterval(interval);
    interval = setInterval(stopWatch, 10);
  }
};

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
    checkGameTime(totalCard);
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

const gameCheck = function () {
  checkGameTime(totalCard);
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
