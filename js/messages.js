'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var renderErrorElement = function () {
    var errorMessageElement = errorTemplateElement.cloneNode(true);

    document.addEventListener('keydown', createOnEscPressHandler(errorMessageElement));
    document.addEventListener('click', createOnClickHandler(errorMessageElement));

    mainBlockElement.appendChild(errorMessageElement);
  };

  var createErrorMessage = function () {
    renderErrorElement();
  };

  var renderSuccessMessage = function () {
    var successMessageElement = successTemplateElement.cloneNode(true);

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
      document.addEventListener('click', createOnClickHandler(element));
    };
  };

  var deleteMessage = function (element) {
    element.remove();
  };

  var mainBlockElement = document.querySelector('main');

  var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var successTemplateElement = document.querySelector('#success').content.querySelector('.success');

  window.messages = {
    createErrorMessage: createErrorMessage,
    createSuccessMessage: createSuccessMessage
  };

})();
