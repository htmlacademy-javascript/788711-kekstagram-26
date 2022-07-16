const EFFECTS = [
  {
    name: 'none',
    filter: 'none',
    unit: '',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'chrome',
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  {
    name: 'sepia',
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  {
    name: 'marvin',
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'phobos',
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
  },
  {
    name: 'heat',
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
  },
];

const DEFAULT_EFFECT = EFFECTS[0];

const formElement = document.querySelector('.img-upload__form');
const imageElement = formElement.querySelector('.img-upload__preview img');
const effectContainerElement = formElement.querySelector('.effect-level');
const effectValueElement = formElement.querySelector('.effect-level__value');
const sliderElement = formElement.querySelector('.effect-level__slider');

let selectedEffect = DEFAULT_EFFECT;

const isDefaultEffect = () => selectedEffect === DEFAULT_EFFECT;

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: DEFAULT_EFFECT.min,
      max: DEFAULT_EFFECT.max,
    },
    start: DEFAULT_EFFECT.max,
    step: DEFAULT_EFFECT.step,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  });
};

const updateEffect = () => {
  imageElement.className = '';
  imageElement.style.filter = 'none';

  if (isDefaultEffect()) {
    if (sliderElement.noUiSlider) {
      sliderElement.noUiSlider.destroy();
    }
    effectContainerElement.classList.add('hidden');
    return;
  }

  if (!sliderElement.noUiSlider) {
    createSlider();
  }

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: selectedEffect.min,
      max: selectedEffect.max
    },
    start: selectedEffect.max,
    step: selectedEffect.step
  });

  imageElement.classList.add(`effects__preview--${selectedEffect.name}`);
  effectContainerElement.classList.remove('hidden');

  sliderElement.noUiSlider.on('update', () => {
    const sliderValue = sliderElement.noUiSlider.get();
    effectValueElement.value = sliderValue;
    imageElement.style.filter = `${selectedEffect.filter}(${sliderValue}${selectedEffect.unit})`;
  });
};

const resetEffect = () => {
  selectedEffect = DEFAULT_EFFECT;
  updateEffect();
};

updateEffect();

const onFormChange = (evt) => {
  if (evt.target.closest('.effects__radio')) {
    selectedEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
    updateEffect();
  }
};

formElement.addEventListener('change', onFormChange);

export { resetEffect };
