import { checkStringLength } from './util.js';
import { generatePosts } from './data.js';
import { renderPostThumbnails } from './post-thumbnails.js';

renderPostThumbnails(generatePosts());

checkStringLength('Функция для проверки максимальной длины строки.', 47);
