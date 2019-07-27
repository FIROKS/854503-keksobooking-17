'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  var loadPins = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  window.backend = {
    load: loadPins
  };

})();
