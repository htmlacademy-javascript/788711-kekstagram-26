import { openModal } from './modal-window.js';
import { renderPicture } from './post-fullsize-picture.js';

const postModalElement = document.querySelector('.big-picture');
const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

const renderPostThumbnails = (posts) => {
  posts.forEach((post) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = post.url;
    pictureElement.querySelector('.picture__comments').textContent = post.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = post.likes;
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openModal(postModalElement);
      renderPicture(post);
    });
    picturesFragment.append(pictureElement);
  });
  picturesContainerElement.append(picturesFragment);
};

export { renderPostThumbnails };
