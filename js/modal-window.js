import { isEscapeKey } from './util.js';

const body = document.body;
const postModalCloseElement = document.querySelector('.big-picture__cancel');

let targetElement;

const modalEscKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const openModal = (item) => {
  targetElement = item;
  body.classList.add('modal-open');
  targetElement.classList.remove('hidden');
  document.addEventListener('keydown', modalEscKeydownHandler);
};

function closeModal() {
  body.classList.remove('modal-open');
  targetElement.classList.add('hidden');
  document.removeEventListener('keydown', modalEscKeydownHandler);
}

postModalCloseElement.addEventListener('click', () => {
  closeModal();
});

export { openModal };
