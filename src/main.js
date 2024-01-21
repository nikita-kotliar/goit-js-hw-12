'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const form = document.querySelector('.form');
const input = document.querySelector('#input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
loader.style.display = 'none';

let modal = new simpleLightbox('ul.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});
const apiKey = '41708533-f63d2cf4b74729d1361203347';
let query = '';

let page = 1;
const perPage = 40; 
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.style.display = 'none';


const getSearchParams = () =>
  new URLSearchParams({
    key: apiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  });

axios.defaults.baseURL = 'https://pixabay.com';
const url = `/api/`;

form.addEventListener('submit', async event => {
  event.preventDefault();
  page = 1; 
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none'; 
  query = input.value.trim(); 

  if (query === '') return; 
  loader.style.display = 'block';
  input.value = '';

  try {
    const response = await axios.get(url, {
      params: getSearchParams(),
    });

    loader.style.display = 'none';
    const data = response.data;

    if (data.hits.length === 0) {
      throw iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        theme: 'dark',
        backgroundColor: '#EF4040',
        titleColor: 'white',
        position: 'topRight',
      });
    }
    const imgs = data.hits.reduce(
      (
        html,
        { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
      ) =>
        html +
        `<li class="gallery-item">
        <div class="card">
          <a class="gallery-link" href="${largeImageURL}">
           <img class="gallery-image"
           src="${webformatURL}"
           alt="${tags}"
           />
          </a>
          </div>          
          <div class="description">
          <p>Likes:<span>${likes}</span></p>
          <p>Views:<span>${views}</span></p>
          <p>Comments:<span>${comments}</span></p>
          <p>Downloads:<span>${downloads}</span></p>
          </div> 
        </li>`,
      ''
    );

    gallery.insertAdjacentHTML('beforeend', imgs);
    if (data.hits.length > perPage) {
      loadMoreBtn.style.display = 'block';
    }
    modal.refresh();
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      message: error.message,
      color: 'red',
      position: 'topCenter',
    });
    console.error('Error fetching data:', error);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  loader.style.display = 'block';
  page++;

  try {
    const response = await axios.get(url, {
      params: getSearchParams(),
    });

    loader.style.display = 'none';
    const data = response.data;

    if (data.totalHits <= perPage * page) {
      loadMoreBtn.style.display = 'none'; 
      throw iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        theme: 'dark',
        backgroundColor: '#EF4040',
        titleColor: 'white',
        position: 'topRight',
      });
    }
    const imgs = data.hits.reduce(
      (
        html,
        { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
      ) =>
        html +
        `<li class="gallery-item"><div class="card">
          <a class="gallery-link" href="${largeImageURL}">
           <img class="gallery-image"
           src="${webformatURL}"
           alt="${tags}"
           />
          </a></div>         
          <div class="description">
            <p>Likes:<span>${likes}</span></p>
            <p>Views:<span>${views}</span></p>
            <p>Comments:<span>${comments}</span></p>
            <p>Downloads:<span>${downloads}</span></p>
          </div> 
        </li>`,
      ''
    );

    gallery.insertAdjacentHTML('beforeend', imgs);

    scrollToNextGroup();

    modal.refresh();
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      message: error.message,
      color: 'red',
      position: 'topCenter',
    });
    console.error('Error fetching more data:', error);
  }
});

const scrollToNextGroup = () => {
  const firstGalleryItem = document.querySelector('.gallery-item');
  const galleryItemHeight = firstGalleryItem.getBoundingClientRect().height;
  window.scrollBy({
    top: galleryItemHeight * 2,
    behavior: 'smooth',
  });
};