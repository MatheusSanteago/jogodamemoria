const cardBoard = document.querySelector("#gameBoard");

const images = [
  "bootstrap.png",
  "electron.png",
  "css.png",
  "firebase.png",
  "html.png",
  "javascript.png",
  "jquery.png",
  "mongo.png",
  "node.png",
  "react.png",
];


let cardHTML = []; 
var i = 0;
var clicks = 0;

images.forEach((img, i) => { // FOR EACH PARA COLOCAR AS IMAGENS NA TELA;
  cardHTML += `
    <div class="card">
    <img class="front-face" src="assets/images/${img}">
    <img class="back-face" data-card="${images[i].substring(0,images[i].length - 4)}" src="assets/images/eva-azul-brasil.jpg">
    </div>`;
});

cardBoard.innerHTML = cardHTML + cardHTML ; // Duplicar as imagens

const imgBox = document.querySelectorAll(".back-face");
const card = document.querySelectorAll(".card");
function shuffleImg(){
    card.forEach((card) => {
        let random = Math.floor(Math.random() * 12);
        card.style.order = random;
    })
  };
shuffleImg();

let firstCard, secondCard;
var locked = false;

function flip() {
  if (locked) return false;
  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;

    return false;
  }
  secondCard = this;
  verifyPair();
  if (firstCard && secondCard) {
  }
}

imgBox.forEach((card) => card.addEventListener("click", flip));

function verifyPair() {
  let equal = firstCard.dataset.card === secondCard.dataset.card;
  if (equal === false) {
    disableCard();
  } else {
    reset(equal); console.log(equal);
    i++
    if(i === 10){
       
        setTimeout(()=>{
            if(confirm('Você ganhou,Seu jogo será reiniciado')){
                window.location.reload();
            }
        },2000)
    }
  }
 
}
function disableCard() {
  locked = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    locked = false;
    reset();
  }, 800);
}

function reset(equal = false) {
    if(equal){
        firstCard.removeEventListener("click",flip)
    }
    [firstCard,secondCard, locked] = [null, null, false]
}

