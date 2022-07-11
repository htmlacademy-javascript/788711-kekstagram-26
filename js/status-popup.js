import { isEscapeKey } from './util.js';

const Z_ORDER = 10;

const showStatusPopup = (type) => {
  const popupElement = document.querySelector(`#${type}`)
    .content
    .querySelector(`.${type}`)
    .cloneNode(true);
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
