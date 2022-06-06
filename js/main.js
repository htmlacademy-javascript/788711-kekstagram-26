const getRandomInt = (min, max) => {
  if (min < 0 || max < 0 || !Number.isInteger(min) || !Number.isInteger(max)) {
    return -1;
  }

  if (min > max) {
    [max, min] = [min, max];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInt(10, 10);

const checkStringLength = (text, maxLength) => text.length <= maxLength;

checkStringLength('Функция для проверки максимальной длины строки.', 47);
