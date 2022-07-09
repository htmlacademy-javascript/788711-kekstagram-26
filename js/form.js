import { openModal, closeModal } from './modal.js';

const HASHTAGS_COUNT = 5;
const REGULAR_EXPRESSION = /^#[A-Za-zА-ЯаяЁё0-9]{1,19}$/;

const formElement = document.querySelector('.img-upload__form');
const fileInputElement = formElement.querySelector('#upload-file');
const uploadOverlayElement = formElement.querySelector('.img-upload__overlay');
const formCloseElement = formElement.querySelector('#upload-cancel');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');

const resetForm = () => formElement.reset();

const getHashtags = () => hashtagsInputElement.value.split(' ').filter(Boolean);

const checkHashtagSymbols = () => getHashtags().every((item) => REGULAR_EXPRESSION.test(item));

const checkUniquenessHashtags = () => {
  const hashtags = getHashtags().map((item) => item.toLowerCase());
  const uniqueHashtags = new Set(hashtags);
  return hashtags.length === uniqueHashtags.size;
};

const checkHashtagsCount = () => getHashtags().length <= HASHTAGS_COUNT;

const pristine = new Pristine(formElement, {
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

formCloseElement.addEventListener('click', () => {
  closeModal();
});

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    formElement.submit();
  }
});

export { pristine, resetForm };
