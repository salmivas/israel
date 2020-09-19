'use strict';

(function () {
  var SliderClass = {
    Activities: {
      Container: {
        CLASS: 'activities__slider',
        SELECTOR: '.activities__slider',
      },
      Wrapper: {
        CLASS: 'activities__slider-list',
        SELECTOR: '.activities__slider-list',
      },
      Slide: {
        CLASS: 'activities__slider-item',
        SELECTOR: '.activities__slider-item',
      },
      Pagination: {
        CLASS: 'activities__slider-pagination',
        SELECTOR: '.activities__slider-pagination',
      },
      BULLET_ELEMENT: 'div',
      BULLET_CLASS: 'activities__slider-bullet',
      BULLET_ACTIVE_CLASS: 'activities__slider-bullet--active',
    },
    Common: {
      CONTAINER_INITIALIZED: 'swiper-container-initialized',
      NO_SWIPING: 'swiper-no-swiping',
    },
  };

  var ViewportWidth = {
    MAX_MOBILE: '(max-width: 767px)',
  };

  var MediaQuery = {
    MAX_MOBILE_WIDTH: window.matchMedia(ViewportWidth.MAX_MOBILE),
  };

  var activitiesSlider = document.querySelector(SliderClass.Activities.Container.SELECTOR);
  var activitiesSliderList = document.querySelector(SliderClass.Activities.Wrapper.SELECTOR);

  var activitiesSliderSwiper;

  var runActivitiesSliderSwiper = function () {
    if (MediaQuery.MAX_MOBILE_WIDTH.matches && !activitiesSlider.classList.contains(SliderClass.Common.CONTAINER_INITIALIZED)) {
      activitiesSliderList.style.flexWrap = 'nowrap';

      activitiesSliderSwiper = new Swiper(SliderClass.Activities.Container.SELECTOR, {
        init: false,
        spaceBetween: 0,
        wrapperClass: SliderClass.Activities.Wrapper.CLASS,
        slideClass: SliderClass.Activities.Slide.CLASS,
        pagination: {
          el: SliderClass.Activities.Pagination.SELECTOR,
          bulletElement: SliderClass.Activities.BULLET_ELEMENT,
          bulletClass: SliderClass.Activities.BULLET_CLASS,
          bulletActiveClass: SliderClass.Activities.BULLET_ACTIVE_CLASS,
          type: 'bullets',
          clickable: false,
        },
      });
      activitiesSliderSwiper.init();
    } else {
      if (activitiesSlider.classList.contains(SliderClass.Common.CONTAINER_INITIALIZED) && !MediaQuery.MAX_MOBILE_WIDTH.matches) {
        activitiesSliderSwiper.destroy();
      }
    }
  };

  runActivitiesSliderSwiper();
  window.addEventListener('resize', function () {
    runActivitiesSliderSwiper();
  });
})();
