'use strict';

var PINS_LIMIT = 8;
var HOUSE_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var X_MIN_LIMIT = 0;
var X_MAX_LIMIT = 1200;
var X_OFFSET = 20;

var Y_MIN_LIMIT = 130;
var Y_MAX_LIMIT = 630;
var Y_OFFSET = 40;

var generateRandomHouseType = function () {
  return HOUSE_TYPES[generateRandomNumber(0, HOUSE_TYPES.length - 1)];
};

var generateAvatar = function (index) {
  return 'img/avatars/user0' + (index + 1) + '.png';
};

var generateRandomNumber = function (from, to) {
  return Math.round(from - 0.5 + Math.random() * (to - from + 1));
};

var generatePin = function (index) {
  return {
    author: {
      avatar: generateAvatar(index)
    },
    offer: {
      type: generateRandomHouseType(),
    },
    location: {
      x: generateRandomNumber(X_MIN_LIMIT, X_MAX_LIMIT) - X_OFFSET,
      y: generateRandomNumber(Y_MIN_LIMIT, Y_MAX_LIMIT) - Y_OFFSET,
    }
  };
};

var generatePins = function (limit) {
  var pins = [];
  for (var i = 0; i < limit; i++) {
    pins.push(generatePin(i));
  }
  return pins;
};

var createPinElement = function (pin) {
  var pinElement = mapPinTemplateElement.cloneNode(true);
  var pinAuthorElement = pinElement.querySelector('.map__pin-author');

  pinAuthorElement.src = pin.author.avatar;
  pinAuthorElement.alt = pin.offer.type;
  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';

  return pinElement;
};

var disableElement = function (element) {
  element.setAttribute('disabled', '');
};

var activateElement = function (element) {
  element.removeAttribute('disabled');
};

var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();

  pins.forEach(function (pin) {
    fragment.appendChild(createPinElement(pin));
  });

  mapPinsElements.appendChild(fragment);
};

var destroyPins = function () {
  mapPinsElements
    .querySelectorAll('.map__pin:not(.map__pin--main)')
    .forEach(function (element) {
      element.remove(); // mapPinsElements.removeChild(element) ?
    });
};

var activateForm = function () {
  mapElement.classList.remove('map--faded');
  mainFormElement.classList.remove('ad-form--disabled');
  mainFormFieldsetElements.forEach(activateElement);
  mapFormFieldsetElements.forEach(activateElement);
};

var deactivateForm = function () {
  mapFilters.forEach(disableElement);
  mainFormFieldsetElements.forEach(disableElement);
  mapFormFieldsetElements.forEach(disableElement);
};

var setDefaultFieldAdress = function () {
  var mainPinCoordinates = mapMainPinElement.getBoundingClientRect();
  var mapCoordinates = mapElement.getBoundingClientRect();
  var x = mainPinCoordinates.x - mapCoordinates.x;
  var y = mainPinCoordinates.y - mapCoordinates.y;

  fieldAddressElement.value = x + ',' + y;
};

var onMapMainPinElementClick = function () {
  activateForm();
  renderPins(pins);

  mapMainPinElement.removeEventListener('click', onMapMainPinElementClick);
};

var mapElement = document.querySelector('.map');
var mapMainPinElement = mapElement.querySelector('.map__pin--main');
var mapPinsElements = mapElement.querySelector('.map__pins');
var mapPinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

var mapFormElement = mapElement.querySelector('.map__filters');
var mapFormFieldsetElements = mapFormElement.querySelectorAll('fieldset');
var mapFilters = mapFormElement.querySelectorAll('.map__filter');

var mainFormElement = document.querySelector('.ad-form');
var mainFormFieldsetElements = mainFormElement.querySelectorAll('fieldset');
var fieldAddressElement = mainFormElement.querySelector('#address');

var pins = generatePins(PINS_LIMIT);

destroyPins();
deactivateForm();
setDefaultFieldAdress();

mapMainPinElement.addEventListener('click', onMapMainPinElementClick);

