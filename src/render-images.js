import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function renderImages(images, galleryElement, clearGallery = false) {
  // If clearGallery is true, clear the gallery before appending new images
  if (clearGallery) {
    galleryElement.innerHTML = "";
  }

  // Create a document fragment to hold the cards
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    // Create the card element
    const card = document.createElement("div");
    card.className = "photo-card";

     // Create the anchor element for the lightbox
     const lightboxLink = document.createElement("a");
     lightboxLink.href = image.webformatURL;
     lightboxLink.dataset.lightbox = "gallery";

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

    for (let j = 0; j < infoItems.length; j++) {
      const item = infoItems[j];
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

   // Append the image to the lightbox anchor element
   lightboxLink.appendChild(img);

   // Append the lightbox anchor element to the card element
   card.appendChild(lightboxLink);

   // Append the info element to the card element
   card.appendChild(info);

   // Append the card element to the document fragment
   fragment.appendChild(card);
 }

 // Append the document fragment to the gallery
 galleryElement.appendChild(fragment);

 // Initialize the lightbox after rendering images
   const lightbox = new SimpleLightbox(".gallery a[data-lightbox='gallery']");
   lightbox.refresh();
}
