import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
const API_KEY = "39851932-ce9b346420218ff82d4578a42";

let page = 1;

async function searchImages(query) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.hits.length === 0) {
           gallery.innerHTML = '';
      showMessage("Sorry, there are no images matching your search query. Please try again.");
      return;
    }

    if (data.totalHits > page * 40) {
      loadMoreBtn.style.display = "block";
    } else {
      loadMoreBtn.style.display = "none";
    }

    const images = data.hits.map(image => createImageCard(image));
    gallery.innerHTML = images.join('');

    const lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
    });
    lightbox.refresh();

    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

function createImageCard(image) {
  return `
    <div class="photo-card">
      <a href="${image.largeImageURL}" data-lightbox="image">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </div>
  `;
}

function showMessage(message) {
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchQuery = e.target.searchQuery.value.trim();
  if (searchQuery) {
    page = 1; 
    searchImages(searchQuery);
  }
});

loadMoreBtn.addEventListener("click", function () {
  page += 1;
  const searchQuery = form.searchQuery.value.trim();
  if (searchQuery) {
    searchImages(searchQuery);
  }
});
