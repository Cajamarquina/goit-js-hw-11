import axios from "axios";
import notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = 'YOUR_API_KEY';
const API_URL = "https://pixabay.com/api/";
const gallery = document.querySelector(".gallery");
const searchForm = document.getElementById("search-form");

let currentPage = 1;
let currentQuery = "";

async function fetchImages(query, page) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 40,
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    return null;
  }
}

function renderImages(images) {
  images.forEach((image) => {
    const card = document.createElement("div");
    card.className = "photo-card";

    const img = document.createElement("img");
    img.src = image.webformatURL;
    img.alt = image.tags;
    img.loading = "lazy";

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
    gallery.appendChild(card);
  });

  // Initialize SimpleLightbox for new images
  const lightbox = new SimpleLightbox(".gallery a");
  lightbox.refresh();
}

function handleEndOfResults() {
  notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(searchForm);
  const query = formData.get("searchQuery");

  if (query.trim() === "") {
    notiflix.Notify.failure("Please enter a valid search query.");
    return;
  }

  currentQuery = query;
  currentPage = 1;

  const data = await fetchImages(currentQuery, currentPage);

  if (data && data.hits.length > 0) {
    gallery.innerHTML = ""; // Clear previous content
    renderImages(data.hits);
    notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
  } else {
    notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  }
});

let loadingImages = false;

async function loadMoreImages() {
  if (loadingImages) return;
  
  loadingImages = true;
  currentPage++;
  
  const data = await fetchImages(currentQuery, currentPage);
  
  if (data && data.hits.length > 0) {
    renderImages(data.hits);
    loadingImages = false;
  } else {
    handleEndOfResults();
    window.removeEventListener("scroll", infiniteScroll);
  }
}

function infiniteScroll() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollHeight - scrollTop === clientHeight) {
    loadMoreImages();
  }
}

window.addEventListener("scroll", infiniteScroll);
