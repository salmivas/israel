'use strict';
(function () {
  var faq = document.querySelector('.faq');

  if (faq) {
    var accordionTogglers = document.querySelectorAll('.faq__accordion-toggler');
    var ACCORDION_TOGGLER_CLOSED = 'faq__accordion-toggler--closed';
    var ACCORDION_DESCRIPTION = '.faq__accordion-description';

    var forEach = function (array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, array[i], i);
      }
    };

    var closeQuestion = function (questionElement) {
      questionElement.classList.add(ACCORDION_TOGGLER_CLOSED);
      questionElement.parentElement.querySelector(ACCORDION_DESCRIPTION).hidden = true;
    };

    var openQuestion = function (questionElement) {
      questionElement.classList.remove(ACCORDION_TOGGLER_CLOSED);
      questionElement.parentElement.querySelector(ACCORDION_DESCRIPTION).hidden = false;
    };

    var closeAllQuestions = function (togglersArray) {
      forEach(togglersArray, function (it) {
        closeQuestion(it);
      });
    };

    var togglersInit = function () {
      forEach(accordionTogglers, function (toggler) {
        toggler.addEventListener('click', function () {
          if (toggler.classList.contains(ACCORDION_TOGGLER_CLOSED)) {
            closeAllQuestions(accordionTogglers);
            openQuestion(toggler);
            return;
          }
          closeQuestion(toggler);
        });
        closeQuestion(toggler);
      });
    };

    togglersInit();
  }
})();
