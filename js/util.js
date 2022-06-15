const getRandomInt = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const checkStringLength = (text, maxLength) => text.length <= maxLength;

export { getRandomInt, getRandomArrayElement, checkStringLength };
