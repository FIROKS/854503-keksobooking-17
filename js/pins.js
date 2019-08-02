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
    var fragment = document.createDocumentFragment();

    pins.forEach(function (pin) {
      var element = createPinElement(pin);

      element.addEventListener('click', function () {
        if (typeof clickCallback === 'function') {
          clickCallback(pin);
        }
      });

      fragment.appendChild(element);
    });

    mapPinsElement.appendChild(fragment);
  };

  var destroyPins = function () {
    mapPinsElement
      .querySelectorAll('.map__pin:not(.map__pin--main)')
      .forEach(function (element) {
        element.remove();
      });
  };

  var clickCallback;
  var mapElement = document.querySelector('.map');
  var mapPinsElement = mapElement.querySelector('.map__pins');
  var mapPinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pins = {
    render: renderPins,
    destroy: destroyPins,
    setPinClickCallback: function (callback) {
      clickCallback = callback;
    }
  };

})();
