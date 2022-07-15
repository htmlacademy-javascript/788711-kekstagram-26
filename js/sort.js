import { debounce } from './util.js';
import { renderThumbnails, clearThumbnails } from './thumbnails.js';

const RANDOM_POSTS_COUNT = 10;
const RERENDER_DELAY = 500;
const ACTIVE_FILTER_CLASS = 'img-filters__button--active';

const filtersContainerElement = document.querySelector('.img-filters');

const getRandomPosts = (posts) => {
  const postData = [];
  let randomPost;
  for (let i = 0; i < RANDOM_POSTS_COUNT; i++) {
    randomPost = Math.floor(Math.random() * ((posts.length - 1) + 1));
    postData.push(posts[randomPost]);
    posts.splice(randomPost, 1);
  }
  return postData;
};

const getDiscussedPosts = (posts) => posts.sort((currentPost, nextPost) => nextPost.comments.length - currentPost.comments.length);

const getActiveFilter = () => filtersContainerElement.querySelector(`.${ACTIVE_FILTER_CLASS}`);

const sortPosts = (posts, callback) => {
  const activeFilter = getActiveFilter().id;
  const sortConfig = {
    'filter-default': () => posts,
    'filter-random': () => getRandomPosts(posts.slice()),
    'filter-discussed': () => getDiscussedPosts(posts.slice()),
  };
  const sortedPosts = sortConfig[activeFilter]();
  callback(sortedPosts);
};

const onFiltersClick = (posts, callback) => {
  filtersContainerElement.addEventListener('click', (evt) => {
    if (!evt.target.matches('.img-filters__button') || evt.target.classList.contains(`.${ACTIVE_FILTER_CLASS}`)) {
      return;
    }
    getActiveFilter().classList.remove(`${ACTIVE_FILTER_CLASS}`);
    evt.target.classList.add(`${ACTIVE_FILTER_CLASS}`);
    sortPosts(posts, callback);
  });
};

const renderPosts = (posts) => {
  filtersContainerElement.classList.remove('img-filters--inactive');

  sortPosts(posts, (sortedPost) => {
    renderThumbnails(sortedPost);
  });

  onFiltersClick(posts,
    debounce(
      (sortedPost) => {
        clearThumbnails();
        renderThumbnails(sortedPost);
      },
      RERENDER_DELAY,
    ));
};

export { renderPosts };
