const m=document.querySelector(".js__searchButton"),c=document.querySelector(".js__searchInput"),l=document.querySelector(".js__cardsUl"),g=document.querySelector(".js__favouritesUl");let o=[],n=[];function u(e,r=!1){let t="";r&&(t=`<a class="js__cardRemove card_remove" data-id="${e._id}">X</a>`);let a="./images/img_notfound.png";return e.imageUrl!==void 0&&(console.log(e.imageUrl),a=e.imageUrl),`
  <li class="card_item js__cardsLi" data-id="${e._id}">
  ${t}
  <img class="card_img" src=${a}>
  <p class="card_title">${e.name}</p>
  </li>`}function v(){return`
  <li class="card_item">
  <img class="card_img" src="./images/notfound.png">
  <p class="card_title">Not found :(</p>
  </li>`}function f(){let e="";if(o.length>0){for(let t=0;t<o.length;t++){let a=o[t];e+=u(a)}l.innerHTML=e;const r=document.querySelectorAll(".js__cardsLi");for(const t of r)t.addEventListener("click",p)}else e+=v(),l.innerHTML=e}function s(){let e="";for(let t=0;t<n.length;t++)e+=u(n[t],!0);g.innerHTML=e;const r=document.querySelectorAll(".js__cardRemove");for(const t of r)t.addEventListener("click",h)}function _(e){e.preventDefault(),console.log(c.value),fetch(`//api.disneyapi.dev/character?name=${c.value}`).then(r=>r.json()).then(r=>{o=r.data,f()})}function p(e){e.preventDefault();const r=parseInt(e.currentTarget.dataset.id),t=o.find(i=>i._id===r),a=n.findIndex(i=>i._id===r);a===-1?(console.log("Añadir a favoritos"),n.push(t),localStorage.setItem("favoritos",JSON.stringify(n)),s(),e.currentTarget.classList.toggle("favourite")):(n.splice(a,1),localStorage.setItem("favoritos",JSON.stringify(n)),s(),e.currentTarget.classList.toggle("favourite"))}function h(e){e.preventDefault();const r=parseInt(e.currentTarget.dataset.id),t=n.findIndex(a=>a._id===r);t!==-1&&(n.splice(t,1),localStorage.setItem("favoritos",JSON.stringify(n)),s())}fetch("//api.disneyapi.dev/character").then(e=>e.json()).then(e=>{o=e.data,f()});const d=JSON.parse(localStorage.getItem("favoritos"));d!==null&&(n=d,s());m.addEventListener("click",_);
//# sourceMappingURL=main.js.map
