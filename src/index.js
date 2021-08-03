import { fetchImg } from './js/apiService';
import photoCardTpl from './tpl/photoCard';
import debounce from 'lodash.debounce';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { success, error } from '@pnotify/core';

document.querySelector('#search-form').addEventListener('submit', onInputAction);
const galleryNode = document.querySelector('.gallery');
const rootNode = document.querySelector('#root');

function onInputAction(e) {
  e.preventDefault();
  galleryNode.innerHTML = '';
  const value = e.currentTarget.elements.query.value;
  fetchImg(value).then(findImg);
}

function findImg(data) {
  if (data.total === 0) {
    error({ text: `Image is not found!`, delay: 500 });
    // return false;
  } else {
    success({ text: `${data.total} images found.`, delay: 2000 });
    markup(data);
    console.log(data);
  }
}

function markup(el) {
  galleryNode.insertAdjacentHTML('beforeend', photoCardTpl(el));
}

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(item => {
      if (!item.isIntersecting) return false;
      observer.unobserve(item.target);
      // currentPage += 1;

      galleryNode.insertAdjacentHTML('beforeend', markup(galleryNode.children.length));

      observer.observe(galleryNode.lastElementChild);
    });
  },
  {
    threshold: 0.5,
  },
);
// observer.observe(galleryNode.lastElementChild);

// const observer = new IntersectionObserver(
//   (entries, observer) => {
//     entries.forEach(item => {
//       if (item.isIntersecting) galleryNode.classList.add('hide');
//       else galleryNode.classList.remove('hide');
//     });
//   },
//   {
//     threshold: 1,
//   },
// );
// observer.observe(galleryNode);

// const element = document.getElementById('.my-element-selector');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });
