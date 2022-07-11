import { openModal, closeModal } from './modal.js';

const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;
const COMMENTS_SHOWN_COUNT = 5;

const postElement = document.querySelector('.big-picture');
const postCloseElement = postElement.querySelector('.big-picture__cancel');
const commentsShownCountElement = postElement.querySelector('.comments-shown-count');
const commentsListElement = postElement.querySelector('.social__comments');
const commentsLoaderElement = postElement.querySelector('.comments-loader');

let commentsData = [];
let commentsStartIndex = 0;
let commentsShownCount = 0;

const createCommentItem = ({ avatar, message, name }) => {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');

  const userPicture = document.createElement('img');
  userPicture.classList.add('social__picture');
  userPicture.src = avatar;
  userPicture.alt = name;
  userPicture.width = AVATAR_WIDTH;
  userPicture.height = AVATAR_HEIGHT;
  commentItem.append(userPicture);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = message;
  commentItem.append(commentText);

  return commentItem;
};

const renderComments = () => {
  const comments = commentsData.slice(commentsStartIndex, commentsStartIndex + COMMENTS_SHOWN_COUNT);
  commentsStartIndex += COMMENTS_SHOWN_COUNT;

  const commentsListFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentsListFragment.append(createCommentItem(comment));
  });

  commentsShownCount += comments.length;
  commentsShownCountElement.textContent = commentsShownCount;

  if (commentsShownCount >= commentsData.length) {
    commentsLoaderElement.classList.add('hidden');
  }
  commentsListElement.append(commentsListFragment);
};

const renderPost = ({ url, description, comments, likes }) => {
  postElement.querySelector('.big-picture__img img').src = url;
  postElement.querySelector('.social__caption').textContent = description;
  postElement.querySelector('.likes-count').textContent = likes;
  postElement.querySelector('.comments-count').textContent = comments.length;
  commentsLoaderElement.classList.remove('hidden');
  commentsListElement.innerHTML = '';
  commentsData = comments;
  renderComments();
  openModal(postElement);
};

const resetCommentsCounts = () => {
  commentsStartIndex = 0;
  commentsShownCount = 0;
};

commentsLoaderElement.addEventListener('click', () => {
  renderComments();
});

postCloseElement.addEventListener('click', () => {
  closeModal();
});

export { renderPost, resetCommentsCounts };
