import { isEscapeKey } from './util.js';
import { resetCommentsCounts } from './fullsize-picture.js';
import { pristine, resetForm } from './form.js';
import { resetImageScale } from './scale.js';
import { resetEffect } from './effect.js';

const body = document.body;

let targetElement;

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (evt.target.matches('.text__hashtags') || evt.target.matches('.text__description')) {
      return;
    }

    if (document.querySelector('.error')) {
      return;
    }

    evt.preventDefault();
    closeModal();
  }
};

const openModal = (item) => {
  targetElement = item;
  body.classList.add('modal-open');
  targetElement.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscKeydown);
};

function closeModal() {
  body.classList.remove('modal-open');
  targetElement.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscKeydown);

  if (targetElement.classList.contains('img-upload__overlay')) {
    pristine.reset();
    resetForm();
    resetImageScale();
    resetEffect();
  }

  if (targetElement.classList.contains('big-picture')) {
    resetCommentsCounts();
  }
}

export { openModal, closeModal };
