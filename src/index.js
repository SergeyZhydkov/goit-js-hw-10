// import './sass/index.scss';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
const refs = {
  selectEl: document.querySelector('.breed-select'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};
refs.loaderEl.style.display = 'none';
refs.errorEl.style.display = 'none';
