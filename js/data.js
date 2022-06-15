import { getRandomInt, getRandomArrayElement } from './util.js';

const PHOTO_COUNT = 25;

const NAMES = [
  'Евгений',
  'Александр',
  'Виктор',
  'Анастасия',
  'Павел',
  'Дмитрий',
  'Иван',
  'Мария',
  'Алексей'
];

const DESCRIPTIONS = [
  'Из архива',
  'Отпуск не ждет',
  'Что вы об этом думаете?',
  'Разве не потрясающе?',
  'Соскучились?',
  'Открываю для себя мир. Скоро вернусь',
  'Говорю “да” новым приключениям',
  'Запасаюсь воспоминаниями',
  'Лучше один раз увидеть',
  'Снова в дороге',
  'Да, еще одно фото',
  'Улыбнись)'
];

const LikesCount = {
  MIN: 15,
  MAX: 200
};

const CommentsCount = {
  MIN: 1,
  MAX: 5
};

let commentId = 0;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const AvatarsRange = {
  MIN: 1,
  MAX: 6
};

const getCommentId = () => {
  commentId += 1;
  return commentId;
};

const createRandomCommentData = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInt(AvatarsRange.MIN, AvatarsRange.MAX)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createRandomPhotoData = () => Array.from({ length: PHOTO_COUNT }, (item, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInt(LikesCount.MIN, LikesCount.MAX),
  comments: Array.from({ length: getRandomInt(CommentsCount.MIN, CommentsCount.MAX) }, createRandomCommentData)
}));

export { createRandomPhotoData };
