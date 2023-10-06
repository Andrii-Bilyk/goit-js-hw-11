import Notiflix from 'notiflix';
import { fetchDataFromURL, createURL } from './api';
import { createImageCard, initializeLightbox } from './markup';

const form = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
const API_KEY = "39851932-ce9b346420218ff82d4578a42";

let page = 1;

function showMessage(message, category) {
  Notiflix.Notify[category](message);
}

async function searchImages(query,) {
  const url = createURL(API_KEY, query, page);

  try {
    const data = await fetchDataFromURL(url);

    if (data.hits.length === 0) {
      if (page === 1) {
        gallery.innerHTML = '';
        showMessage("Sorry, there are no images matching your search query. Please try again.", "failure");
        loadMoreBtn.style.display = "none";
      } else {
        loadMoreBtn.style.display = "none";
        showMessage("We're sorry, but you've reached the end of search results.", "info");
      }
      return;
    }

    if (page === 1) {
      gallery.innerHTML = '';
      showMessage(`Hooray! We found ${data.totalHits} images.`, "success");
    }

    if (data.totalHits > page * 40) {
      loadMoreBtn.style.display = "block";
    } else {
           loadMoreBtn.style.display = "none";
      showMessage("We're sorry, but you've reached the end of search results.", "info");
    }

    const images = data.hits.map(image => createImageCard(image));
    gallery.innerHTML += images.join('');
    lightboxInstance.refresh();

    initializeLightbox();
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchQuery = e.target.searchQuery.value.trim();

  if (!searchQuery) {
    showMessage("Please enter a search query.", "failure");
    return;
  }

  page = 1; 
  searchImages(searchQuery);
});

loadMoreBtn.addEventListener("click", function () {
  page += 1;
  const searchQuery = form.searchQuery.value.trim();
  if (searchQuery) {
    searchImages(searchQuery);
  }
});
