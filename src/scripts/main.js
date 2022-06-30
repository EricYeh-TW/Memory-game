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

const createParticle = (x, y) => {
  const particle = document.createElement('particle');
  document.body.appendChild(particle);

  const size = Math.floor(Math.random() * 20 + 5);
  particle.innerHTML = ['⭐'];
  particle.style.fontSize = `${Math.random() * 10 + 10}px`;

  const destinationX = x + (Math.random() - 0.5) * 2 * 90;
  const destinationY = y + (Math.random() - 0.5) * 2 * 90;
  const animation = particle.animate(
    [
      {
        transform: `translate(${x - size / 2}px, ${y - size / 2}px) rotate(${Math.random() - 0.5 * 90}deg)`,
        opacity: 1,
      },
      {
        transform: `translate(${destinationX}px, ${destinationY}px) rotate(${(Math.random() - 0.5) * 90 + 360}deg)`,
        opacity: 0,
      },
    ],
    {
      duration: 1000 + Math.random() * 1000,
      // 動畫時間
      easing: 'cubic-bezier(0, .9, .57, 1)',
      delay: Math.random() * 200,
      // 動畫延遲
    },
  );

  animation.onfinish = () => {
    particle.remove();
  };
};

const getParticlePosition = (first, second) => {
  const firstX = (first.getBoundingClientRect().right + first.getBoundingClientRect().left) / 2;
  const firstY = (first.getBoundingClientRect().top + first.getBoundingClientRect().bottom) / 2;
  const secondX = (second.getBoundingClientRect().right + second.getBoundingClientRect().left) / 2;
  const secondY = (second.getBoundingClientRect().top + second.getBoundingClientRect().bottom) / 2;
  for (let i = 0; i < 15; i += 1) {
    createParticle(firstX, firstY);
    createParticle(secondX, secondY);
  }
};

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

const reset = () => {
  [firstPick, secondPick, isPicked, checking] = [null, null, false, false];
};

const match = (first, second) => {
  if (firstPick.classList.value !== secondPick.classList.value) {
    checking = true;
    setTimeout(() => {
      first.classList.remove('flip');
      second.classList.remove('flip');
      reset();
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
        getParticlePosition(first, second);
      }
      reset();
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
