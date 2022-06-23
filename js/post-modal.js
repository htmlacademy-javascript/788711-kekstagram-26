import { isEscapeKey } from './util.js';
import { renderPicture } from './post-fullsize-picture.js';

const body = document.body;
const postModalElement = document.querySelector('.big-picture');
const postModalCloseElement = postModalElement.querySelector('.big-picture__cancel');

// Убирает блоки счётчика комментариев и загрузки новых комментариев
const commentCountElement = postModalElement.querySelector('.social__comment-count');
commentCountElement.classList.add('hidden');
const commentsLoaderElement = postModalElement.querySelector('.comments-loader');
commentsLoaderElement.classList.add('hidden');

const modalEscKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

const openPictureModal = (post) => {
  body.classList.add('modal-open');
  postModalElement.classList.remove('hidden');
  renderPicture(post);
  document.addEventListener('keydown', modalEscKeydownHandler);
};

function closePictureModal() {
  body.classList.remove('modal-open');
  postModalElement.classList.add('hidden');
  document.removeEventListener('keydown', modalEscKeydownHandler);
}

postModalCloseElement.addEventListener('click', () => {
  closePictureModal();
});

export { openPictureModal };
