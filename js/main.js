'use strict';

var mainPinCoordinates = window.mainPin.getCoordinates();

var onLoadSuccess = function (pins) {
  window.map.activate();
  window.form.activate();
  window.filters.activate();
  window.pins.render(pins);
};

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
