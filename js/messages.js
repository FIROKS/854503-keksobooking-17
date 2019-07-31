'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var renderErrorElement = function () {
    var errorMessageElement = errorTemplateElement.cloneNode(true);
    var closeElement = errorMessageElement.querySelector('.error__button');

    closeElement.addEventListener('click', onCloseElementClick);
    document.addEventListener('keydown', createOnEscPressHandler(errorMessageElement));
    document.addEventListener('click', createOnClickHandler(errorMessageElement));

    mainBlockElement.appendChild(errorMessageElement);
  };

  var createErrorMessage = function () {
    renderErrorElement();
  };

  var renderSuccessMessage = function () {
    var successMessageElement = successTemplateElement.cloneNode(true);

    document.addEventListener('keydown', createOnEscPressHandler(successMessageElement));
    document.addEventListener('click', createOnClickHandler(successMessageElement));

    mainBlockElement.appendChild(successMessageElement);
  };

  var createSuccessMessage = function () {
    renderSuccessMessage();
  };

  var createOnEscPressHandler = function (element) {
    return function (evtKeyPressed) {
      evtKeyPressed.preventDefault();

      if (evtKeyPressed.keyCode === ESC_KEYCODE) {
        deleteMessage(element);

        document.removeEventListener('keydown', createOnEscPressHandler(element));
      }
    };
  };

  var createOnClickHandler = function (element) {
    return function (evtClick) {
      evtClick.preventDefault();

      deleteMessage(element);
      document.removeEventListener('click', createOnClickHandler(element));
    };
  };

  var deleteMessage = function (element) {
    element.remove();
  };

  var onCloseElementClick = function () {
    var errorMessageElement = mainBlockElement.querySelector('.error');

    if (!errorMessageElement) {
      return;
    }

    document.removeEventListener('keydown', createOnEscPressHandler(errorMessageElement));
    document.removeEventListener('click', createOnClickHandler(errorMessageElement));

    deleteMessage(errorMessageElement);
  };

  var mainBlockElement = document.querySelector('main');

  var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var successTemplateElement = document.querySelector('#success').content.querySelector('.success');

  window.messages = {
    createErrorMessage: createErrorMessage,
    createSuccessMessage: createSuccessMessage
  };

})();
