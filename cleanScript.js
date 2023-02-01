'use strict';
// VARIABLES
const playBtn = document.querySelector('#btn');
const gridContainerEL = document.querySelector('#grid');
const score = document.querySelector('#score');
const scoreboard = document.querySelector('.scoreboard');
const resetBtn=document.querySelector("#reset-game")


const gameItems = [
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

class MemoryGame {
  score = 2;
  chosenImages = [];

  constructor(gameItems) {
    // GAME ITEMS DATA
    this.gameItems = gameItems;
    //PLAY BUTTON EVENT
    playBtn.addEventListener('click', this.startGameEvent.bind(this));
    //CLICK IMAGE EVENT
    gridContainerEL.addEventListener('click', this.clickImagesEvent.bind(this));

    resetBtn.addEventListener("click" ,this.resetGameEvent.bind(this))
  }
  // PLAY BUTTON EVENT HANDLER
resetGameEvent(){
  this.resetGame()
  this.randomizeImages();
  this.createImages();
  this.showScore()
  this.hideImages(1);
}

  startGameEvent(e) {
    this.randomizeImages();
    this.createImages();
    this.showScore()
    this.hideImages(1);
  }
  // CREATE IMAGES FROM ARRAY
  createImages() {
    playBtn.textContent = 'Shuffle';
    gridContainerEL.innerHTML = '';
    gridContainerEL.classList.remove('hidden');
    this.gameItems.forEach((item, i) => {
      const img = document.createElement('img');
      img.setAttribute('src', item.img);
      img.setAttribute('id', i);
      img.setAttribute('class', 'nomatch');
      gridContainerEL.append(img);
      playBtn.disabled = true;
    });
  }
  // MAKE ARRAY OF IMAGES RANDOM
  randomizeImages() {
    this.gameItems.sort(() => 0.5 - Math.random());
  }

  hideImages(sec) {
    const [...images] = document.querySelectorAll('.nomatch');
    console.log(images[0]);
    setTimeout(function () {
      const imagesss = images.filter(img => img.classList.contains('nomatch'));
      imagesss.forEach(img => img.setAttribute('src', 'images/blank.png'));
      playBtn.disabled = false;
    }, sec * 1000);
  }
  showScore(){
    scoreboard.classList.remove("hidden")
    score.innerHTML=this.score
  }
  // CLICK IMAGES EVENT HANDLER
  clickImagesEvent(e) {
    // RETURN WHATEVER IS NOT A IMAGE
    if (!e.target.closest('#grid img')) return;

    // TAKES CLICK ID AND PUT THE ITEM FROM GAMEITEMS
    const clickedId = e.target.getAttribute('id');

    // WHEN IMAGE IS CLICKED SET THE SRC TO IMAGE SO IT APPEARS
    e.target.setAttribute('src', this.gameItems[clickedId].img);
    const id = e.target.getAttribute('id');
    const src = e.target.getAttribute('src');
    this.chosenImages.push({ id, src });
    console.log(this.chosenImages);
    // GUARD MEXRI TO CHOSEN ARRAY HAS 2 DATA
    if (this.chosenImages.length !== 2) return;
    // IF MATCH - IMAGES STAY VISIBLE
    if (
      this.chosenImages[0].src === this.chosenImages[1].src &&
      this.chosenImages[0].id !== this.chosenImages[1].id
    ) {
      console.log(this.chosenImages[0].id);
      const image1 = document.getElementById(`${this.chosenImages[0].id}`);
      const image2 = document.getElementById(`${this.chosenImages[1].id}`);
      image1.setAttribute('class', 'match');
      image2.setAttribute('class', 'match');
    }

    // IF NO MATCH - IMAGES HIDE
    if (this.chosenImages[0].src !== this.chosenImages[1].src) {
      console.log(this.chosenImages);
      this.hideImages(0.8);
      this.score--
      this.showScore()
      // this.chosenImages = [];
    }
    // IF ID'S ARE THE SAME,CLICKED SAME IMG 2 TIMES
    if (this.chosenImages[0].id === this.chosenImages[1].id) {
      this.hideImages(0.8);
    }

    // RESET CHOSEN ARRAY
    this.chosenImages = [];
    if(this.score===0) {
      this.loseGame()
    }
  }

  loseGame(){
    document.body.style.background="red"
    scoreboard.style.display="none"
    gridContainerEL.style.display="none"
    playBtn.innerText=`YOU LOST!!!`
    playBtn.disabled=true
    resetBtn.style.display="block"
    gridContainerEL.removeEventListener("click",this.clickImagesEvent.bind(this) )
  }

  resetGame(){
    scoreboard.style.display="grid"
    this.score=2
    resetBtn.style.display="none"
    playBtn.innerText=`shuffle`
    document.body.style.background="#ff440080"
    gridContainerEL.style.display="grid"
  }
}

const app = new MemoryGame(gameItems);
