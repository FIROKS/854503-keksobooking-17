'use strict';

var PINS_LIMIT = 8;
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

var TypeToPriceMap = {
  palace: 10000,
  house: 5000,
  flat: 1000,
  bungalo: 0
};

var generateRandomHouseType = function () {
  return HOUSE_TYPES[generateRandomNumber(0, HOUSE_TYPES.length - 1)];
};

var generateAvatar = function (index) {
  return 'img/avatars/user0' + (index + 1) + '.png';
};

var generateRandomNumber = function (from, to) {
  return Math.round(from - 0.5 + Math.random() * (to - from + 1));
};

generateRandomNumber();

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
      element.remove();
    });
};

var activateFilters = function () {
  filterFormElements.forEach(activateElement);
  filterFieldsetElements.forEach(activateElement);
};

var activateForm = function () {
  mapElement.classList.remove('map--faded');
  formElement.classList.remove('ad-form--disabled');

  formFieldsetElements.forEach(activateElement);

  fieldTypeElement.addEventListener('change', onFieldTypeElementChange);
  fieldTimeInElement.addEventListener('change', onFieldTimeInElementChange);
  fieldTimeOutElement.addEventListener('change', onFieldTimeOutElementChange);
};

var deactivateFilters = function () {
  filterFormElements.forEach(disableElement);
  filterFieldsetElements.forEach(disableElement);
};

var deactivateForm = function () {
  mapElement.classList.add('map--faded');
  formElement.classList.add('ad-form--disabled');

  formFieldsetElements.forEach(disableElement);

  fieldTypeElement.removeEventListener('change', onFieldTypeElementChange);
  fieldTimeInElement.removeEventListener('change', onFieldTimeInElementChange);
  fieldTimeOutElement.removeEventListener('change', onFieldTimeOutElementChange);
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
  activateFilters();
  renderPins(pins);

  mapMainPinElement.removeEventListener('click', onMapMainPinElementClick);
};

var onFieldTypeElementChange = function () {
  var price = TypeToPriceMap[fieldTypeElement.value];

  fieldPriceElement.min = price;
  fieldPriceElement.placeholder = price;
};

var onFieldTimeInElementChange = function () {
  fieldTimeOutElement.selectedIndex = fieldTimeInElement.selectedIndex;
};

var onFieldTimeOutElementChange = function () {
  fieldTimeInElement.selectedIndex = fieldTimeOutElement.selectedIndex;
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

    y = Math.max(Y_LIMIT_MIN, Math.min(Y_LIMIT_MAX, y));
    x = Math.max(X_LIMIT_MIN, Math.min(X_LIMIT_MAX, x));

    mapMainPinElement.style.top = y + 'px';
    mapMainPinElement.style.left = x + 'px';
  };

  var onDocumentMouseUp = function (evtMouseUp) {
    evtMouseUp.preventDefault();

    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', onDocumentMouseUp);
  };

  document.addEventListener('mousemove', onDocumentMouseMove);
  document.addEventListener('mouseup', onDocumentMouseUp);
};


var mapElement = document.querySelector('.map');

var filtersElement = mapElement.querySelector('.map__filters');
var filterFormElements = filtersElement.querySelectorAll('.map__filter');
var filterFieldsetElements = filtersElement.querySelectorAll('fieldset');

var mapMainPinElement = mapElement.querySelector('.map__pin--main');
var mapPinsElements = mapElement.querySelector('.map__pins');
var mapPinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

var formElement = document.querySelector('.ad-form');
var formFieldsetElements = formElement.querySelectorAll('fieldset');
var fieldAddressElement = formElement.querySelector('#address');
var fieldPriceElement = formElement.querySelector('#price');
var fieldTypeElement = formElement.querySelector('#type');
var fieldTimeInElement = formElement.querySelector('#timein');
var fieldTimeOutElement = formElement.querySelector('#timeout');

var pins = generatePins(PINS_LIMIT);

destroyPins();
deactivateForm();
deactivateFilters();
setDefaultFieldAdress();

mapMainPinElement.addEventListener('click', onMapMainPinElementClick);
mapMainPinElement.addEventListener('mousedown', onMapMainPinElementMouseDown);

