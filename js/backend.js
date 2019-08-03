'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var STATUS_CODE_OK = 200;
  var TIMEOUT = 10000;
  var ERROR_TIMEOUT_TEXT = 'Запрос не успел выполниться за {TIMEOUT}мс.';
  var ERROR_REQUEST_TEXT = 'Запрос не выполнен. {status}: {text}.';

  var createServerRequest = function (method, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        onSuccess(xhr.response);
      } else {
        onError(
            ERROR_REQUEST_TEXT
            .replace('{status}', xhr.status)
            .replace('{text}', xhr.statusText)
        );
      }
    });

    xhr.addEventListener('error', function () {
      onError(
          ERROR_REQUEST_TEXT
          .replace('{status}', xhr.status)
          .replace('{text}', xhr.statusText)
      );
    });

    xhr.addEventListener('timeout', function () {
      onError(
          ERROR_TIMEOUT_TEXT.replace('{TIMEOUT}', TIMEOUT)
      );
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    createServerRequest('GET', URL_LOAD, onSuccess, onError);
  };

  var upload = function (onSuccess, onError, data) {
    createServerRequest('POST', URL_UPLOAD, onSuccess, onError, data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
