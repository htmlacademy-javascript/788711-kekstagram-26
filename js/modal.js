import { isEscapeKey } from './util.js';
import { resetCommentsCounts } from './fullsize-picture.js';
import { pristine, resetForm } from './form.js';
import { resetImageScale } from './scale.js';
import { resetEffect } from './effect.js';

let targetElement;

const openModal = (element) => {
  targetElement = element;
  document.body.classList.add('modal-open');
  targetElement.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscKeydown);
};

const closeModal = () => {
  document.body.classList.remove('modal-open');
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
};

function onModalEscKeydown(evt) {
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
}

export { openModal, closeModal };
