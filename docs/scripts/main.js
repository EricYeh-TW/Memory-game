// let firstPick;
// let secondPick;
// let isPicked = false;
// let checking = false;
// let totalCard = 2;
// /* --gameCheck-- */
// let interval;
// let sec = 0;
// let ten = 0;
// let appendTen = document.getElementById('ten');
// let appendSec = document.getElementById('sec');
/* --Time-- */
const itemList = ['isHen', 'isDolphin', 'isDucky', 'isJellyfish', 'isSnail', 'isToad'];
const listArray = itemList.slice(0).concat(itemList);
// 把物品清單複製一份然後跟原本的合併
/* --Shuffle--*/

const shuffle = () => {
  const backs = document.querySelectorAll('.card-back');
  listArray.sort(() => Math.random() - 0.5);
  backs.forEach((back) => {
    back.classList.add(listArray[0]);
    listArray.shift();
  });
};

const cards = document.querySelectorAll('.card');
cards.forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('flip');
  });
});

shuffle();
