import axios from 'axios';
import URL from 'url-parse';

export async function fetchDataFromURL(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export function createURL(apiKey, query, page) {
  return new URL(`https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`).toString();
}
