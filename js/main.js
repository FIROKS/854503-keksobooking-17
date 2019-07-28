'use strict';

var mainPinCoordinates = window.mainPin.getCoordinates();
var cachedPins;

var onLoadSuccess = function (loadedPins) {
  window.map.activate();
  window.form.activate();
  window.filters.activate();

  cachedPins = loadedPins;
  window.pins.render(window.filters.filterPins(cachedPins));

  window.card.render(cachedPins[0]);
};

window.filters.setChangeCallback(function () {
  window.pins.destroy();
  window.pins.render(window.filters.filterPins(cachedPins));
});

var onLoadError = function () {
  window.messages.createErrorMessage();
};

window.mainPin.setClickCallback(function () {
  window.backend.load(onLoadSuccess, onLoadError);
});

window.mainPin.setMoveCallback(function (x, y) {
  window.form.setFieldAdress(x, y);
});

window.form.setSubmitCallback(function () {
  // console.log('form is sumbit');
});

window.map.deactivate();
window.form.deactivate();
window.filters.deactivate();
window.pins.destroy();

window.form.setFieldAdress(mainPinCoordinates.x, mainPinCoordinates.y);
