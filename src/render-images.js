import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

function renderImages(images, galleryElement) {
  images.forEach((image) => {
    const card = document.createElement("div");
    card.className = "photo-card";

    const img = document.createElement("img");
    img.src = image.webformatURL;
    img.alt = image.tags;
    img.loading = "lazy";
    img.style.width = "100%";

    const info = document.createElement("div");
    info.className = "info";

    const infoItems = ["likes", "views", "comments", "downloads"];
    infoItems.forEach((item) => {
      const p = document.createElement("p");
      p.className = "info-item";
      p.innerHTML = `<b>${item.charAt(0).toUpperCase() + item.slice(1)}</b>: ${image[item]}`;
      info.appendChild(p);
    });

    card.appendChild(img);
    card.appendChild(info);
    galleryElement.appendChild(card);
  });

  // Initialize SimpleLightbox for new images
  const lightbox = new SimpleLightbox(".gallery a");
  lightbox.refresh();
}

export default renderImages;
