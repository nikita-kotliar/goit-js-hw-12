import{s as S,a as b,i as c}from"./assets/vendor-dbdbd0f5.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const C=document.querySelector(".form"),w=document.querySelector("#input"),f=document.querySelector(".gallery"),l=document.querySelector(".loader");l.style.display="none";let L=new S("ul.gallery a",{captionDelay:250,captionsData:"alt"});const E="41708533-f63d2cf4b74729d1361203347";let h="",p=1;const v=40,i=document.querySelector(".load-more");i.style.display="none";const $=()=>new URLSearchParams({key:E,q:h,image_type:"photo",orientation:"horizontal",safesearch:!0,page:p,per_page:v});b.defaults.baseURL="https://pixabay.com";const k="/api/";C.addEventListener("submit",async r=>{if(r.preventDefault(),p=1,f.innerHTML="",i.style.display="none",h=w.value.trim(),h!==""){l.style.display="block",w.value="";try{const s=await b.get(k,{params:$()});l.style.display="none";const o=s.data;if(o.hits.length===0)throw c.show({message:"Sorry, there are no images matching your search query. Please try again!",theme:"dark",backgroundColor:"#EF4040",titleColor:"white",position:"topRight"});const a=o.hits.reduce((e,{webformatURL:t,largeImageURL:n,tags:d,likes:y,views:m,comments:u,downloads:g})=>e+`<li class="gallery-item">
        <div class="card">
          <a class="gallery-link" href="${n}">
           <img class="gallery-image"
           src="${t}"
           alt="${d}"
           />
          </a>
          </div>          
          <div class="description">
          <p>Likes:<span>${y}</span></p>
          <p>Views:<span>${m}</span></p>
          <p>Comments:<span>${u}</span></p>
          <p>Downloads:<span>${g}</span></p>
          </div> 
        </li>`,"");f.insertAdjacentHTML("beforeend",a),o.hits.length>=v&&(i.style.display="block"),L.refresh()}catch(s){l.style.display="none",c.error({message:s.message,color:"red",position:"topCenter"}),console.error("Error fetching data:",s)}}});i.addEventListener("click",async()=>{l.style.display="block",p++;try{const r=await b.get(k,{params:$()});l.style.display="none";const s=r.data,o=v*p-40,a=s.totalHits-o;if(a<=0)throw i.style.display="none",c.show({message:"We're sorry, but you've reached the end of search results.",theme:"dark",backgroundColor:"#EF4040",titleColor:"white",position:"topRight"});const e=s.hits.reduce((t,{webformatURL:n,largeImageURL:d,tags:y,likes:m,views:u,comments:g,downloads:q})=>t+`<li class="gallery-item"><div class="card">
          <a class="gallery-link" href="${d}">
           <img class="gallery-image"
           src="${n}"
           alt="${y}"
           />
          </a></div>         
          <div class="description">
            <p>Likes:<span>${m}</span></p>
            <p>Views:<span>${u}</span></p>
            <p>Comments:<span>${g}</span></p>
            <p>Downloads:<span>${q}</span></p>
          </div> 
        </li>`,"");f.insertAdjacentHTML("beforeend",e),P(),L.refresh(),a<=40&&(i.style.display="none")}catch(r){l.style.display="none",c.error({message:r.message,color:"red",position:"topCenter"}),console.error("Error fetching more data:",r)}});const P=()=>{const s=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})};
//# sourceMappingURL=commonHelpers.js.map
