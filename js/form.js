'use strict';


(function () {

  var TypeToPriceMap = {
    PALACE: 10000,
    HOUSE: 5000,
    FLAT: 1000,
    BUNGALO: 0
  };

  var RoomNumberToCapacityMap = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var activateForm = function () {

    formElement.classList.remove('ad-form--disabled');
    formFieldsetElements.forEach(activateElement);

    formElement.addEventListener('submit', onFormElementSubmit);
    fieldTypeElement.addEventListener('change', onFieldTypeElementChange);
    fieldTimeInElement.addEventListener('change', onFieldTimeInElementChange);
    fieldTimeOutElement.addEventListener('change', onFieldTimeOutElementChange);
    fieldRoomNumberElement.addEventListener('change', onFieldRoomNumberElementChange);
    formResetElement.addEventListener('click', onResetElementClick);

    fieldAvatarUploadElement.addEventListener('change', avatarUploadElementOnChangeHandler());
    fieldPhotoUploadElement.addEventListener('change', photoUploadElementChangeHandler());
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

    fieldAvatarUploadElement.removeEventListener('change', avatarUploadElementOnChangeHandler());
    fieldPhotoUploadElement.removeEventListener('change', photoUploadElementChangeHandler());

    formElement.reset();
    validateCapacity();
    setDefaultPlaceholder();
    setCapacityValue();
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

  var setCapacityValue = function () {
    var notDisabledElement = fieldCapacityElement.querySelector('option:not([disabled])');
    if (notDisabledElement) {
      fieldCapacityElement.value = notDisabledElement.value;
    }
  };

  var setPricePlaceholder = function () {
    var price = TypeToPriceMap[fieldTypeElement.value.toUpperCase()];

    fieldPriceElement.min = price;
    fieldPriceElement.placeholder = price;
  };

  var setDefaultPlaceholder = function () {
    setPricePlaceholder();
  };

  var createPhotoElement = function (image) {
    var newPhotoContainerElement = photoContainerElement.cloneNode(true);
    var newPhotoElement = document.createElement('img');
    uploadImage(image, newPhotoElement);
    newPhotoElement.style.width = '70px';
    newPhotoElement.style.height = '70px';
    newPhotoElement.alt = 'Фото объявления';

    newPhotoContainerElement.appendChild(newPhotoElement);

    return newPhotoContainerElement;
  };

  var renderPhoto = function (photo) {
    photoContainerElement.remove();
    photosContainerElement.appendChild(createPhotoElement(photo));
  };

  var photoUploadElementChangeHandler = function () {
    return function () {
      var file = fieldPhotoUploadElement.files[0];

      if (validateFile(file)) {

        renderPhoto(file);
      }
    };
  };

  var avatarUploadElementOnChangeHandler = function () {
    return function () {
      var file = fieldAvatarUploadElement.files[0];

      if (validateFile(file)) {
        uploadImage(file, userAvatarElement);
      }
    };
  };

  var validateFile = function (file) {
    var fileName = file.name.toLowerCase();
    return FILE_TYPES.some(function (element) {
      return fileName.endsWith(element);
    });
  };

  var uploadImage = function (image, imageElement) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      imageElement.src = reader.result;
    });
    reader.readAsDataURL(image);
  };

  var onFieldTypeElementChange = function () {
    setPricePlaceholder();
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
    setCapacityValue();
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

  var userAvatarElement = formElement.querySelector('#user-avatar');
  var fieldAvatarUploadElement = formElement.querySelector('#avatar');

  var fieldPhotoUploadElement = formElement.querySelector('#images');
  var photosContainerElement = formElement.querySelector('.ad-form__photo-container');
  var photoContainerElement = formElement.querySelector('.ad-form__photo');

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
    setResetCallback: function (callback) {
      resetCallback = callback;
    }
  };

})();
