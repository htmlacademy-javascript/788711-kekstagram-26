const API_URL = 'https://26.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onError) => {
  fetch(`${API_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((posts) => {
      onSuccess(posts);
    })
    .catch(() => {
      onError('Ошибка загрузки данных. Попробуйте обновить страницу');
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(API_URL, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .catch(() => {
      onError();
    });
};

export { getData, sendData };
