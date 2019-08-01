'use strict';

var defaultMainPinCoordinates = window.mainPin.getCoordinates();
var cachedPins;

var deactivateApplication = function () {
  window.map.deactivate();
  window.form.deactivate();
  window.filters.deactivate();
  window.pins.destroy();
  window.card.destroy();
  window.mainPin.setCoordinates(
      defaultMainPinCoordinates.x,
      defaultMainPinCoordinates.y
  );
  window.form.setFieldAdress(
      defaultMainPinCoordinates.x,
      defaultMainPinCoordinates.y
  );
};

var activatePage = function () {
  window.map.activate();
  window.form.activate();
  window.filters.activate();
  window.pins.render(
      window.filters.filterPins(cachedPins)
  );
};

window.filters.setChangeCallback(function () {
  window.pins.destroy();
  window.card.destroy();
  window.pins.render(window.filters.filterPins(cachedPins));
});

window.mainPin.setClickCallback(function () {
  if (cachedPins) {
    activatePage();
  } else {
    window.backend.load(
        function (loadedPins) {
          cachedPins = loadedPins;
          activatePage();
        },
        window.messages.createErrorMessage
    );
  }
});

window.mainPin.setMoveCallback(function (x, y) {
  window.form.setFieldAdress(x, y);
});

window.form.setSubmitCallback(function (data) {
  window.backend.upload(
      function () {
        window.messages.createSuccessMessage();
        deactivateApplication();
      },
      window.messages.createErrorMessage,
      data
  );
});

window.form.setResetCallback(function () {
  deactivateApplication();
});

window.pins.setPinClickCallback(function (pin) {
  window.card.destroy();
  window.card.create(pin);
});

deactivateApplication();
