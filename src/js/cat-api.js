let catFromId;

function fetchCatByBreed(breedId) {
  return axios.get(`/images/search?breed_ids=${breedId}`).then(response => {
    return catFromId = response.data;
  });
}
export catFromId;