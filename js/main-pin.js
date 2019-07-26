'use strict';

(function () {

  var X_LIMIT_MIN = 0;
  var X_LIMIT_MAX = 1200;
  var Y_LIMIT_MIN = 130;
  var Y_LIMIT_MAX = 630;

  var onMapMainPinElementClick = function () {

    if (typeof clickCallback === 'function') {
      clickCallback();
    }
    mapMainPinElement.removeEventListener('click', onMapMainPinElementClick);
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

      x = Math.max(X_LIMIT_MIN, Math.min(X_LIMIT_MAX, x));
      y = Math.max(Y_LIMIT_MIN, Math.min(Y_LIMIT_MAX, y));

      mapMainPinElement.style.top = y + 'px';
      mapMainPinElement.style.left = x + 'px';

      if (typeof moveCallback === 'function') {
        moveCallback(x, y);
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
    }
  };
})();