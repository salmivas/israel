'use strict';

(function () {
  var inputPhones = document.querySelectorAll('input[type="tel"]');
  var MODIFIER_ACTIVE = '--active';
  var MODIFIER_VALID = '--valid';
  var MODIFIER_INVALID = '--invalid';
  var MAX_PHONE_LENGTH = 11;
  window.masks = [];

  var maskPhone = function (element) {
    return new window.IMask(element, {
      mask: '+{7} (000) 000-00-00',
      lazy: true,
    });
  };

  var maskInit = function (inputElement) {
    var inputParent = inputElement.parentNode;
    var activeModifier = inputParent.classList[0].concat(MODIFIER_ACTIVE);
    var validModifier = inputParent.classList[0].concat(MODIFIER_VALID);
    var invalidModifier = inputParent.classList[0].concat(MODIFIER_INVALID);
    var mask = maskPhone(inputElement);

    mask.on('accept', function () {
      inputElement.parentNode.classList.add(activeModifier);
      inputElement.parentNode.classList.contains(invalidModifier) ? inputElement.parentNode.classList.remove(invalidModifier) : "";

      switch (true) {
        case mask.unmaskedValue.length === 0:
          inputElement.parentNode.classList.remove(activeModifier);
          break;
        case mask.unmaskedValue.length === MAX_PHONE_LENGTH:
          inputElement.parentNode.classList.add(validModifier);
          break;
        case mask.unmaskedValue.length < MAX_PHONE_LENGTH && inputElement.parentNode.classList.contains(validModifier):
          inputElement.parentNode.classList.remove(validModifier);
          break;
        case mask.unmaskedValue.length < MAX_PHONE_LENGTH:
          inputElement.parentNode.classList.remove(validModifier);
          break;
      }
    })

    return mask;
  }

  for (var i = 0; i < inputPhones.length; i++) {
    if (inputPhones[i]) {
      masks.push(maskInit(inputPhones[i]));
    }
  }
})();
