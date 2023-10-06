import SimpleLightbox from "simplelightbox";

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

export function initializeLightbox() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
  });
  lightbox.refresh();
}
