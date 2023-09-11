import notiflix from "notiflix";
import fetchImages from "./pixabay-api";
import { renderImages } from "./render-images";
import handleSearchFormSubmit from "./search-form";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox(".gallery a[data-lightbox='gallery']");

document.addEventListener("DOMContentLoaded", function () {
const gallery = document.querySelector(".gallery");
const searchForm = document.getElementById("search-form");
const searchInput = searchForm.querySelector(".input-form");

let currentPage = 1;
let currentQuery = "";
let observer; // Declare the observer at a higher scope
let noMoreResultsNotified = false; // Initialize the flag

function loadMoreImages() {
  currentPage++;
  fetchAndRenderImages(currentQuery, currentPage);
}

async function fetchAndRenderImages(query, page) {
  try {
    if (page === currentPage) {
      const data = await fetchImages(query, page);
      if (data && data.hits.length > 0) {
        renderImages(data.hits, gallery);
        lightbox.refresh();
      } else if (!noMoreResultsNotified) {
        handleEndOfResults();
        noMoreResultsNotified = true;
      }
    }
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

function handleEndOfResults() {
  notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    currentQuery = searchInput.value.trim();
    currentPage = 1;
    gallery.innerHTML = "";

    if (observer) {
      observer.disconnect(); // Stop observing before starting a new search
    }

    await handleSearchFormSubmit(event, currentPage, currentQuery, gallery, searchForm);
    startObserver(); // Start observing after the search results are loaded
  });

  async function startObserver() {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && currentQuery) {
          loadMoreImages();
          lightbox.refresh();
        }
      });
    }, {
      rootMargin: "0px",
      threshold: 0.1,
    });

    observer.observe(gallery);
  }

// Attach infinite scroll event listener
window.addEventListener("scroll", () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollHeight - scrollTop === clientHeight) {
    loadMoreImages();
    lightbox.refresh(); // Refresh lightbox after infinite scroll
  }
});

const lightboxLinks = document.querySelectorAll(".gallery a");
lightboxLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    lightbox.close();
  });
});
});
