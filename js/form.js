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

  var FILE_TYPES = [
    'gif',
    'jpg',
    'jpeg',
    'png'
  ];

  var AVATAR_DEFAULT_SRC = 'img/muffin-grey.svg';

  var PHOTO_WIDTH = '60px';
  var PHOTO_HEIGH = '60px';
  var PHOTO_ALT = 'Фото объявления';

  var activateForm = function () {
    formElement.classList.remove('ad-form--disabled');
    formFieldsetElements.forEach(activateElement);

    formElement.addEventListener('submit', onFormElementSubmit);
    fieldTypeElement.addEventListener('change', onFieldTypeElementChange);
    fieldTimeInElement.addEventListener('change', onFieldTimeInElementChange);
    fieldTimeOutElement.addEventListener('change', onFieldTimeOutElementChange);
    fieldRoomNumberElement.addEventListener('change', onFieldRoomNumberElementChange);
    formResetElement.addEventListener('click', onResetElementClick);

    fieldAvatarUploadElement.addEventListener('change', onAvatarUploadElementChange);
    fieldPhotoUploadElement.addEventListener('change', onPhotoUploadElementChange);
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

    fieldAvatarUploadElement.removeEventListener('change', onAvatarUploadElementChange);
    fieldPhotoUploadElement.removeEventListener('change', onPhotoUploadElementChange);

    formElement.reset();
    resetPhotosContainerToDefault();
    validateCapacity();
    syncPricePlaceholder();
    updateCapacityValue();

    userAvatarElement.src = AVATAR_DEFAULT_SRC;
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

  var updateCapacityValue = function () {
    var notDisabledElement = fieldCapacityElement.querySelector('option:not([disabled])');
    if (notDisabledElement) {
      fieldCapacityElement.value = notDisabledElement.value;
    }
  };

  var syncPricePlaceholder = function () {
    var price = TypeToPriceMap[fieldTypeElement.value.toUpperCase()];

    fieldPriceElement.min = price;
    fieldPriceElement.placeholder = price;
  };

  var createPhotoElement = function (file) {
    var containerElement = photoContainerElement.cloneNode(true);
    var imageElement = document.createElement('img');

    imageElement.style.width = PHOTO_WIDTH;
    imageElement.style.height = PHOTO_HEIGH;
    imageElement.alt = PHOTO_ALT;

    readFile(file, function (data) {
      imageElement.src = data;
    });

    containerElement.appendChild(imageElement);

    return containerElement;
  };

  var onPhotoUploadElementChange = function () {
    var file = fieldPhotoUploadElement.files[0];
    if (isFileValid(file)) {
      photoContainerElement.remove();
      photosContainerElement.appendChild(createPhotoElement(file));
    }
  };

  var onAvatarUploadElementChange = function () {
    var file = fieldAvatarUploadElement.files[0];
    if (isFileValid(file)) {
      readFile(file, function (data) {
        userAvatarElement.src = data;
      });
    }
  };

  var isFileValid = function (file) {
    if (file) {
      var fileName = file.name.toLowerCase();
      return FILE_TYPES.some(function (element) {
        return fileName.endsWith(element);
      });
    }

    return false;
  };

  var readFile = function (file, onLoad) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      if (typeof onLoad === 'function') {
        onLoad(reader.result);
      }
    });
    reader.readAsDataURL(file);
  };

  var resetPhotosContainerToDefault = function () {
    var photoElements = photosContainerElement.querySelectorAll('.ad-form__photo');
    photoElements.forEach(function (element) {
      element.remove();
    });
    photosContainerElement.appendChild(photoContainerElement);
  };

  var onFieldTypeElementChange = function () {
    syncPricePlaceholder();
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
    updateCapacityValue();
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
