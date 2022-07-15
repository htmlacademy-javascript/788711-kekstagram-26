import { getData } from './api.js';
import { showAlert } from './util.js';
import { renderPosts } from './sort.js';
import './form.js';
import './scale.js';
import './effect.js';

getData(
  (posts) => {
    renderPosts(posts);
  },
  (message) => {
    showAlert(message);
  },
);
