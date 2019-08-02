'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var onDocumentKeyPressed;
  var onDocumentClick;

  var renderErrorElement = function () {
    var errorMessageElement = errorTemplateElement.cloneNode(true);
    var closeElement = errorMessageElement.querySelector('.error__button');

    onDocumentKeyPressed = createOnEscPressHandler(errorMessageElement);
    onDocumentClick = createOnClickHandler(errorMessageElement);

    closeElement.addEventListener('click', onCloseElementClick);

    createDocumentHandlers();

    mainBlockElement.appendChild(errorMessageElement);
  };

  var renderSuccessMessage = function () {
    var successMessageElement = successTemplateElement.cloneNode(true);

    onDocumentKeyPressed = createOnEscPressHandler(successMessageElement);
    onDocumentClick = createOnClickHandler(successMessageElement);

    createDocumentHandlers();

    mainBlockElement.appendChild(successMessageElement);
  };

  var removeDocumentHandlers = function () {
    document.removeEventListener('keydown', onDocumentKeyPressed);
    document.removeEventListener('click', onDocumentClick);
  };

  var createDocumentHandlers = function () {
    document.addEventListener('keydown', onDocumentKeyPressed);
    document.addEventListener('click', onDocumentClick);
  };

  var createOnEscPressHandler = function (element) {
    return function (evt) {
      evt.preventDefault();

      if (evt.keyCode === ESC_KEYCODE) {
        element.remove();

        removeDocumentHandlers();
      }
    };
  };

  var createOnClickHandler = function (element) {
    return function (evt) {
      evt.preventDefault();

      element.remove();
      removeDocumentHandlers();
    };
  };

  var onCloseElementClick = function (evt) {
    var errorMessageElement = mainBlockElement.querySelector('.error');

    if (!errorMessageElement) {
      return;
    }
    evt.preventDefault();
    removeDocumentHandlers();

    errorMessageElement.remove();
  };

  var mainBlockElement = document.querySelector('main');

  var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var successTemplateElement = document.querySelector('#success').content.querySelector('.success');

  window.messages = {
    createErrorMessage: renderErrorElement,
    createSuccessMessage: renderSuccessMessage
  };
})();
