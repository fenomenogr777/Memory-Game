'use strict';
// VARIABLES
const gridContainer = document.querySelector('#grid');
const playBtn = document.querySelector('#btn');
const winnerGame = document.querySelector('.winner');
const score = document.querySelector('.scoreboard');

// const gameItems = [
//   { name: "cheeseburger", img: "images/cheeseburger.png" },
//   { name: "fries", img: "images/fries.png" },
//   { name: "hotdog", img: "images/hotdog.png" },
//   { name: "ice-cream", img: "images/ice-cream.png" },
//   { name: "milkshake", img: "images/milkshake.png" },
//   { name: "pizza", img: "images/pizza.png" },
//   { name: "cheeseburger", img: "images/cheeseburger.png" },
//   { name: "fries", img: "images/fries.png" },
//   { name: "hotdog", img: "images/hotdog.png" },
//   { name: "ice-cream", img: "images/ice-cream.png" },
//   { name: "milkshake", img: "images/milkshake.png" },
//   { name: "pizza", img: "images/pizza.png" },
// ];

class MemoryGame {
  options = [];
  clicks = 5;
  guard;
  gameItems = [
    { name: 'cheeseburger', img: 'images/cheeseburger.png' },
    { name: 'fries', img: 'images/fries.png' },
    { name: 'hotdog', img: 'images/hotdog.png' },
    { name: 'ice-cream', img: 'images/ice-cream.png' },
    { name: 'milkshake', img: 'images/milkshake.png' },
    { name: 'pizza', img: 'images/pizza.png' },
    { name: 'cheeseburger', img: 'images/cheeseburger.png' },
    { name: 'fries', img: 'images/fries.png' },
    { name: 'hotdog', img: 'images/hotdog.png' },
    { name: 'ice-cream', img: 'images/ice-cream.png' },
    { name: 'milkshake', img: 'images/milkshake.png' },
    { name: 'pizza', img: 'images/pizza.png' },
  ];
  constructor() {
    playBtn.addEventListener('click', this.playGame.bind(this));
    gridContainer.addEventListener('click', this.clickImages.bind(this));
  }
  playGame() {
    this.randomizeGameItems();
    this.createGameItems();
    this.hideGameItems(1);
  }

  createGameItems() {
    gridContainer.innerHTML = '';
    this.gameItems.forEach((item, i) => {
      const img = document.createElement('img');
      img.setAttribute('src', item.img);
      img.setAttribute('alt', item.name);
      img.setAttribute('id', i);
      img.setAttribute('class', `nomatch`);
      gridContainer.append(img);
    });
  }

  hideGameItems(sec) {
    const [...allImages] = gridContainer.children;
    setTimeout(function () {
      const new6 = allImages.filter(item => (item.src = 'images/blank.png'));
    }, sec * 1000);
  }

  randomizeGameItems() {
    this.gameItems = this.gameItems.sort(() => 0.5 - Math.random());
  }

  clickImages(e) {
    const imagesEL = document.querySelectorAll('.nomatch');

    if (!e.target.getAttribute('alt')) return;
    const clickedImageId = e.target.getAttribute('id');
    const clickedImageSrc = e.target.getAttribute('src');
    const clickedImageAlt = e.target.getAttribute('alt');
    console.log(clickedImageId, clickedImageSrc);

    if (this.guard === clickedImageId) return;
    e.target.setAttribute('src', `images/${clickedImageAlt}.png`);
    this.options.push(this.imagesId[clickedImageId]);
    this.guard = clickedImageId;

    if (this.options.length < 2) return;

    document.querySelector('.scoreboard').innerHTML = this.clicks;
    console.log(this.clicks);
    this.winningGame();
    if (this.options[0].alt === this.options[1].alt) {
      setTimeout(this.checkMatch.bind(this), 500);
    }
    if (this.options[0].alt !== this.options[1].alt) {
      this.clicks--;
      score.innerHTML = this.clicks;
      this.options = [];
      console.log(`exases`);
      this.hideGameItems(1);
    }
  }

  checkMatch() {
    this.options.forEach(item => (item.className = 'match'));
    console.log(`kerdises`, this.options);
    this.options = [];
  }

  winningGame() {
    // console.log(this.imagesId);
    // if (this.imagesId.every((item) => item.classList.contains("nomatch"))) {
    //   const h1 = document.createElement("h1");
    //   h1.textContent = "KERDISES TO PAIXNIDI";
    //   h1.setAttribute("class", "winner");
    //   document.body.append(h1);
    //   console.log(`kerdises to paixnidi`);
    // }
  }
}

const app = new MemoryGame();
