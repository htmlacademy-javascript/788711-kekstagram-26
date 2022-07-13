import { getData } from './api.js';
import { showAlert, debounce } from './util.js';
import { renderThumbnails, clearThumbnails } from './thumbnails.js';
import { onFiltersClick } from './sort.js';
import './form.js';
import './scale.js';
import './effect.js';

const RERENDER_DELAY = 500;

getData(
  (posts) => {
    renderThumbnails(posts);
    onFiltersClick(posts,
      debounce(
        (sortedPost) => {
          clearThumbnails();
          renderThumbnails(sortedPost);
        },
        RERENDER_DELAY,
      ),
    );
  },
  (message) => {
    showAlert(message);
  },
);
