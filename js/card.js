'use strict';

(function () {

  var TypeToText = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var OFFER_PRICE = '{offer.price} ₽/ночь.';
  var OFFER_CAPACITY = '{offer.rooms} комнаты для {offer.guests} гостей.';
  var OFFER_TIME = 'Заезд после {offer.checkin}, выезд до {offer.checkout}.';

  var createCardElement = function (pinData) {
    var cardElement = cardTemplateElement.cloneNode(true);

    var cardTitleElement = cardElement.querySelector('.popup__title');
    var cardAddressElement = cardElement.querySelector('.popup__text--address');
    var cardPriceElement = cardElement.querySelector('.popup__text--price');
    var cardTypeElement = cardElement.querySelector('.popup__type');
    var cardCapacityElement = cardElement.querySelector('.popup__text--capacity');
    var cardTimeElement = cardElement.querySelector('.popup__text--time');
    var cardFeaturesElement = cardElement.querySelector('.popup__features');
    var cardDescriptionElement = cardElement.querySelector('.popup__description');
    var cardPhotosElement = cardElement.querySelector('.popup__photos');
    var cardAvatarElement = cardElement.querySelector('.popup__avatar');

    cardAddressElement.textContent = pinData.offer.address;
    cardAvatarElement.src = pinData.author.avatar;
    cardTitleElement.textContent = pinData.offer.title;
    cardTypeElement.textContent = TypeToText[pinData.offer.type];
    cardDescriptionElement.textContent = pinData.offer.description;

    cardPriceElement.textContent = OFFER_PRICE
      .replace('{offer.price}', pinData.offer.price);

    cardCapacityElement.textContent = OFFER_CAPACITY
      .replace('{offer.rooms}', pinData.offer.rooms)
      .replace('{offer.guests}', pinData.offer.guests);

    cardTimeElement.textContent = OFFER_TIME
      .replace('{offer.checkin}', pinData.offer.checkin)
      .replace('{offer.checkout}', pinData.offer.checkout);

    cardFeaturesElement.innerHTML = '';
    cardFeaturesElement.appendChild(createFeaturesFragment(pinData.offer.features));

    cardPhotosElement.innerHTML = '';
    cardPhotosElement.appendChild(createPhotosFragment(pinData.offer.photos));

    return cardElement;
  };

  var createFeatureElement = function (featureData) {
    var newCardFeatureElement = cardFeatureTemplateElement.cloneNode();

    newCardFeatureElement.classList.add('popup__feature--' + featureData);
    return newCardFeatureElement;
  };

  var createFeaturesFragment = function (features) {
    var fragment = document.createDocumentFragment();

    features.forEach(function (feature) {
      fragment.appendChild(createFeatureElement(feature));
    });

    return fragment;
  };

  var createPhotoElement = function (photoData) {
    var newPhotoElement = cardPhotoTemplateElement.cloneNode();

    newPhotoElement.src = photoData;

    return newPhotoElement;
  };

  var createPhotosFragment = function (photos) {
    var fragment = document.createDocumentFragment();

    photos.forEach(function (photo) {
      fragment.appendChild(createPhotoElement(photo));
    });

    return fragment;
  };


  // var createCloseElementClickHandle = function (closeElement) {
  //   return function (evt) {
  //     evt.preventDefault();

  //     //closeElement.removeEventListener('click', createCloseElementClickHandle);
  //     destroyCard();
  //     console.log('sdaf');
  //   };
  // };

  var onCloseElementClick = function (evtClick) {
    evtClick.preventDefault();

    destroyCard();
  };

  var onEscPressed = function (evtKeyPressed) {
    evtKeyPressed.preventDefault();

    if (evtKeyPressed.keyCode === 27) {
      destroyCard();
    }
  };

  var createCard = function (pin) {
    var element = createCardElement(pin);
    var closeElement = element.querySelector('.popup__close');


    closeElement.addEventListener('click', onCloseElementClick);
    // closeElement.addEventListener('click', createCloseElementClickHandle(closeElement)); Почему так не работает?
    document.addEventListener('keydown', onEscPressed);


    mainElement.appendChild(element);
  };

  var destroyCard = function () {
    var element = mainElement.querySelector('.map__card');

    if (!element) {
      return;
    }
    var closeElement = element.querySelector('.popup__close');
    closeElement.removeEventListener('click', onCloseElementClick);
    document.removeEventListener('keydown', onEscPressed);

    element.remove();
  };

  var mainElement = document.querySelector('main');
  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
  var cardFeatureTemplateElement = cardTemplateElement.querySelector('.popup__feature');
  var cardPhotoTemplateElement = cardTemplateElement.querySelector('.popup__photo');

  window.card = {
    create: createCard,
    destroy: destroyCard
  };

})();
