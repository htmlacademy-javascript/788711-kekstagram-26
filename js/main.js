import { generatePosts } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import './form.js';
import './scale.js';
import './effect.js';

const getPost = (posts) => {
  renderThumbnails(posts);
};

getPost(generatePosts());
