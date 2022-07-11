const DIVISOR = 100;

const formElement = document.querySelector('.img-upload__form');
const imageElement = formElement.querySelector('.img-upload__preview img');
const scaleElement = formElement.querySelector('.scale');
const scaleValueElement = formElement.querySelector('.scale__control--value');

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  DEFAULT: 100
};

let scaleValue = Scale.DEFAULT;

const setImageScale = (value) => {
  scaleValueElement.value = `${value}%`;
  imageElement.style.transform = `scale(${value / DIVISOR})`;
};

const resetImageScale = () => {
  scaleValue = Scale.DEFAULT;
  setImageScale(scaleValue);
};

const onScaleClick = (evt) => {
  if (evt.target.matches('.scale__control--smaller') && scaleValue > Scale.MIN) {
    scaleValue -= Scale.STEP;
    return setImageScale(scaleValue);
  }

  if (evt.target.matches('.scale__control--bigger') && scaleValue < Scale.MAX) {
    scaleValue += Scale.STEP;
    return setImageScale(scaleValue);
  }
};

setImageScale(scaleValue);

scaleElement.addEventListener('click', onScaleClick);

export { resetImageScale };
