import axios from 'axios';
import catFromId from './js/cat-api';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_iSxpNY0J1wpUWrzEgbVQIM9euiUJCRkeaIGsnUnc6Ftz2d2845tTYt5pYnp02qHD';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

const catInfo = document.querySelector('.cat-info');
const breeds = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorMsg = document.querySelector('.error');

//fetch implementation
function fetchBreeds() {
  return axios
    .get('/breeds')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      Notiflix.Report.failure('Error', errorMsg.textContent);
      hidenLoader();
    });
}
// Loader function
hidenLoader();
errorMsg.style.display = 'none';

function hidenLoader() {
  loader.style.display = 'none';
}
const show = function showLoader() {
  console.log('Show function called');
  loader.style.display = 'inline';
  loader.innerHTML = `<span class="loader"></span>`;
};

//adding options off selector
fetchBreeds().then(data => {
  const html = data.map(
    breed => `<option value="${breed.id}">${breed.name}</option>`
  );
  breeds.innerHTML = html;
});

//adding resault in html code
breeds.addEventListener('change', ev => {
  catInfo.style.display = 'none';
  show();
  const breed = ev.target.value;

  catFromId(breed).then(cats => {
    catInfo.style.display = 'block';
    catInfo.innerHTML = `<img width="600" height="400" src="${cats[0].url}" class="cat-img"></img><h2 class="cat-name">${cats[0].breeds[0].name}</h2><p class=""description">${cats[0].breeds[0].description}</p>`;
    hidenLoader();
    errorMsg.style.display = 'none';
  });
});