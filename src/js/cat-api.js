import axios from 'axios';
import Notiflix from 'notiflix';

export const fetchCatByBreed = breedId => {
  return axios.get(`/images/search?breed_ids=${breedId}`).then(response => {
    return response.data;
  });
};
//fetch implementation
export const fetchBreeds = () => {
  return axios
    .get('/breeds')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      hidenLoader();
      errorMsg.style.display = 'block';
      Notiflix.Report.failure('Error', errorMsg.textContent);
    });
};
