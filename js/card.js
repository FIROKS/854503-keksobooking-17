'use strict';

(function () {

  var typeToAnotherType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var Features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var OFFER_PRICE = '{offer.price} ₽/ночь.';

  var OFFER_CAPACITY = '{offer.rooms} комнаты для {offer.guests} гостей.';

  var OFFER_TIME = 'Заезд после {offer.checkin}, выезд до {offer.checkout}.';

  var createCard = function (data) {
    var newOfferCardElement = cardTemplateElement.cloneNode(true);
    var newOfferCardTitleElement = newOfferCardElement.querySelector('.popup__title');
    var newOfferCardAddressElement = newOfferCardElement.querySelector('.popup__text--address');
    var newOfferCardPriceElement = newOfferCardElement.querySelector('.popup__text--price');
    var newOfferCardTypeElement = newOfferCardElement.querySelector('.popup__type');
    var newOfferCardCapacityElement = newOfferCardElement.querySelector('.popup__text--capacity');
    var newOfferCardTimeElement = newOfferCardElement.querySelector('.popup__text--time');

    var newOfferCardFeaturesElement = newOfferCardElement.querySelector('.popup__features');
    var newOfferCardFeatureElements = newOfferCardFeaturesElement.querySelectorAll('.popup__feature');

    var newOfferCardDescriptionElement = newOfferCardElement.querySelector('.popup__description');
    var newOfferCardPhotosElement = newOfferCardElement.querySelector('.popup__photos');

    var newOfferCardPhotoElement = newOfferCardPhotosElement.querySelector('.popup__photo');

    var newOfferCardAvatarElement = newOfferCardElement.querySelector('.popup__avatar');

    newOfferCardTitleElement.textContent = data.offer.title;
    newOfferCardAddressElement = data.offer.address;
    newOfferCardPriceElement.textContent = OFFER_PRICE.replace('{offer.price}', data.offer.price);
    newOfferCardTypeElement.textContent = typeToAnotherType[data.offer.type];
    newOfferCardCapacityElement.textContent = OFFER_CAPACITY.
      replace('{offer.rooms}', data.offer.rooms).
      replace('{offer.guests}', data.offer.guests);

    newOfferCardTimeElement.textContent = OFFER_TIME.
      replace('{offer.checkin}', data.offer.checkin).
      replace('{offer.checkout}', data.offer.checkout);

    newOfferCardFeatureElements.forEach(function (element) {
      element.remove();
    });
    newOfferCardFeaturesElement.appendChild(renderFeatures(data.offer.features));

    newOfferCardDescriptionElement.textContent = data.offer.description;
    newOfferCardPhotoElement.src = data.offer.photos;
    newOfferCardAvatarElement.src = data.author.avatar;

    return newOfferCardElement;
  };

  var renderCard = function (data) {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(createCard(data));
    mainElement.appendChild(fragment);
  };

  var createFeature = function (feature) {
    var newCardFeatureElement = cardFeatureTemplateElement.cloneNode();

    newCardFeatureElement.classList.add('popup__feature--' + feature);
    return newCardFeatureElement;
  };

  var renderFeatures = function (features) {
    var fragment = document.createDocumentFragment();

    features.forEach(function (feature) {
      fragment.appendChild(createFeature(feature));
    });

    return fragment;
  };

  var mainElement = document.querySelector('main');

  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
  var cardFeatureTemplateElement = cardTemplateElement.querySelector('.popup__feature');

  window.card = {
    render: function (data) {
      renderCard(data);
    }
  };

})();
