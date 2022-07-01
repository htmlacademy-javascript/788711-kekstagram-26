import { generatePosts } from './data.js';
import { renderPostThumbnails } from './post-thumbnails.js';
import './upload-form.js';

const getPost = (posts) => {
  renderPostThumbnails(posts);
};

getPost(generatePosts());
