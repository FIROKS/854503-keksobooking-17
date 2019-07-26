'use strict';

(function () {

  var HOUSE_TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var X_LIMIT_MIN = 0;
  var X_LIMIT_MAX = 1200;
  var Y_LIMIT_MIN = 130;
  var Y_LIMIT_MAX = 630;

  var X_OFFSET = 20;
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
        x: generateRandomNumber(X_LIMIT_MIN, X_LIMIT_MAX) - X_OFFSET,
        y: generateRandomNumber(Y_LIMIT_MIN, Y_LIMIT_MAX) - Y_OFFSET,
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

    pins.forEach(function (pin) {
      fragment.appendChild(createPinElement(pin));
    });

    mapPinsElements.appendChild(fragment);
  };

  var destroyPins = function () {
    mapPinsElements
      .querySelectorAll('.map__pin:not(.map__pin--main)')
      .forEach(function (element) {
        element.remove();
      });
  };

  var mapElement = document.querySelector('.map');
  var mapPinsElements = mapElement.querySelector('.map__pins');
  var mapPinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pins = {
    generate: generatePins,
    render: renderPins,
    destroy: destroyPins
  };

})();
