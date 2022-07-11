import { getData } from './api.js';
import { showAlert } from './util.js';
import { renderThumbnails } from './thumbnails.js';
import './form.js';
import './scale.js';
import './effect.js';

getData(
  (posts) => {
    renderThumbnails(posts);
  },
  (message) => {
    showAlert(message);
  },
);
