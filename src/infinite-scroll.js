import fetchAndRenderImages from "./render-images";
import notiflix from "notiflix";

function infiniteScroll(currentPage, currentQuery, galleryElement) {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight) {
      currentPage++;
      fetchAndRenderImages(currentQuery, currentPage)
        .then(data => {
          if (data && data.hits.length > 0) {
            renderImages(data.hits, galleryElement);
          } else {
            handleEndOfResults();
          }
        })
        .catch(error => {
          console.error("Error fetching images:", error);
          handleEndOfResults(); // Handle error in a similar way
        });
    }
  }
  
  function handleEndOfResults() {
    notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
  
  export default infiniteScroll;
  