'use strict';

var SERVER_URL = 'https://js.dump.academy/keksobooking/data';

var mainPinCoordinates = window.mainPin.getCoordinates();

window.mainPin.setClickCallback(function () {
  window.map.activate();
  window.form.activate();
  window.filters.activate();

  // window.dataExchange.load(SERVER_URL)
  // window.pins.render(
  // );
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
