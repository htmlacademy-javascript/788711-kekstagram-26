import { renderPost } from './fullsize-picture.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

let postsData = [];

const renderThumbnails = (posts) => {
  posts.forEach(({ id, url, comments, likes }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.dataset.postId = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    picturesFragment.append(pictureElement);
  });
  postsData = posts;
  picturesContainerElement.append(picturesFragment);
};

picturesContainerElement.addEventListener('click', (evt) => {
  const thumbnailElement = evt.target.closest('.picture');
  if (thumbnailElement) {
    evt.preventDefault();
    const postId = thumbnailElement.dataset.postId;
    const post = postsData.find((element) => element.id === Number(postId));
    if (post) {
      renderPost(post);
    }
  }
});

const clearThumbnails = () => {
  picturesContainerElement.querySelectorAll('.picture').forEach((thumbnailElement) => {
    thumbnailElement.remove();
  });
};

export { renderThumbnails, clearThumbnails };
