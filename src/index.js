import notiflix from "notiflix";
import fetchImages from "./pixabay-api";
import renderImages from "./render-images";
import handleSearchFormSubmit from "./search-form";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

document.addEventListener("DOMContentLoaded", function () {
const gallery = document.querySelector(".gallery");
const searchForm = document.getElementById("search-form");
const searchInput = searchForm.querySelector(".input-form");

let currentPage = 1;
let currentQuery = "";

// Initialize SimpleLightbox for new images
const lightbox = new SimpleLightbox(".gallery a", {
  docClose: true, // Close lightbox with a single click outside the image
}); 

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadMoreImages();
    }
  });
}, {
  rootMargin: "0px",
  threshold: 0.1,
});

observer.observe(gallery);

function loadMoreImages() {
  currentPage++;
  fetchAndRenderImages(currentQuery, currentPage);
}

async function fetchAndRenderImages(query, page) {
  try {
    const data = await fetchImages(query, page);
    if (data && data.hits.length > 0) {
      renderImages(data.hits, gallery);
      lightbox.refresh(); // Refresh lightbox after rendering new images
    } else {
      handleEndOfResults();
    }
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

function handleEndOfResults() {
  notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission
  currentQuery = searchInput.value; // Get the query from the form input
  currentPage = 1; // Reset the page when performing a new search
  gallery.innerHTML = ""; // Clear the gallery
  await fetchAndRenderImages(currentQuery, currentPage);
});

// Initial load
fetchAndRenderImages(currentQuery, currentPage);

// Attach infinite scroll event listener
window.addEventListener("scroll", () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollHeight - scrollTop === clientHeight) {
    loadMoreImages();
    lightbox.refresh(); // Refresh lightbox after infinite scroll
  }
});
});
