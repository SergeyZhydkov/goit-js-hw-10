// import './sass/index.scss';
import './style.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio.js';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

Notify.init({
  width: '300px',
  position: 'center-center',
  fontSize: '16px',
});

const refs = {
  selectEl: document.querySelector('.breed-select'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

refs.loaderEl.style.display = 'none';
refs.errorEl.style.display = 'none';
refs.selectEl.style.display = 'none';
refs.catInfo.style.display = 'none';

refs.selectEl.addEventListener('change', onSelect);

fetchBreeds()
  .then(breeds => {
    refs.selectEl.style.display = 'flex';
    refs.selectEl.innerHTML = createMarkupSection(breeds);
    new SlimSelect({
      select: selectEl,
      settings: {
        placeholderText: 'Just chose a cat....',
      },
    });
  })
  .catch(err => {
    console.error(err);
  })
  .finally(_ => {
    refs.loaderEl.style.display = 'none';
  });

function onSelect(evt) {
  const breedId = evt.target.value;
  refs.loaderEl.style.display = 'initial';
  refs.catInfo.style.display = 'none';
  fetchCatByBreed(breedId)
    .then(data => {
      refs.catInfo.style.display = 'flex';
      refs.catInfo.innerHTML = createMarkupCard(data);
    })
    .catch(err => {
      refs.catInfo.style.display = 'none';
      console.error(err);
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(_ => {
      refs.loaderEl.style.display = 'none';
    });
}
function createMarkupSection(arr) {
  const arrCat = arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
  const placeholderEl = `<option data-placeholder="true"></option>`;
  return placeholderEl + arrCat;
}
function createMarkupCard(data) {
  const { url, breeds } = data[0];
  const { name, description, temperament } = breeds[0];
  return `<img class="img-card" src="${url}" alt="${name} width="200">
  <div>
  <h1>${name}</h1>
  <p>${temperament}</p>
  <p>${description}</p>
  </div>`;
}
