"use strict";

// -------------------QUERY SELECTOR-------------------

const searchButton = document.querySelector(".js__searchButton");
const searchInput = document.querySelector(".js__searchInput");
const cardsUl = document.querySelector(".js__cardsUl");
const favouritesUl = document.querySelector(".js__favouritesUl");

// -------------------DATOS-------------------

let data = [];
let favourites = [];

// -------------------FUNCIONES-------------------

function createHTMLCard(character) {
  //Variable de las los personajes
  const html = `
  <li class="card_item js__cardsLi" data-id="${character._id}">
  <img class="card_img" src=${character.imageUrl}>
  <p class="card_title">${character.name}</p>
  </li>`;
  return html;
}

function createHTMLCardNotFound() {
  //Variable de las los personajes
  const html = `
  <li class="card_item">
  <img class="card_img" src="./images/notfound.png">
  <p class="card_title">Not found :(</p>
  </li>`;
  return html;
}

function renderCharacters() {
  let html = "";

  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      let character = data[i];
      html += createHTMLCard(character);
    }

    cardsUl.innerHTML = html;

    const cardsLiAll = document.querySelectorAll(".js__cardsLi");
    for (const oneCard of cardsLiAll) {
      oneCard.addEventListener("click", clickCard);
    }
  } else {
    html += createHTMLCardNotFound();
    cardsUl.innerHTML = html;
  }
}
//Funcion para "render" favoritos
function renderFavourites() {
  let html = "";
  for (let i = 0; i < favourites.length; i++) {
    html += createHTMLCard(favourites[i]);
  }

  favouritesUl.innerHTML = html;

  // const cardsLiAll = document.querySelectorAll(".js__cardsLi");
  // for (const oneCard of cardsLiAll) {
  //   oneCard.addEventListener("click", clickCard);
  // }
}

// -------------------FUNCIONES DE EVENTOS------------------

function clickButton(ev) {
  ev.preventDefault();

  console.log(searchInput.value);
  fetch(`//api.disneyapi.dev/character?name=${searchInput.value}`)
    .then((response) => response.json())
    .then((dataFromFetch) => {
      data = dataFromFetch.data;
      renderCharacters();
    });
}
//Funcion para favoritos
function clickCard(ev) {
  ev.preventDefault();

  const clickedCardId = parseInt(ev.currentTarget.dataset.id);

  const clickedCard = data.find((oneCard) => oneCard._id === clickedCardId);

  const clickedCardFavouriteIndex = favourites.findIndex(
    (oneCard) => oneCard._id === clickedCardId
  );

  if (clickedCardFavouriteIndex === -1) {
    console.log("Añadir a favoritos");
    favourites.push(clickedCard);
  } else {
    favourites.splice(clickedCardFavouriteIndex, 1);
    console.log("Eliminar de favoritos");
  }
  //Guardar las Cards en favortios (refresh)
  localStorage.setItem("favoritos", JSON.stringify(favourites));

  //Pintar las Cards de favoritos
  renderFavourites();
  ev.currentTarget.classList.toggle("favourite");
}

// ------------------- CÓDIGO CUANDO CARGA LA PÁGINA -------------------

fetch("//api.disneyapi.dev/character")
  .then((response) => response.json())
  .then((dataFromFetch) => {
    data = dataFromFetch.data;
    renderCharacters();
  });

const favsFromLS = JSON.parse(localStorage.getItem("favoritos"));

if (favsFromLS !== null) {
  favourites = favsFromLS;

  renderFavourites();
}

// -------------------EVENTOS-------------------

searchButton.addEventListener("click", clickButton);

//  ev.preventDefault();
