'use strict';

(function () {
  var programsNames = document.querySelectorAll('.programs__names li');
  var programsDescriptions = document.querySelectorAll('.programs__descriptions li');
  var VISUALLY_HIDDEN = 'visually-hidden';
  var PROGRAMS_NAME = 'programs__name';
  var PROGRAMS_NAME_CHECKED = 'programs__name--checked';
  var SECOND_TOGGLER = 1;


  var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, array[i], i);
    }
  };

  var getChildNodeIndex = function (elem) {
    var position = 0;
    while ((elem = elem.previousSibling) !== null) {
      if (elem.nodeType !== Node.TEXT_NODE) {
        position++;
      }
    }

    return position;
  };

  var closeAll = function (elements) {
    if (elements) {
      forEach(elements, function (element) {
        if (!element.classList.contains(VISUALLY_HIDDEN)) {
          element.classList.add(VISUALLY_HIDDEN);
        }
      });
    }
  };

  var openElement = function (element) {
    if (element && element.classList.contains(VISUALLY_HIDDEN)) {
      element.classList.remove(VISUALLY_HIDDEN);
    }
  };

  var addTogglerClass = function (togglerElement, className) {
    if (!togglerElement.classList.contains(className)) {
      togglerElement.classList.add(className);
    }
    return;
  };

  var uncheckToggler = function (togglerElement) {
    if (togglerElement.classList.contains(PROGRAMS_NAME_CHECKED)) {
      togglerElement.classList.remove(PROGRAMS_NAME_CHECKED);
    }
    return;
  };

  var uncheckTogglers = function (togglers) {
    if (togglers) {
      forEach(togglers, function (toggler) {
        uncheckToggler(toggler);
      });
    }
  };

  var addTogglersNames = function (togglers, activeToggler) {
    if (togglers) {
      forEach(togglers, function (toggler) {
        addTogglerClass(toggler, PROGRAMS_NAME);
        addTogglerClass(togglers[activeToggler], PROGRAMS_NAME_CHECKED);
      });
    }
  };

  var togglersInit = function (elementToShow) {
    if (programsNames && programsDescriptions) {
      closeAll(programsDescriptions);
      addTogglersNames(programsNames, elementToShow);
      openElement(programsDescriptions[elementToShow]);

      forEach(programsNames, function (programName) {
        programName.addEventListener('click', function () {
          var togglerElement = programName;

          uncheckTogglers(programsNames);
          addTogglerClass(togglerElement, PROGRAMS_NAME_CHECKED);
          closeAll(programsDescriptions);
          openElement(programsDescriptions[getChildNodeIndex(togglerElement)]);
        });
      });
    }
  };

  togglersInit(SECOND_TOGGLER);
})();
