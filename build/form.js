'use strict';
(function () {
  var body = document.querySelector('body');
  var modalFeedback = document.querySelector('.modal-feedback');
  var modalAccepted = document.querySelector('.modal-accepted');
  var callBack = document.querySelector('.call-back');
  var contacts = document.querySelector('.contacts');

  var MODIFIER_HIDDEN = '--hidden';
  var OVERFLOW_HIDDEN = 'hidden';
  var MODIFIER_INVALID = '--invalid';
  var LOCALSTORAGE_DATA_NAME = 'userData';
  var MAX_PHONE_LENGTH = 11;

  var KeyCode = {
    ESCAPE: {
      LONG: 'Escape',
      SHORT: 'Esc',
    },
  };

  var getInputValue = function (inputElement) {
    var inputValue;
    window.masks.forEach(function (mask) {
      mask.el.input === inputElement ? inputValue = mask.unmaskedValue : "";
    });

    return inputValue;
  }

  var throwCustomInputError = function (inputElement) {
    var inputParent = inputElement.parentElement;
    var invalidModifier = inputParent.classList[0].concat(MODIFIER_INVALID);

    inputParent.classList.add(invalidModifier);
  };

  var showPopup = function (popupClass, hidingClass) {
    popupClass.classList.remove(hidingClass);
    body.style.overflow = OVERFLOW_HIDDEN;
  };

  var hidePopup = function (popupClass, hidingClass) {
    popupClass.classList.add(hidingClass);
    body.style.overflow = '';
  };

  var onEscKeyDown = function (evt, popupClass, hidingClass) {
    var isEscKey = evt.key === KeyCode.ESCAPE.LONG || evt.key === KeyCode.ESCAPE.SHORT;
    if (isEscKey) {
      hidePopup(popupClass, hidingClass);
    }
    body.removeEventListener('keydown', onEscKeyDown);
  };

  var setLocalStorageData = function (userName, userPhone) {
    localStorage.clear();
    localStorage.setItem(
      LOCALSTORAGE_DATA_NAME,
      JSON.stringify({
        userName: userName,
        userPhone: userPhone,
      })
    );
  };

  var showAcceptedWindow = function () {
    if (modalAccepted) {
      var clearButton = modalAccepted.querySelector('.modal-accepted__clear-button');
      var crossButton = modalAccepted.querySelector('.modal-accepted__cross-button');
      var modalAcceptedHidden = modalAccepted.classList[0].concat(MODIFIER_HIDDEN);

      body.addEventListener('keydown', function (evt) {
        onEscKeyDown(evt, modalAccepted, modalAcceptedHidden);
      });

      clearButton.addEventListener('click', function () {
        hidePopup(modalAccepted, modalAcceptedHidden);
      });

      crossButton.addEventListener('click', function () {
        hidePopup(modalAccepted, modalAcceptedHidden);
      });

      window.addEventListener('click', function (event) {
        if (event.target === modalAccepted) {
          hidePopup(modalAccepted, modalAcceptedHidden);
        }
      });

      showPopup(modalAccepted, modalAcceptedHidden);
    }
  };

  var setSimpleValidation = function (phoneInputElement, textInputElement) {
    var phoneInputValue = getInputValue(phoneInputElement);

    if (phoneInputValue.length < MAX_PHONE_LENGTH) {
      throwCustomInputError(phoneInputElement);
    } else {
      setLocalStorageData(textInputElement ? textInputElement.value : null, phoneInputElement.value);
      window.upload.post(showAcceptedWindow, null, new FormData(contactsForm));
    }
  }

  if (modalFeedback) {
    var modalFeedbackFormContainer = document.querySelector('.modal-feedback__container');
    var callRequestButton = document.querySelector('.header__callback');
    var closeRequestButton = document.querySelector('.modal-feedback__form button[type="reset"]');
    var modalFeedbackForm = document.querySelector('.modal-feedback__form form');
    var modalUserName = document.getElementById('modal-feedback__user-name');
    var modalUserPhone = document.getElementById('modal-feedback__user-phone');
    var modalAdmission = document.getElementById('modal-admission');
    var modalFeedbackHidden = modalFeedback.classList[0].concat(MODIFIER_HIDDEN);

    var SHAKE_ANIMATION_TIMEOUT = 600;
    var ERROR_STYLE = 'shake 0.8s';
    var EMERSION_TIMEOUT = 500;

    var shake = function () {
      modalFeedbackFormContainer.style.animation = ERROR_STYLE;

      setTimeout(function () {
        modalFeedbackFormContainer.style.animation = '';
      }, SHAKE_ANIMATION_TIMEOUT);
    };

    callRequestButton.addEventListener('click', function () {
      showPopup(modalFeedback, modalFeedbackHidden);
      setTimeout(function () {
        modalUserName.focus();
      }, EMERSION_TIMEOUT);
      body.addEventListener('keydown', function (evt) {
        onEscKeyDown(evt, modalFeedback, modalFeedbackHidden);
      });
    });

    window.addEventListener('click', function (event) {
      if (event.target === modalFeedback) {
        hidePopup(modalFeedback, modalFeedbackHidden);
      }
    });

    closeRequestButton.addEventListener('click', function () {
      hidePopup(modalFeedback, modalFeedbackHidden);
    });

    modalFeedbackForm.addEventListener('submit', function (evt) {
      evt.preventDefault();

      var modalPhoneInputValue = getInputValue(modalUserPhone);

      if (modalAdmission.checked && modalPhoneInputValue.length === MAX_PHONE_LENGTH) {
        setLocalStorageData(modalUserName.value, modalUserPhone.value);
        window.upload.post(
          function () {
            hidePopup(modalFeedback, modalFeedbackHidden);
            showAcceptedWindow();
          },
          shake,
          new FormData(modalFeedbackForm)
        );
      } else if (modalPhoneInputValue.length < MAX_PHONE_LENGTH) {
        throwCustomInputError(modalUserPhone);
      }
    });
  }

  if (callBack) {
    var callBackForm = document.querySelector('.call-back form');
    var callBackPhone = document.getElementById('call-back__user-phone');

    callBackForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      setSimpleValidation(callBackPhone);
    });
  }

  if (contacts) {
    var contactsForm = document.querySelector('.contacts__call-back form');
    var contactsUserName = document.getElementById('contacts__user-name');
    var contactsUserPhone = document.getElementById('contacts__user-phone');

    contactsForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      setSimpleValidation(contactsUserPhone, contactsUserName);
    });
  }
})();
