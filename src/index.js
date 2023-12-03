import axios from 'axios';
import catFromId from './js/cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_iSxpNY0J1wpUWrzEgbVQIM9euiUJCRkeaIGsnUnc6Ftz2d2845tTYt5pYnp02qHD';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

const catInfo = document.querySelector('.cat-info');
const breeds = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorMsg = document.querySelector('.error');

function fetchBreeds() {
  return axios.get('/breeds').then(response => {
    return response.data;
  });
}

fetchBreeds().then(data => {
  const html = data.map(
    breed => `<option value="${breed.id}">${breed.name}</option>`
  );
  breeds.innerHTML = html;
});

const promise = new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve();
  } else {
    reject();
  }
});

breeds.addEventListener('change', ev => {
  const breed = ev.target.value;
  catFromId(breed).then(cats => {
    loader.innerHTML = cats.map(
      cat => `<img width="600" height="400" src="${cat.url}"></img>`
    );
    errorMsg.innerHTML = `<h2>${cats[0].breeds[0].name}</h2><p>${cats[0].breeds[0].description}</p>`;
  });
});
