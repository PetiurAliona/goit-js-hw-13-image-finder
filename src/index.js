import { fetchImg } from './js/apiService';
import photoCardTpl from './tpl/photoCard';
import debounce from 'lodash.debounce';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

document.querySelector('#search-form').addEventListener('submit', onInputAction);
const gallery = document.querySelector('.gallery');

function onInputAction(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  const value = e.currentTarget.elements.query.value;
  fetchImg(value).then(findImg);
}

function findImg(data) {
  if (data.status === 404) {
    error({ text: `Image is not found!`, delay: 500 });
    return false;
  } else {
    markup(data);
    console.log(data);
  }
}

function markup(el) {
  gallery.insertAdjacentHTML('beforeend', photoCardTpl(el));
}

// const element = document.getElementById('.my-element-selector');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });
