import { fetchImg } from './js/apiService';
import photoCardTpl from './tpl/photoCard';
import debounce from 'lodash.debounce';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { success, error } from '@pnotify/core';

document.querySelector('#search-form').addEventListener('submit', onInputAction);
const galleryNode = document.querySelector('.gallery');
const rootNode = document.querySelector('#root');
let valueSearch;
let currentPage = 1;

function onInputAction(e) {
  e.preventDefault();
  galleryNode.innerHTML = '';
  currentPage = 1;
  valueSearch = e.currentTarget.elements.query.value;
  fetchImg(valueSearch, currentPage).then(findImg);
}

function findImg(data) {
  if (data.total === 0) {
    error({ text: `Image is not found!`, delay: 500 });
  } else {
    success({ text: `${data.total} images found.`, delay: 1000 });
    markup(data).then(() => {
      galleryNode.querySelectorAll('li.hide').forEach(el => {
        el.classList.remove('hide');
      });
      observer.observe(galleryNode.lastElementChild);
    });
  }
}

function markup(data) {
  galleryNode.insertAdjacentHTML('beforeend', photoCardTpl(data));
  return new Promise((res, rej) => {
    let counter = 0;
    galleryNode.querySelectorAll('li.hide img').forEach(img => {
      img.onload = () => {
        counter++;
        if (data.hits.length <= counter) {
          res();
        }
      };
    });
  });
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(item => {
    if (!item.isIntersecting) return false;
    observer.unobserve(item.target);
    fetchImg(valueSearch, ++currentPage).then(findImg);
  });
});
