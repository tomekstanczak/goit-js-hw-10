import axios from 'axios';

export const catFromId = breedId => {
  return axios.get(`/images/search?breed_ids=${breedId}`).then(response => {
    return response.data;
  });
};
