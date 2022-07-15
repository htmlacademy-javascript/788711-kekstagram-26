import { isEscapeKey } from './util.js';

const Z_ORDER = 10;

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const showStatusPopup = (type) => {
  const statusConfig = {
    'success': successTemplate,
    'error': errorTemplate,
  };

  const template = statusConfig[type];
  const popupElement = template.cloneNode(true);
  const closeElement = popupElement.querySelector(`.${type}__button`);
  popupElement.style.zIndex = Z_ORDER;
  document.body.append(popupElement);

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      closeStatusPopup();
    }
  };

  const onBackdropClick = (evt) => {
    if (evt.target.closest(`.${type}__inner`)) {
      return;
    }
    closeStatusPopup();
  };

  closeElement.addEventListener('click', () => {
    closeStatusPopup();
  });

  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onBackdropClick);

  function closeStatusPopup() {
    popupElement.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
    document.removeEventListener('click', onBackdropClick);
  }
};

export { showStatusPopup };
