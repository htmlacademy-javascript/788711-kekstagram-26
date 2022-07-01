import { renderPicture } from './post-fullsize-picture.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

let postsData = [];

const renderPostThumbnails = (posts) => {
  postsData = posts;
  posts.forEach((post) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.dataset.postId = post.id;
    pictureElement.querySelector('.picture__img').src = post.url;
    pictureElement.querySelector('.picture__comments').textContent = post.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = post.likes;
    picturesFragment.append(pictureElement);
  });
  picturesContainerElement.append(picturesFragment);
};

picturesContainerElement.addEventListener('click', (evt) => {
  const thumbnailElement = evt.target.closest('.picture');
  if (thumbnailElement) {
    evt.preventDefault();
    const postId = thumbnailElement.dataset.postId;
    const post = postsData.find((element) => element.id === Number(postId));
    if (post) {
      renderPicture(post);
    }
  }
});

export { renderPostThumbnails };
