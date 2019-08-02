'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var onDucumentKeyPressed;
  var onDocumentClick;

  var renderErrorElement = function () {
    var errorMessageElement = errorTemplateElement.cloneNode(true);
    var closeElement = errorMessageElement.querySelector('.error__button');

    onDucumentKeyPressed = createOnEscPressHandler(errorMessageElement);
    onDocumentClick = createOnClickHandler(errorMessageElement);

    closeElement.addEventListener('click', onCloseElementClick);

    createHandlers();

    mainBlockElement.appendChild(errorMessageElement);
  };

  var renderSuccessMessage = function () {
    var successMessageElement = successTemplateElement.cloneNode(true);

    onDucumentKeyPressed = createOnEscPressHandler(successMessageElement);
    onDocumentClick = createOnClickHandler(successMessageElement);

    createHandlers();

    mainBlockElement.appendChild(successMessageElement);
  };

  var removeHandlers = function () {
    document.removeEventListener('keydown', onDucumentKeyPressed);
    document.removeEventListener('click', onDocumentClick);
  };

  var createHandlers = function () {
    document.addEventListener('keydown', onDucumentKeyPressed);
    document.addEventListener('click', onDocumentClick);
  };

  var createOnEscPressHandler = function (element) {
    return function (evtKeyPressed) {
      evtKeyPressed.preventDefault();

      if (evtKeyPressed.keyCode === ESC_KEYCODE) {
        element.remove();

        removeHandlers();
      }
    };
  };

  var createOnClickHandler = function (element) {
    return function (evtClick) {
      evtClick.preventDefault();

      element.remove();
      removeHandlers();
    };
  };

  var onCloseElementClick = function (evtClick) {
    var errorMessageElement = mainBlockElement.querySelector('.error');

    if (!errorMessageElement) {
      return;
    }
    evtClick.preventDefault();
    removeHandlers();

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
