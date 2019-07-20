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

var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length - 1; i++) {
    fragment.appendChild(createPinElement(pins[i]));
  }

  mapPinsElements.appendChild(fragment);
};

var mapElement = document.querySelector('.map');
var mapPinsElements = mapElement.querySelector('.map__pins');
var mapPinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
var pins = generatePins(PINS_LIMIT);

mapElement.classList.remove('map--faded');

renderPins(pins);