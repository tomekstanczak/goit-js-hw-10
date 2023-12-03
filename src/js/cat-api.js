export const catFromId = () => {
  return axios.get(`/images/search?breed_ids=${breedId}`).then(response => {
    return response.data;
  });
};
