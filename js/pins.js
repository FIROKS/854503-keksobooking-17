'use strict';

(function () {

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
    console.log(pins);
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
    render: renderPins,
    destroy: destroyPins
  };

})();
