import { generatePosts } from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photoData = generatePosts();

const picturesFragment = document.createDocumentFragment();

photoData.forEach(({ url, comments, likes }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  picturesFragment.append(pictureElement);
});

picturesContainer.append(picturesFragment);
