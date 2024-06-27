const f=document.querySelector(".js__searchButton"),m=document.querySelector(".js__searchInput"),s=document.querySelector(".js__cardsUl"),g=document.querySelector(".js__favouritesUl");let i=[],n=[];function d(e,r=!1){let t="";r&&(t=`<a class="js__cardRemove card_remove" data-id="${e._id}">X</a>`);let a="./images/img_notfound.png";return e.imageUrl!==void 0&&(a=e.imageUrl),`
  <li class="card_item js__cardsLi" data-id="${e._id}">
  ${t}
  <img class="card_img" src=${a}>
  <p class="card_title">${e.name}</p>
  </li>`}function _(){return`
  <li class="card_item">
  <img class="card_img" src="./images/notfound.png">
  <p class="card_title">Not found :(</p>
  </li>`}function u(){let e="";if(i.length>0){for(let t=0;t<i.length;t++){let a=i[t];e+=d(a)}s.innerHTML=e;const r=document.querySelectorAll(".js__cardsLi");for(const t of r)t.addEventListener("click",p)}else e+=_(),s.innerHTML=e}function o(){let e="";for(let t=0;t<n.length;t++)e+=d(n[t],!0);g.innerHTML=e;const r=document.querySelectorAll(".js__cardRemove");for(const t of r)t.addEventListener("click",h)}function v(e){e.preventDefault(),fetch(`//api.disneyapi.dev/character?name=${m.value}`).then(r=>r.json()).then(r=>{i=r.data,u()})}function p(e){e.preventDefault();const r=parseInt(e.currentTarget.dataset.id),t=i.find(c=>c._id===r),a=n.findIndex(c=>c._id===r);a===-1?(n.push(t),localStorage.setItem("favoritos",JSON.stringify(n)),o(),e.currentTarget.classList.toggle("favourite")):(n.splice(a,1),localStorage.setItem("favoritos",JSON.stringify(n)),o(),e.currentTarget.classList.toggle("favourite"))}function h(e){e.preventDefault();const r=parseInt(e.currentTarget.dataset.id),t=n.findIndex(a=>a._id===r);t!==-1&&(n.splice(t,1),localStorage.setItem("favoritos",JSON.stringify(n)),o())}fetch("//api.disneyapi.dev/character").then(e=>e.json()).then(e=>{i=e.data,u()});const l=JSON.parse(localStorage.getItem("favoritos"));l!==null&&(n=l,o());f.addEventListener("click",v);
//# sourceMappingURL=main.js.map
