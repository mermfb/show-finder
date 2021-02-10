"use strict";const formElement=document.querySelector(".form"),inputElement=document.querySelector(".input"),buttonElement=document.querySelector(".searchButton"),resultSectionElement=document.querySelector(".resultsection"),favoritesSectionElement=document.querySelector(".favoritessection"),resetButton=document.querySelector(".resetButton");let shows=[],favorites=[];function getDataFromApi(){event.preventDefault();const e=inputElement.value;fetch("http://api.tvmaze.com/search/shows?q="+e).then(e=>e.json()).then(e=>{shows=e,paintShows()})}const list=document.createElement("ul");function paintShows(){list.innerHTML="";for(let e of shows){let t;t=isFavoriteShow(e)?"show--favorite":"";const o=e.show.id,n=e.show.name,s=document.createElement("li");s.setAttribute("class",t+" js-show"),s.setAttribute("id",o),list.appendChild(s);const i=document.createElement("h3");let a=document.createTextNode(n);i.appendChild(a),s.appendChild(i);let r=document.createElement("img");null===e.show.image?r.src="https://via.placeholder.com/210x295/ffffff/666666/?\n        text=TV":null===e.show.image.medium?r.src=e.show.image.original:r.src=e.show.image.medium,s.appendChild(r)}listenShowsEvents()}function isFavoriteShow(e){return void 0!==favorites.find(t=>t.show.id===e.show.id)}function paintFavorites(){favoritesSectionElement.innerHTML="";const e=document.createElement("ul"),t=document.createElement("h2"),o=document.createTextNode("Mis series favoritas");t.appendChild(o),favoritesSectionElement.appendChild(t),favoritesSectionElement.appendChild(e);for(const t of favorites){let o;const n=t.show.id,s=t.show.name;o="show--favorite";const i=document.createElement("li");i.setAttribute("class","favoriteItem"),i.setAttribute("id",n),e.appendChild(i);const a=document.createElement("div");a.setAttribute("class","favoriteButton"),i.appendChild(a);const r=document.createTextNode("X");a.appendChild(r);const c=document.createElement("h3");let l=document.createTextNode(s);c.setAttribute("class","favoriteTitle"),c.appendChild(l),i.appendChild(c);let d=document.createElement("img");null===t.show.image?d.src="https://via.placeholder.com/210x295/ffffff/666666/?\n      text=TV":null===t.show.image.medium?d.src=t.show.image.original:d.src=t.show.image.medium,i.appendChild(d)}listenFavoritesEvents()}function listenShowsEvents(){const e=document.querySelectorAll(".js-show");for(let t of e)t.addEventListener("click",handleShow);saveInLocalStorage()}function listenFavoritesEvents(){const e=document.querySelectorAll(".favoriteItem");for(let t of e)t.addEventListener("click",handleShow);saveInLocalStorage()}function handleShow(e){const t=parseInt(e.currentTarget.id);console.log("id del show clickado",t);const o=favorites.findIndex((function(e){return e.show.id===t}));shows.find((function(e){return e.show.id===t}));if(-1===o){const e=shows.find((function(e){return e.show.id===t}));console.log(e),favorites.push(e),console.log("Mis favoritas",favorites)}else favorites.splice(o,1);paintShows(),paintFavorites()}function resetFavorites(){favorites=[],paintFavorites(),saveInLocalStorage(),console.log("FAVORITOS CON RESET",favorites)}function saveInLocalStorage(){const e=JSON.stringify(favorites);localStorage.setItem("favorites",e)}function getFromLocalStorage(){const e=localStorage.getItem("favorites");if(null!==e){const t=JSON.parse(e);favorites=t,paintShows()}}list.setAttribute("class","js-showlist"),resultSectionElement.appendChild(list),buttonElement.addEventListener("click",getDataFromApi),getFromLocalStorage(),paintFavorites(),resetButton.addEventListener("click",resetFavorites);