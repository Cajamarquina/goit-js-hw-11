import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function renderImages(images, galleryElement) {
  // Clear the gallery element before appending new images
  galleryElement.innerHTML = "";

  // Create a document fragment to hold the cards
  const fragment = document.createDocumentFragment();

  for (const image of images) {
    // Create the card element
    const card = document.createElement("div");
    card.className = "photo-card";

    // Create the image element
    const img = document.createElement("img");
    img.src = image.webformatURL;
    img.alt = image.tags;
    img.loading = "lazy";
    img.style.width = "100%";

    // Create the info element
    const info = document.createElement("div");
    info.className = "info";

    const infoItems = [
      { key: "likes", label: "Likes" },
      { key: "views", label: "Views" },
      { key: "comments", label: "Comments" },
      { key: "downloads", label: "Downloads" },
    ];

    for (const item of infoItems) {
      const p = document.createElement("p");
      p.className = "info-item";

      const labelSpan = document.createElement("span");
      labelSpan.textContent = item.label + ": ";
      p.appendChild(labelSpan);

      const valueSpan = document.createElement("span");
      valueSpan.textContent = image[item.key];
      p.appendChild(valueSpan);

      info.appendChild(p);
    }

    // Append the image and info elements to the card element
    card.appendChild(img);
    card.appendChild(info);

    // Append the card element to the document fragment
    fragment.appendChild(card);
  }

  // Append the document fragment to the gallery
  galleryElement.appendChild(fragment);

  // Refresh the lightbox after rendering images
  const lightbox = new SimpleLightbox(".gallery a[data-lightbox='gallery']");
  lightbox.refresh();
}
