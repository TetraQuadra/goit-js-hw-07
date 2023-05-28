import { galleryItems } from "./gallery-items.js";

const galleryEl = document.querySelector(".gallery");
const galleryImages = document.querySelectorAll(".gallery__image");

const lightbox = basicLightbox.create('<img src="">', {
  onClose: removeLightboxListener,
});

galleryEl.innerHTML = galleryItems.reduce((accumulatedHtml, item) => {
  return `${accumulatedHtml}<li class="gallery__item">
    <a class="gallery__link" href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
    </a>
    </li>`;
}, "");

function showLightbox(event) {
  event.preventDefault();
  const { target } = event;
  if (target.nodeName !== "IMG") return;
  lightbox.element().querySelector("img").src = target.dataset.source;
  lightbox.show();
  onShowLightbox();
}

galleryEl.addEventListener("click", function (event) {
  showLightbox(event);
});

function onShowLightbox() {
  window.addEventListener("keyup", onCloseLightbox);
}

function onCloseLightbox(event) {
  if (lightbox.visible() && event.key === "Escape") {
    lightbox.close();
  }
}

function removeLightboxListener() {
  window.removeEventListener("keyup", onCloseLightbox);
}
