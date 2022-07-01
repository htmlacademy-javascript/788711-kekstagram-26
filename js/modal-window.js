import { isEscapeKey } from './util.js';
import { resetForm } from './upload-form.js';

const body = document.body;
const uploadOverlayElement = document.querySelector('.img-upload__overlay');

let targetElement;

const modalEscKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    if (!uploadOverlayElement.classList.contains('hidden')) {
      resetForm();
    }
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

export { openModal, closeModal };
