import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function createImageCard(image) {
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
let lightboxInstance;
export function initializeLightbox() {
  lightboxInstance = new SimpleLightbox('.gallery a[data-lightbox="image"]', {
    captions: true,
    captionsData: 'alt',
  });
  return lightboxInstance;
}

document.addEventListener("DOMContentLoaded", function () {
  initializeLightbox();
});