import { isEscapeKey } from './util.js';
import { pristine, resetForm } from './upload-form.js';
import { resetCommentsCounts } from './post-fullsize-picture.js';

const body = document.body;

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

  if (targetElement.classList.contains('img-upload__overlay')) {
    pristine.reset();
    resetForm();
  }

  if (targetElement.classList.contains('big-picture')) {
    resetCommentsCounts();
  }
}

export { openModal, closeModal };
