'use strict';

(function () {

  var activateMap = function () {
    mapElement.classList.remove('map--faded');
  };

  var deactivateMap = function () {
    mapElement.classList.add('map--faded');
  };

  var mapElement = document.querySelector('.map');

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap
  };

})();
