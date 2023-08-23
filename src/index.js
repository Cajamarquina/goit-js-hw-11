import notiflix from "notiflix";
import fetchImages from "./pixabay-api";
import renderImages from "./render-images";
import handleSearchFormSubmit from "./search-form";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const searchForm = document.getElementById("search-form");

let currentPage = 1;
let currentQuery = "";

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
  const data = await fetchImages(query, page);
  if (data && data.hits.length > 0) {
    renderImages(data.hits, gallery);

    // Initialize SimpleLightbox for new images
    const lightbox = new SimpleLightbox(".gallery a");
    lightbox.refresh();
  } else {
    observer.unobserve(gallery);
    handleEndOfResults();
  }
}

function handleEndOfResults() {
  notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}

searchForm.addEventListener("submit", (event) => {
  handleSearchFormSubmit(event, currentPage, currentQuery, gallery, searchForm);
});

// Initial load
fetchAndRenderImages(currentQuery, currentPage);

// Attach infinite scroll event listener
window.addEventListener("scroll", () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollHeight - scrollTop === clientHeight) {
    loadMoreImages();
  }
});