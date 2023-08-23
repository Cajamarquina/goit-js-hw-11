import notiflix from "notiflix";
import fetchImages from "./pixabay-api";
import renderImages from "./render-images";

async function handleSearchFormSubmit(event, currentPage, currentQuery, galleryElement, searchFormElement) {
  event.preventDefault();
  const formData = new FormData(searchFormElement);
  const query = formData.get("searchQuery");

  if (query.trim() === "") {
    notiflix.Notify.failure("Please enter a valid search query.");
    return;
  }

  currentQuery = query;
  currentPage = 1;

  const data = await fetchImages(currentQuery, currentPage);

  if (data && data.hits.length > 0) {
    galleryElement.innerHTML = ""; 
    renderImages(data.hits, galleryElement);
    notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
  } else {
    notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  }
}

export default handleSearchFormSubmit;


