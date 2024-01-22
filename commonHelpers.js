import{s as q,a as w,i as c}from"./assets/vendor-dbdbd0f5.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const S=document.querySelector(".form"),v=document.querySelector("#input"),h=document.querySelector(".gallery"),l=document.querySelector(".loader");l.style.display="none";let k=new q("ul.gallery a",{captionDelay:250,captionsData:"alt"});const E="41708533-f63d2cf4b74729d1361203347";let f="",d=1;const b=40,i=document.querySelector(".load-more");i.style.display="none";const L=()=>new URLSearchParams({key:E,q:f,image_type:"photo",orientation:"horizontal",safesearch:!0,page:d,per_page:b});w.defaults.baseURL="https://pixabay.com";const $="/api/";S.addEventListener("submit",async o=>{if(o.preventDefault(),d=1,h.innerHTML="",i.style.display="none",f=v.value.trim(),f!==""){l.style.display="block",v.value="";try{const s=await w.get($,{params:L()});l.style.display="none";const r=s.data;if(r.hits.length===0)throw c.show({message:"Sorry, there are no images matching your search query. Please try again!",theme:"dark",backgroundColor:"#EF4040",titleColor:"white",position:"topRight"});const a=r.hits.reduce((e,{webformatURL:t,largeImageURL:n,tags:p,likes:y,views:u,comments:m,downloads:g})=>e+`<li class="gallery-item">
        <div class="card">
          <a class="gallery-link" href="${n}">
           <img class="gallery-image"
           src="${t}"
           alt="${p}"
           />
          </a>
          </div>          
          <div class="description">
          <p>Likes:<span>${y}</span></p>
          <p>Views:<span>${u}</span></p>
          <p>Comments:<span>${m}</span></p>
          <p>Downloads:<span>${g}</span></p>
          </div> 
        </li>`,"");h.insertAdjacentHTML("beforeend",a),r.hits.length>=b&&(i.style.display="block"),k.refresh()}catch(s){l.style.display="none",c.error({message:s.message,color:"red",position:"topCenter"}),console.error("Error fetching data:",s)}}});i.addEventListener("click",async()=>{l.style.display="block",d++;try{const o=await w.get($,{params:L()});l.style.display="none";const s=o.data,r=b*d-40,a=s.totalHits-r;if(a<=0)throw i.style.display="none",c.show({message:"We're sorry, but you've reached the end of search results.",theme:"dark",backgroundColor:"#EF4040",titleColor:"white",position:"topRight"});const e=s.hits.reduce((t,{webformatURL:n,largeImageURL:p,tags:y,likes:u,views:m,comments:g,downloads:C})=>t+`<li class="gallery-item"><div class="card">
          <a class="gallery-link" href="${p}">
           <img class="gallery-image"
           src="${n}"
           alt="${y}"
           />
          </a></div>         
          <div class="description">
            <p>Likes:<span>${u}</span></p>
            <p>Views:<span>${m}</span></p>
            <p>Comments:<span>${g}</span></p>
            <p>Downloads:<span>${C}</span></p>
          </div> 
        </li>`,"");if(h.insertAdjacentHTML("beforeend",e),P(),k.refresh(),a<=40)throw i.style.display="none",c.show({message:"We're sorry, but you've reached the end of search results.",theme:"dark",backgroundColor:"#6C8CFF",titleColor:"white",position:"topRight"})}catch(o){l.style.display="none",c.error({message:o.message,color:"red",position:"topCenter"}),console.error("Error fetching more data:",o)}});const P=()=>{const s=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})};
//# sourceMappingURL=commonHelpers.js.map
