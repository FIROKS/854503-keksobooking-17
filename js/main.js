'use strict';

var defaultMainPinCoordinates = window.mainPin.getCoordinates();
var cachedPins;

var deactivateApplication = function () {
  window.map.deactivate();
  window.form.deactivate();
  window.filters.deactivate();
  window.pins.destroy();
  window.card.destroy();
};

var onLoadSuccess = function (loadedPins) {
  cachedPins = loadedPins;

  window.map.activate();
  window.form.activate();
  window.filters.activate();
  window.pins.render(
      window.filters.filterPins(cachedPins)
  );
};

window.filters.setChangeCallback(function () {
  window.pins.destroy();
  window.pins.render(window.filters.filterPins(cachedPins));
});

var onLoadError = function () {
  window.messages.createErrorMessage();
};

var onUploadSuccess = function () {
  deactivateApplication();
  window.messages.createSuccessMessage();
};

var onUploadError = function () {
  window.messages.createSuccessMessage();
};

window.mainPin.setClickCallback(function () {
  window.backend.load(onLoadSuccess, onLoadError);
});

window.mainPin.setMoveCallback(function (x, y) {
  window.form.setFieldAdress(x, y);
});

window.form.setSubmitCallback(function (data) {
  window.backend.upload(onUploadSuccess, onUploadError, data);
});

window.form.setResetCallback(function () {
  deactivateApplication();
});

window.pins.setPinClickCallback(function (pin) {
  window.card.destroy();
  window.card.create(pin);
});

window.form.setFieldAdress(
    defaultMainPinCoordinates.x,
    defaultMainPinCoordinates.y
);

deactivateApplication();
