"use strict";

// QUERY SELECTOR

const searchButton = document.querySelector(".js__searchButton");
const searchInput = document.querySelector(".js__searchInput");
const cardsUl = document.querySelector(".js__cardsUl");
const favouritesUl = document.querySelector(".js__favouritesUl");

// DATOS

// FUNCIONES

// FUNCIONES DE EVENTOS

function clickButton(ev) {
  ev.preventDefault();

  console.log(searchInput.value);
}

// EVENTOS

searchButton.addEventListener("click", clickButton);

// CÓDIGO CUANDO CARGA LA PÁGINA

const singleItem = {
  _id: 112,
  films: ["Hercules (film)"],
  shortFilms: [],
  tvShows: ["Hercules (TV series)"],
  videoGames: ["Kingdom Hearts III"],
  parkAttractions: [],
  allies: [],
  enemies: [],
  sourceUrl: "https://disney.fandom.com/wiki/Achilles_(Hercules)",
  name: "Achilles",
  imageUrl:
    "https://static.wikia.nocookie.net/disney/images/d/d3/Vlcsnap-2015-05-06-23h04m15s601.png",
  createdAt: "2021-04-12T01:31:30.547Z",
  updatedAt: "2021-12-20T20:39:18.033Z",
  url: "https://api.disneyapi.dev/characters/112",
  __v: 0,
};

cardsUl.innerHTML = `
<li class="card_item">
<img class="card_img" src=${singleItem.imageUrl}>
<p class="card_title">${singleItem.name}</p></li>`;

//  ev.preventDefault();
