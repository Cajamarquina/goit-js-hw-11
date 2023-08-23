import axios from "axios";

const API_KEY = '38986046-b9c5577e52cca94c56fe7a79b';
const API_URL = "https://pixabay.com/api/";

async function fetchImages(query, page) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 12,
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    return null;
  }
}

export default fetchImages;
