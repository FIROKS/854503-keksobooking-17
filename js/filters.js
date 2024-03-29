'use strict';

(function () {
  var PINS_LIMIT = 5;
  var DEBOUNCE_CHANGE_TIMEOUT = 500;

  var PRICE_VALUE_MEDIUM_MIN = 10000;
  var PRICE_VALUE_HIGH_MIN = 50000;

  var PRICE_TYPE_LOW = 'low';
  var PRICE_TYPE_MIDDLE = 'middle';
  var PRICE_TYPE_HIGH = 'high';
  var FILTER_DISABLED = 'any';

  var disableElement = function (element) {
    element.setAttribute('disabled', '');
  };

  var activateElement = function (element) {
    element.removeAttribute('disabled');
  };

  var getSelectedFeatures = function () {
    var selectedFeatures = [];
    filterFeatureElements.forEach(function (element) {
      if (element.checked) {
        selectedFeatures.push(element.value);
      }
    });
    return selectedFeatures;
  };

  var filterByFeatures = function (pin) {
    var selectedFeatures = getSelectedFeatures();

    return selectedFeatures.every(function (feature) {
      return pin.offer.features.includes(feature);
    });
  };

  var filterByType = function (pin) {
    return (
      fieldTypeElement.value === FILTER_DISABLED ||
      fieldTypeElement.value === pin.offer.type.toString()
    );
  };

  var filterByRooms = function (pin) {
    return (
      fieldRoomsElement.value === FILTER_DISABLED ||
      fieldRoomsElement.value === pin.offer.rooms.toString()
    );
  };

  var filterByGuests = function (pin) {
    return (
      fieldGuestsElement.value === FILTER_DISABLED ||
      fieldGuestsElement.value === pin.offer.guests.toString()
    );
  };

  var filterByPrice = function (pin) {
    var type = fieldPriceElement.value;
    var value = pin.offer.price;

    return (
      (type === FILTER_DISABLED) ||
      (type === PRICE_TYPE_LOW && value < PRICE_VALUE_MEDIUM_MIN) ||
      (type === PRICE_TYPE_HIGH && value > PRICE_VALUE_HIGH_MIN) ||
      (type === PRICE_TYPE_MIDDLE && (value >= PRICE_VALUE_MEDIUM_MIN && value <= PRICE_VALUE_HIGH_MIN))
    );
  };

  var changeCallback;
  var lastTimeout;
  var mapElement = document.querySelector('.map');
  var filtersElement = mapElement.querySelector('.map__filters');
  var filterFormElements = filtersElement.querySelectorAll('.map__filter');
  var filterFieldsetElements = filtersElement.querySelectorAll('fieldset');
  var fieldTypeElement = filtersElement.querySelector('#housing-type');
  var fieldPriceElement = filtersElement.querySelector('#housing-price');
  var fieldRoomsElement = filtersElement.querySelector('#housing-rooms');
  var fieldGuestsElement = filtersElement.querySelector('#housing-guests');

  var filterFeatureFieldsetElement = filtersElement.querySelector('.map__features');
  var filterFeatureElements = filterFeatureFieldsetElement.querySelectorAll('.map__checkbox');

  filtersElement.addEventListener('change', function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      if (typeof changeCallback === 'function') {
        changeCallback();
      }
    }, DEBOUNCE_CHANGE_TIMEOUT);
  });

  window.filters = {
    activate: function () {
      filterFormElements.forEach(activateElement);
      filterFieldsetElements.forEach(activateElement);
    },
    deactivate: function () {
      filtersElement.reset();
      filterFormElements.forEach(disableElement);
      filterFieldsetElements.forEach(disableElement);
    },
    filterPins: function (pins) {
      return pins
        .filter(function (pin) {
          return (
            filterByType(pin) &&
            filterByGuests(pin) &&
            filterByRooms(pin) &&
            filterByPrice(pin) &&
            filterByFeatures(pin)
          );
        })
        .slice(0, PINS_LIMIT);
    },
    setChangeCallback: function (callback) {
      changeCallback = callback;
    }
  };
})();
