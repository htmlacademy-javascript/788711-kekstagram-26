const DIVISOR = 100;

const ScaleProperty = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  DEFAULT: 100
};

const formElement = document.querySelector('.img-upload__form');
const imageElement = formElement.querySelector('.img-upload__preview img');
const scaleElement = formElement.querySelector('.scale');
const scaleValueElement = formElement.querySelector('.scale__control--value');

let scaleValue = ScaleProperty.DEFAULT;

const setImageScale = (value) => {
  scaleValueElement.value = `${value}%`;
  imageElement.style.transform = `scale(${value / DIVISOR})`;
};

const resetImageScale = () => {
  scaleValue = ScaleProperty.DEFAULT;
  setImageScale(scaleValue);
};

const onScaleClick = (evt) => {
  if (evt.target.matches('.scale__control--smaller') && scaleValue > ScaleProperty.MIN) {
    scaleValue -= ScaleProperty.STEP;
    return setImageScale(scaleValue);
  }

  if (evt.target.matches('.scale__control--bigger') && scaleValue < ScaleProperty.MAX) {
    scaleValue += ScaleProperty.STEP;
    return setImageScale(scaleValue);
  }
};

setImageScale(scaleValue);

scaleElement.addEventListener('click', onScaleClick);

export { resetImageScale };
