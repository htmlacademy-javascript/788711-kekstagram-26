import { sendData } from './api.js';
import { openModal, closeModal } from './modal.js';
import { showStatusPopup } from './status-popup.js';

const HASHTAGS_COUNT = 5;
const HASHTAG_REGULAR_EXPRESSION = /^#[A-Za-zА-ЯаяЁё0-9]{1,19}$/;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const formElement = document.querySelector('.img-upload__form');
const fileInputElement = formElement.querySelector('#upload-file');
const uploadOverlayElement = formElement.querySelector('.img-upload__overlay');
const imageElement = formElement.querySelector('.img-upload__preview img');
const formCloseElement = formElement.querySelector('#upload-cancel');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const formSubmitElement = formElement.querySelector('.img-upload__submit');

const resetForm = () => formElement.reset();

const getHashtags = () => hashtagsInputElement.value.split(' ').filter(Boolean);

const checkHashtagSymbols = () => getHashtags().every((item) => HASHTAG_REGULAR_EXPRESSION.test(item));

const checkUniquenessHashtags = () => {
  const hashtags = getHashtags().map((item) => item.toLowerCase());
  const uniqueHashtags = new Set(hashtags);
  return hashtags.length === uniqueHashtags.size;
};

const checkHashtagsCount = () => getHashtags().length <= HASHTAGS_COUNT;

const pristine = new Pristine(formElement, {
  classTo: 'text__field-wrapper',
  errorClass: 'text__field-wrapper--invalid',
  successClass: 'text__field-wrapper--valid',
  errorTextParent: 'text__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'text__error-message'
});

pristine.addValidator(hashtagsInputElement, checkHashtagSymbols, 'Хэш-тег должен начинаться с символа #, содержать только буквы и числа. Максимальная длина одного хэш-тега 20 символов.', 1, true);
pristine.addValidator(hashtagsInputElement, checkUniquenessHashtags, 'Хэш-теги не должны повторяться. Хэштеги нечувствительны к регистру.', 2, true);
pristine.addValidator(hashtagsInputElement, checkHashtagsCount, `Можно указать не более ${HASHTAGS_COUNT} хэш-тегов.`, 3, true);

const onFileInputChange = () => {
  const file = fileInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));

  if (matches) {
    imageElement.src = URL.createObjectURL(file);
  }

  openModal(uploadOverlayElement);
};

const blockSubmitButton = () => {
  formSubmitElement.disabled = true;
  formSubmitElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  formSubmitElement.disabled = false;
  formSubmitElement.textContent = 'Опубликовать';
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        closeModal();
        unblockSubmitButton();
        showStatusPopup('success');
      },
      () => {
        showStatusPopup('error');
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
};

formCloseElement.addEventListener('click', () => {
  closeModal();
});

fileInputElement.addEventListener('change', onFileInputChange);
formElement.addEventListener('submit', onFormSubmit);

export { pristine, resetForm };
