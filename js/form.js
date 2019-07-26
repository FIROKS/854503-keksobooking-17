'use strict';


(function () {

  var TypeToPriceMap = {
    palace: 10000,
    house: 5000,
    flat: 1000,
    bungalo: 0
  };

  var activateForm = function () {

    formElement.classList.remove('ad-form--disabled');

    formFieldsetElements.forEach(activateElement);

    fieldTypeElement.addEventListener('change', onFieldTypeElementChange);
    fieldTimeInElement.addEventListener('change', onFieldTimeInElementChange);
    fieldTimeOutElement.addEventListener('change', onFieldTimeOutElementChange);
  };

  var deactivateForm = function () {

    formElement.classList.add('ad-form--disabled');

    formFieldsetElements.forEach(disableElement);

    fieldTypeElement.removeEventListener('change', onFieldTypeElementChange);
    fieldTimeInElement.removeEventListener('change', onFieldTimeInElementChange);
    fieldTimeOutElement.removeEventListener('change', onFieldTimeOutElementChange);
  };

  var disableElement = function (element) {
    element.setAttribute('disabled', '');
  };

  var activateElement = function (element) {
    element.removeAttribute('disabled');
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

  // var setDefaultFieldAdress = function () {
  //   var mainPinCoordinates = mapMainPinElement.getBoundingClientRect();
  //   var mapCoordinates = mapElement.getBoundingClientRect();
  //   var x = mainPinCoordinates.x - mapCoordinates.x;
  //   var y = mainPinCoordinates.y - mapCoordinates.y;

  //   fieldAddressElement.value = x + ',' + y;
  // };

  var formElement = document.querySelector('.ad-form');
  var formFieldsetElements = formElement.querySelectorAll('fieldset');
  var fieldAddressElement = formElement.querySelector('#address');
  var fieldPriceElement = formElement.querySelector('#price');
  var fieldTypeElement = formElement.querySelector('#type');
  var fieldTimeInElement = formElement.querySelector('#timein');
  var fieldTimeOutElement = formElement.querySelector('#timeout');

  window.form = {
    activate: activateForm,
    deactivate: deactivateForm,
    setFieldAdress: function (x, y) {
      fieldAddressElement.value = x + ',' + y;
    },
  };

})();
