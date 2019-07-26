'use strict';

(function () {
  var disableElement = function (element) {
    element.setAttribute('disabled', '');
  };

  var activateElement = function (element) {
    element.removeAttribute('disabled');
  };

  var mapElement = document.querySelector('.map');
  var filtersElement = mapElement.querySelector('.map__filters');
  var filterFormElements = filtersElement.querySelectorAll('.map__filter');
  var filterFieldsetElements = filtersElement.querySelectorAll('fieldset');

  window.filters = {
    activate: function () {
      filterFormElements.forEach(activateElement);
      filterFieldsetElements.forEach(activateElement);
    },
    deactivate: function () {
      filterFormElements.forEach(disableElement);
      filterFieldsetElements.forEach(disableElement);
    }
  };
})();
