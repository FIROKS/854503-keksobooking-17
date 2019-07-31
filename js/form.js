'use strict';


(function () {

  var TypeToPriceMap = {
    palace: 10000,
    house: 5000,
    flat: 1000,
    bungalo: 0
  };

  var RoomNumberToCapacityMap = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var activateForm = function () {
    formElement.classList.remove('ad-form--disabled');
    formFieldsetElements.forEach(activateElement);

    formElement.addEventListener('submit', onFormElementSubmit);
    fieldTypeElement.addEventListener('change', onFieldTypeElementChange);
    fieldTimeInElement.addEventListener('change', onFieldTimeInElementChange);
    fieldTimeOutElement.addEventListener('change', onFieldTimeOutElementChange);
    fieldRoomNumberElement.addEventListener('change', onFieldRoomNumberElementChange);
    formResetElement.addEventListener('click', onResetElementClick);
  };

  var deactivateForm = function () {
    formElement.classList.add('ad-form--disabled');
    formFieldsetElements.forEach(disableElement);

    formElement.removeEventListener('submit', onFormElementSubmit);
    fieldTypeElement.removeEventListener('change', onFieldTypeElementChange);
    fieldTimeInElement.removeEventListener('change', onFieldTimeInElementChange);
    fieldTimeOutElement.removeEventListener('change', onFieldTimeOutElementChange);
    fieldRoomNumberElement.removeEventListener('change', onFieldRoomNumberElementChange);
    formResetElement.removeEventListener('click', onResetElementClick);

    validateCapacity();
  };

  var disableElement = function (element) {
    element.setAttribute('disabled', '');
  };

  var activateElement = function (element) {
    element.removeAttribute('disabled');
  };

  var validateCapacity = function () {
    var capacities = RoomNumberToCapacityMap[fieldRoomNumberElement.value];

    fieldCapacityElements.forEach(function (option) {
      if (capacities.includes(option.value)) {
        activateElement(option);
      } else {
        disableElement(option);
      }
    });
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

  var onFormElementSubmit = function (evt) {
    evt.preventDefault();
    if (typeof submitCallback === 'function') {
      submitCallback(new FormData(formElement));
    }
  };

  var onFieldRoomNumberElementChange = function () {
    validateCapacity();
  };

  var onResetElementClick = function (evt) {
    evt.preventDefault();

    formElement.reset();

    if (typeof resetCallback === 'function') {
      resetCallback();
    }
  };

  var submitCallback;
  var resetCallback;

  var formElement = document.querySelector('.ad-form');
  var formFieldsetElements = formElement.querySelectorAll('fieldset');
  var fieldAddressElement = formElement.querySelector('#address');
  var fieldPriceElement = formElement.querySelector('#price');
  var fieldTypeElement = formElement.querySelector('#type');
  var fieldTimeInElement = formElement.querySelector('#timein');
  var fieldTimeOutElement = formElement.querySelector('#timeout');
  var fieldRoomNumberElement = formElement.querySelector('#room_number');

  var fieldCapacityElement = formElement.querySelector('#capacity');
  var fieldCapacityElements = fieldCapacityElement.querySelectorAll('option');

  var formResetElement = formElement.querySelector('.ad-form__reset');

  validateCapacity();

  window.form = {
    activate: activateForm,
    deactivate: deactivateForm,
    setFieldAdress: function (x, y) {
      fieldAddressElement.value = x + ',' + y;
    },
    setSubmitCallback: function (callback) {
      submitCallback = callback;
    },
    resetSubmitCallback: function (callback) {
      resetCallback = callback;
    },
    setResetCallback: function (callback) {
      resetCallback = callback;
    }
  };

})();
