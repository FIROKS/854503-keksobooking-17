'use strict';

(function () {

  var onDataLoad = function () {
    if (xhr.status === 200) {
      onSuccess(xhr.response);
    } else {
      onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  };

  var onSuccess = function(data) {
    console.log(data);
  };

  var onError = function (message) {
    console.log(message);
  };

  var onTimeoutError = function () {
    console.log ('Запрос не успел выполниться за ' + xhr.timeout + 'мс.');
  };

  var xhr = new XMLHttpRequest();

  xhr.responseType = 'json'; // JSON.parse(xhr.responseText);

  var loadData = function (serverUrl) {

    xhr.addEventListener('load', onDataLoad);
    xhr.addEventListener('error', onError('Произошла ошибка соединения.')); // Как передать текст?   function () {onError('Произошла ошибка соединения.')}
    xhr.addEventListener('timeout', onTimeoutError);

    xhr.open('get', serverUrl);
    xhr.send();
  };

  window.dataExchange = {
    load: loadData
  };

})();
