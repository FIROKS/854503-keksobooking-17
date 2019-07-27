'use strict';

(function () {

  var renderErrorElement = function () {
    var errorMessageElement = errorTemplateElement.cloneNode(true);

    mainBlockElement.appendChild(errorMessageElement);
  };

  var createErrorMessage = function () {
    renderErrorElement();
  };

  var mainBlockElement = document.querySelector('main');

  var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');

  window.messages = {
    createErrorMessage: createErrorMessage
  };

})();
