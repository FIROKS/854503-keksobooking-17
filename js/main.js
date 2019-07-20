
// 1 constants

var PINS_LIMIT = 8;
var HOUSE_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

// Значение ограничено размерами блока, в котором перетаскивается метка."
var X_MIN_LIMIT = 0; // @TODO
var X_MAX_LIMIT = 1200; // @TODO

var Y_MIN_LIMIT = 130
var Y_MAX_LIMIT = 630

// 2 function

var generateRandomHouseType = function() {
  var n = generateRandomNumber(0, HOUSE_TYPES.length - 1);
  // @TODO: from HOUSE_TYPES, can use generateRandomNumber
  return HOUSE_TYPES[n];
}

var generateAvatar = function(index) {
  return "img/avatars/user0" + (index + 1) + ".png";
}

var generateRandomNumber = function(from, to) {
  var rand = Math.round(from - 0.5 + Math.random() * (to - from + 1));
  return rand; // @TODO
}

var generatePin = function(index) {
  return {
    "author": {
      "avatar": generateAvatar(index)
    },
    "offer": {
      "type": generateRandomHouseType(),
    },
    "location": {
      "x": generateRandomNumber(X_MIN_LIMIT, X_MAX_LIMIT) - 20,
      "y": generateRandomNumber(Y_MIN_LIMIT, Y_MAX_LIMIT) - 40,
    }
  }
}

var generatePins = function(limit) {
  var Pins = []
  for (var i = 0; i < limit; i++) {
    Pins.push(generatePin(i))
  }
  return Pins;
}



var renderPin = function(a) {
  var newPin = mapPin.cloneNode(true);
  newPin.querySelector('.map__pin-author').src = mocks[i].author.avatar;
  newPin.querySelector('.map__pin-author').alt = mocks[i].offer.type;
  newPin.style.left = mocks[i].location.x + 'px'
  newPin.style.top = mocks[i].location.y + 'px';

  return newPin;
}

// 3 main code

var mapElement = document.querySelector('.map');
var mapPins = mapElement.querySelector('.map__pins');
// add element .map__pin
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');

mapElement.classList.remove('map--faded');

var mocks = generatePins(PINS_LIMIT);


var fragment = document.createDocumentFragment();
for (var i = 0; i < PINS_LIMIT; i++) {

  fragment.appendChild(renderPin(mocks[i]));
}

mapPins.appendChild(fragment);
