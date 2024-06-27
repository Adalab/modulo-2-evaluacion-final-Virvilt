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

function createHTMLCard(character, isFavorite = false) {
  let removeButton = "";
  if (isFavorite) {
    removeButton = `<a class="js__cardRemove card_remove" data-id="${character._id}">X</a>`;
  }
  let picture = "./images/img_notfound.png";
  if (character.imageUrl !== undefined) {
    console.log(character.imageUrl);
    picture = character.imageUrl;
  }

  //Html de los personajes
  const html = `
  <li class="card_item js__cardsLi" data-id="${character._id}">
  ${removeButton}
  <img class="card_img" src=${picture}>
  <p class="card_title">${character.name}</p>
  </li>`;

  return html;
}

function createHTMLCardNotFound() {
  //Funcion de los personajes
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
    html += createHTMLCard(favourites[i], true);
  }

  favouritesUl.innerHTML = html;

  const favouritesAll = document.querySelectorAll(".js__cardRemove");
  for (const oneFavourite of favouritesAll) {
    oneFavourite.addEventListener("click", removeFavourites);
  }

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

    //Guardar las Cards en favortios (refresh)
    localStorage.setItem("favoritos", JSON.stringify(favourites));

    //Pintar las Cards de favoritos
    renderFavourites();
    ev.currentTarget.classList.toggle("favourite");
  } else {
    favourites.splice(clickedCardFavouriteIndex, 1);

    //Guardar las Cards en favoritos (refresh)
    localStorage.setItem("favoritos", JSON.stringify(favourites));

    //Pintar las Cards de favoritos
    renderFavourites();

    ev.currentTarget.classList.toggle("favourite");
  }
}

//Funcion para eliminar cards en favoritos
function removeFavourites(ev) {
  ev.preventDefault();

  const favoriteId = parseInt(ev.currentTarget.dataset.id);
  const favouriteIndex = favourites.findIndex(
    (oneFavorite) => oneFavorite._id === favoriteId
  );
  if (favouriteIndex !== -1) {
    favourites.splice(favouriteIndex, 1);

    //Guardar las Cards en favortios (refresh)
    localStorage.setItem("favoritos", JSON.stringify(favourites));

    //Pintar las Cards de favoritos
    renderFavourites();
  }
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
