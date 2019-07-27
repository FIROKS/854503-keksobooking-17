'use strict';

var PINS_LIMIT = 8;


var mainPinCoordinates = window.mainPin.getCoordinates();

window.mainPin.setClickCallback(function () {
  window.map.activate();
  window.form.activate();
  window.filters.activate();
  window.pins.render(
      window.pins.generate(PINS_LIMIT)
  );
});

window.mainPin.setMoveCallback(function (x, y) {
  window.form.setFieldAdress(x, y);
});


window.form.setSubmitCallback(function () {
  console.log('form is sumbit');
});


window.map.deactivate();
window.form.deactivate();
window.filters.deactivate();
window.pins.destroy();


window.form.setFieldAdress(mainPinCoordinates.x, mainPinCoordinates.y);
