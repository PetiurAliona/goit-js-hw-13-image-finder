import config from '../config.json';

export function fetchImg(searchInput, currentPage) {
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchInput}&page=${currentPage}&per_page=${config.perPage}&key=${config.myApiKey}`,
  )
    .then(response => response.json())
    .catch(e => error({ text: `${e}`, delay: 1500 }));
}
