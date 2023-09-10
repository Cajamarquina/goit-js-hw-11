import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

function createCard(image) {
  const card = document.createElement("div");
  card.className = "photo-card";

  const imageLink = document.createElement("a");
  imageLink.href = image.webformatURL;
  imageLink.setAttribute("data-lightbox", "gallery");

  const img = document.createElement("img");
  img.src = image.webformatURL;
  img.alt = image.tags;
  img.loading = "lazy";
  img.style.width = "100%";

  imageLink.appendChild(img);

  const info = document.createElement("div");
  info.className = "info";

  const infoItems = [
    { key: "likes", label: "Likes" },
    { key: "views", label: "Views" },
    { key: "comments", label: "Comments" },
    { key: "downloads", label: "Downloads" },
  ];

  infoItems.forEach((item) => {
    const p = document.createElement("p");
    p.className = "info-item";

    const labelSpan = document.createElement("span");
    labelSpan.textContent = item.label + ": ";
    p.appendChild(labelSpan);

    const valueSpan = document.createElement("span");
    valueSpan.textContent = image[item.key];
    p.appendChild(valueSpan);

    info.appendChild(p);
  });

  card.appendChild(imageLink);
  card.appendChild(info);

  return card; // Return the created card element
}

function renderImages(images, galleryElement) {
  // Clear the existing content of the gallery
  galleryElement.innerHTML = "";

  // Create a document fragment to hold the cards
  const fragment = document.createDocumentFragment();

  images.forEach((image) => {
    const card = createCard(image);
    fragment.appendChild(card); // Append each card directly to the fragment
  });

  // Append the fragment with all cards to the gallery
  galleryElement.appendChild(fragment);

  // Refresh the lightbox after rendering images
  const lightbox = new SimpleLightbox(".gallery a[data-lightbox='gallery']");
  lightbox.refresh();
}

export { renderImages };
