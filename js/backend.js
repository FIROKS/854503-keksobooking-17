'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var STATUS_CODE_OK = 200;

  var createServerRequest = function (method, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = 1000;

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
