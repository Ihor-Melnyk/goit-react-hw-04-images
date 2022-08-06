function fetchImage(name, pageNumber) {
  //   console.log(pageNumber);
  //
  return fetch(
    `https://pixabay.com/api/?q=${name}&page=${pageNumber}&key=27751925-222e133f055774cf8425d9703&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => response.json());
}
const api = {
  fetchImage,
};
export default api;
