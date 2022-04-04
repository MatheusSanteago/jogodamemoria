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
var i = 0; // Ao chegar em 10 finaliza o game
var clicks = 0;

function startGame() {
  images.forEach((img, i) => {
    // FOR EACH PARA COLOCAR AS IMAGENS NA TELA;
    cardHTML += `
          <div class="card">
          <img class="front-face" src="assets/images/${img}">
          <img class="back-face" data-card="${images[i].substring(
            0,
            images[i].length - 4
          )}" src="assets/images/eva-azul-brasil.jpg">
          </div>`;
  });

  cardBoard.innerHTML = cardHTML + cardHTML; // ADD + 1 vez os elementos
  shuffleImg(); // Embaralha os mesmos
}

function shuffleImg() {
  const imgBox = document.querySelectorAll(".back-face");
  const card = document.querySelectorAll(".card");
  imgBox.forEach((card) => card.addEventListener("click", flip));

  card.forEach((card) => {
    // GERA UM NUMERO ALEATORIO PARA O CARD;
    let random = Math.floor(Math.random() * 12);
    card.style.order = random;
  });
}

let firstCard, secondCard; // DECLARA 1 e 2 variavéis a para o THIS
var locked = false; // DIZ SE AS CARTAS ESTÃO TRAVADAS

function clicked(){
    var span = document.querySelector("#counter");
    span.innerHTML = `Você já fez ${++clicks} tentativas`
    console.log(clicks);
}

function flip() {
  if (locked) return false; // Trava ao ter 2 elementos selecionados
  this.classList.add("flip"); // Adiciona a class Flip para executar a animaçõa

  if (!firstCard) {
    firstCard = this;
    return false;
  }
  secondCard = this;
  verifyPair(); // Verifica se os pares são True
  clicked();
}

function verifyPair() {
  let equal = firstCard.dataset.card === secondCard.dataset.card;
  console.log(equal);
  if (equal === false) {
    disableCard(); // se não for FALSE, reseta.
  } else {
    reset(equal); // QUANDO ACERTA ELE RESETA E REMOVE A OPÇÃO DE CLICAR NO ELEMENTO
    console.log("ACERTOU");
    i++;
    if (i === 10) {
      setTimeout(() => {
        if (confirm("Você ganhou com " + clicks + " tentativas,Seu jogo será reiniciado")) {
          window.location.reload(startGame());
        }
      }, 1000);
    }
  }
}

function disableCard() {
  //RESETA AS VARIÁVÉIS APOS O ACERTO E TRAVA;
  locked = true; // quando TRUE são diferente
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    locked = false; // quando FALSE, trava a carta
    reset();
  }, 800);
}

function reset(equal = false) {
  // RESET AS VARIÁVÉIS
  if (equal) {
    // Impede que seja clicado novamente
    firstCard.removeEventListener("click", flip);
  }
  [firstCard, secondCard, locked] = [null, null, false];
}
