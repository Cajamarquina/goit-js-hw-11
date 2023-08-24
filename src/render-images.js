import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

function renderImages(images, galleryElement) {
    galleryElement.innerHTML = ''; 
  
    images.forEach((image) => {
        const card = document.createElement("div");
        card.className = "photo-card";

        // Wrap the image in an anchor tag
        const imageLink = document.createElement("a");
        imageLink.href = image.webformatURL; // Set the image URL as the href
        imageLink.setAttribute("data-lightbox", "gallery"); // Set data-lightbox attribute for SimpleLightbox

        const img = document.createElement("img");
        img.src = image.webformatURL;
        img.alt = image.tags;
        img.loading = "lazy";
        img.style.width = "100%";

        imageLink.appendChild(img); // Append the image to the anchor

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

        card.appendChild(imageLink); // Append the anchor (containing the image) to the card
        card.appendChild(info);
        galleryElement.appendChild(card);
    });

    // Refresh the lightbox after rendering images
    const lightbox = new SimpleLightbox(".gallery a[data-lightbox='gallery']");
    lightbox.refresh();
}

export default renderImages;
