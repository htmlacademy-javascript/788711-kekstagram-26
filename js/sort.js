import { getRandomInt } from './util.js';

const POSTS_START_INDEX = 0;
const RANDOM_POSTS_COUNT = 10;
const ACTIVE_FILTER_CLASS = 'img-filters__button--active';

const filtersElement = document.querySelector('.img-filters');

const getRandomPosts = (postsData) => {
  const posts = postsData.slice();
  let randomPost;

  for (let i = posts.length - 1; i > POSTS_START_INDEX; i--) {
    randomPost = getRandomInt(POSTS_START_INDEX, i);
    [posts[i], posts[randomPost]] = [posts[randomPost], posts[i]];
  }

  return posts.slice(POSTS_START_INDEX, RANDOM_POSTS_COUNT);
};

const getDiscussedPosts = (posts) => posts.slice().sort((currentPost, nextPost) => nextPost.comments.length - currentPost.comments.length);

const onFiltersClick = (posts, callback) => {
  filtersElement.classList.remove('img-filters--inactive');

  filtersElement.addEventListener('click', (evt) => {
    if (!evt.target.matches('.img-filters__button') || evt.target.classList.contains('img-filters__button--active')) {
      return;
    }

    const activeFilter = filtersElement.querySelector(`.${ACTIVE_FILTER_CLASS}`);
    activeFilter.classList.remove(`${ACTIVE_FILTER_CLASS}`);
    evt.target.classList.add(`${ACTIVE_FILTER_CLASS}`);

    const filter = evt.target.id;
    let sortedPost = [];
    switch (filter) {
      case 'filter-default':
        sortedPost = posts;
        break;
      case 'filter-random':
        sortedPost = getRandomPosts(posts);
        break;
      case 'filter-discussed':
        sortedPost = getDiscussedPosts(posts);
        break;
    }

    callback(sortedPost);
  });
};

export { onFiltersClick };
