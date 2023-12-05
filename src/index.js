import axios from 'axios';
import { fetchCatByBreed, fetchBreeds } from './js/cat-api';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_iSxpNY0J1wpUWrzEgbVQIM9euiUJCRkeaIGsnUnc6Ftz2d2845tTYt5pYnp02qHD';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

const catInfo = document.querySelector('.cat-info');
const breeds = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorMsg = document.querySelector('.error');
breeds.setAttribute('id', 'selectElement');

// Loader function
hidenLoader();
errorMsg.style.display = 'none';

function hidenLoader() {
  loader.style.display = 'none';
}
const show = function showLoader() {
  loader.innerText = '';
  loader.style.display = 'block';
};

//adding options off selector

fetchBreeds()
  .then(data => {
    const html = data.map(
      breed => `<option value="${breed.id}">${breed.name}</option>`
    );
    breeds.innerHTML = html;
  })
  .catch(error => {
    hidenLoader();
    errorMsg.style.display = 'block';
    Notiflix.Report.failure('Error', errorMsg.textContent);
  });

//adding resault in html code
breeds.addEventListener('change', ev => {
  catInfo.style.display = 'none';
  show();
  const breed = ev.target.value;

  fetchCatByBreed(breed)
    .then(response => {
      return response.data;
    })
    .then(cats => {
      catInfo.style.display = 'block';
      catInfo.innerHTML = `<div class="content"><img src="${cats[0].url}" class="cat-img"></img><div class="text-content"><h2 class="cat-name">${cats[0].breeds[0].name}</h2><p class="description">${cats[0].breeds[0].description}</p> <p><b>Temperament: </b>${cats[0].breeds[0].temperament}.</p></div></div>`;
      hidenLoader();
      errorMsg.style.display = 'none';
    })
    .catch(error => {
      hidenLoader();
      errorMsg.style.display = 'block';
      Notiflix.Report.failure('Error', errorMsg.textContent);
    });
});
