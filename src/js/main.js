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

function createHTMLCard(item) {
  //Variable de las los personajes
  const html = `
  <li class="card_item js__cardsLi" data-id="${item._id}">
  <img class="card_img" src=${item.imageUrl}>
  <p class="card_title">${item.name}</p>
  </li>`;
  return html;
}

function renderCharacters() {
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html += createHTMLCard(data[i]);
  }

  cardsUl.innerHTML = html;

  const cardsLiAll = document.querySelectorAll(".js__cardsLi");
  for (const oneCard of cardsLiAll) {
    oneCard.addEventListener("click", clickCard);
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
  //Pintar las Cards de favortios
  renderFavourites();
  ev.currentTarget.classList.toggle("favourite");
}

// -------------------CÓDIGO CUANDO CARGA LA PÁGINA-------------------

fetch("//api.disneyapi.dev/character")
  .then((response) => response.json())
  .then((dataFromFetch) => {
    data = dataFromFetch.data;
    renderCharacters();
  });

const favsFromLS = JSON.parse(localStorage.getItem("favs"));

if (favsFromLS !== null) {
  favourites = favsFromLS;

  renderFavourites();
}

// -------------------EVENTOS-------------------

searchButton.addEventListener("click", clickButton);

//  ev.preventDefault();
