import axios from 'axios';

const API_KEY =
  'live_5dKFOPLh8yBVbI9hbfwedRSQxNOq3fMheNKf6c1vCYf7BRSY2GDCjP0cBBTFKcUb';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = `${API_KEY}`;

function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(resp => resp.data)
    .catch(error => {
      throw error;
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(resp => resp.data)
    .catch(error => {
      throw error;
    });
}
export { fetchBreeds, fetchCatByBreed };
