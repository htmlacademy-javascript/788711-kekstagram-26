const DIVISOR = 100;

const scaleProperty = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  DEFAULT: 100
};

const formElement = document.querySelector('.img-upload__form');
const imageElement = formElement.querySelector('.img-upload__preview img');
const scaleElement = formElement.querySelector('.scale');
const scaleValueElement = formElement.querySelector('.scale__control--value');

let scaleValue = scaleProperty.DEFAULT;

const setImageScale = (value) => {
  scaleValueElement.value = `${value}%`;
  imageElement.style.transform = `scale(${value / DIVISOR})`;
};

const resetImageScale = () => {
  scaleValue = scaleProperty.DEFAULT;
  setImageScale(scaleValue);
};

const onScaleClick = (evt) => {
  if (evt.target.matches('.scale__control--smaller') && scaleValue > scaleProperty.MIN) {
    scaleValue -= scaleProperty.STEP;
    return setImageScale(scaleValue);
  }

  if (evt.target.matches('.scale__control--bigger') && scaleValue < scaleProperty.MAX) {
    scaleValue += scaleProperty.STEP;
    return setImageScale(scaleValue);
  }
};

setImageScale(scaleValue);

scaleElement.addEventListener('click', onScaleClick);

export { resetImageScale };
