'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';

  var createServerRequest = function (method, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response); // Почему работало без xhr.response?
      } else {
        onError();
      }
    });

    xhr.open(method, url);

    if (data === undefined) {
      xhr.send();
    } else {
      xhr.send(data);
    }
  };

  var loadPins = function (onSuccess, onError) {
    createServerRequest('GET', URL_LOAD, onSuccess, onError);
  };

  var uploadForm = function (onSuccess, onError, data) {
    createServerRequest('GET', URL_UPLOAD, onSuccess, onError, data);
  };

  window.backend = {
    load: loadPins,
    upload: uploadForm
  };

})();
