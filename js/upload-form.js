import { isEscapeKey } from './util.js';
import { openModal, closeModal } from './modal-window.js';

const HASHTAGS_COUNT = 5;

const uploadFormElement = document.querySelector('.img-upload__form');
const fileInputElement = uploadFormElement.querySelector('#upload-file');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadFormCloseElement = uploadFormElement.querySelector('#upload-cancel');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const re = /^#[A-Za-zА-ЯаяЁё0-9]{1,19}$/;

const resetForm = () => uploadFormElement.reset();

const getHashtags = () => hashtagsInputElement.value.split(' ').filter(Boolean);

const checkHashtagSymbols = () => getHashtags().every((item) => re.test(item));

const checkUniquenessHashtags = () => {
  const hashtags = getHashtags().map((item) => item.toLowerCase());
  const uniqueHashtags = new Set(hashtags);
  return hashtags.length === uniqueHashtags.size;
};

const checkHashtagsCount = () => getHashtags().length <= HASHTAGS_COUNT;

const pristine = new Pristine(uploadFormElement, {
  classTo: 'text__field-wrapper',
  errorClass: 'text__field-wrapper--invalid',
  successClass: 'text__field-wrapper-valid',
  errorTextParent: 'text__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'text__error-message'
});

pristine.addValidator(hashtagsInputElement, checkHashtagSymbols, 'Хэш-тег должен начинаться с символа #, содержать только буквы и числа. Максимальная длина одного хэш-тега 20 символов.', 1, true);
pristine.addValidator(hashtagsInputElement, checkUniquenessHashtags, 'Хэш-теги не должны повторяться. Хэштеги нечувствительны к регистру.', 2, true);
pristine.addValidator(hashtagsInputElement, checkHashtagsCount, `Можно указать не более ${HASHTAGS_COUNT} хэш-тегов.`, 3, true);

fileInputElement.addEventListener('change', () => {
  openModal(uploadOverlayElement);
});

uploadFormCloseElement.addEventListener('click', () => {
  closeModal();
});

uploadOverlayElement.addEventListener('keydown', (evt) => {
  const targetTextFieldElement = evt.target.matches('.text__hashtags') || evt.target.matches('.text__description');
  if (targetTextFieldElement) {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  }
});

uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    uploadFormElement.submit();
  }
});

export { pristine, resetForm };
