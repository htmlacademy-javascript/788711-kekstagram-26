import { openModal, closeModal } from './modal-window.js';

const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;

const COMMENTS_SHOWN_COUNT = 5;

const postModalElement = document.querySelector('.big-picture');
const postModalCloseElement = postModalElement.querySelector('.big-picture__cancel');
const commentsShownCountElement = postModalElement.querySelector('.comments-shown-count');
const commentsListElement = postModalElement.querySelector('.social__comments');
const commentsLoaderElement = postModalElement.querySelector('.comments-loader');

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

const renderComments = (comments) => {
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

const showComments = () => {
  const comments = commentsData.slice(commentsStartIndex, commentsStartIndex + COMMENTS_SHOWN_COUNT);
  commentsStartIndex += COMMENTS_SHOWN_COUNT;
  renderComments(comments);
};

const renderPicture = ({ url, description, comments, likes }) => {
  commentsData = comments;
  postModalElement.querySelector('.big-picture__img img').src = url;
  postModalElement.querySelector('.social__caption').textContent = description;
  postModalElement.querySelector('.likes-count').textContent = likes;
  postModalElement.querySelector('.comments-count').textContent = comments.length;
  commentsLoaderElement.classList.remove('hidden');
  commentsListElement.innerHTML = '';
  showComments();
  openModal(postModalElement);
};

const resetCommentsCounts = () => {
  commentsStartIndex = 0;
  commentsShownCount = 0;
};

postModalCloseElement.addEventListener('click', () => {
  closeModal();
});

commentsLoaderElement.addEventListener('click', showComments);

export { renderPicture, resetCommentsCounts };
