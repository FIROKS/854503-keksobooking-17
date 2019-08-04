'use strict';

(function () {
  var X_LIMIT_MIN = 0;
  var X_LIMIT_MAX = 1200;
  var Y_LIMIT_MIN = 130;
  var Y_LIMIT_MAX = 630;

  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 82;

  var onMapMainPinElementClick = function () {
    if (typeof clickCallback === 'function') {
      clickCallback();
    }
  };

  var onMapMainPinElementMouseDown = function (evtMouseDown) {
    evtMouseDown.preventDefault();

    var startCoords = {
      x: evtMouseDown.clientX,
      y: evtMouseDown.clientY
    };

    var onDocumentMouseMove = function (evtMouseMove) {
      evtMouseMove.preventDefault();

      var shift = {
        x: startCoords.x - evtMouseMove.clientX,
        y: startCoords.y - evtMouseMove.clientY
      };

      startCoords = {
        x: evtMouseMove.clientX,
        y: evtMouseMove.clientY
      };

      var y = parseInt(mapMainPinElement.style.top, 10) - shift.y;
      var x = parseInt(mapMainPinElement.style.left, 10) - shift.x;

      x = Math.max(X_LIMIT_MIN, Math.min(X_LIMIT_MAX - MAIN_PIN_WIDTH, x));
      y = Math.max(Y_LIMIT_MIN, Math.min(Y_LIMIT_MAX, y));

      mapMainPinElement.style.top = y + 'px';
      mapMainPinElement.style.left = x + 'px';

      if (typeof moveCallback === 'function') {
        moveCallback(x + MAIN_PIN_WIDTH / 2, y + MAIN_PIN_HEIGHT);
      }
    };

    var onDocumentMouseUp = function (evtMouseUp) {
      evtMouseUp.preventDefault();

      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);
    };

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  };

  var clickCallback;
  var moveCallback;
  var mapElement = document.querySelector('.map');
  var mapMainPinElement = mapElement.querySelector('.map__pin--main');

  mapMainPinElement.addEventListener('click', onMapMainPinElementClick);
  mapMainPinElement.addEventListener('mousedown', onMapMainPinElementMouseDown);

  window.mainPin = {
    setClickCallback: function (callback) {
      clickCallback = callback;
    },
    setMoveCallback: function (callback) {
      moveCallback = callback;
    },
    getCoordinates: function () {
      return {
        x: parseInt(mapMainPinElement.style.left, 10),
        y: parseInt(mapMainPinElement.style.top, 10)
      };
    },
    setCoordinates: function (x, y) {
      mapMainPinElement.style.top = y + 'px';
      mapMainPinElement.style.left = x + 'px';
    }
  };
})();
