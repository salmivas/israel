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
    Reviews: {
      Container: {
        CLASS: 'reviews__slider',
        SELECTOR: '.reviews__slider',
      },
      Wrapper: {
        CLASS: 'reviews__slider-list',
        SELECTOR: '.reviews__slider-list',
      },
      Slide: {
        CLASS: 'reviews__slider-item',
        SELECTOR: '.reviews__slider-item',
      },
      Pagination: {
        CLASS: 'reviews__slider-pagination',
        SELECTOR: '.reviews__slider-pagination',
      },
      Navigation: {
        SLIDER_BUTTONS: '.reviews_slider-buttons',
        NEXT_CLASS: '.reviews__button-next',
        PREV_CLASS: '.reviews__button-prev',
      },
      Fraction: {
        CURRENT_CLASS: 'reviews__slider-pagination-current',
        TOTAL_CLASS: 'reviews__slider-pagination-total',
      },
    },
    Common: {
      CONTAINER_INITIALIZED: 'swiper-container-initialized',
      NO_SWIPING: 'swiper-no-swiping',
    },
  };

  var CommonClass = {
    VISUALLY_HIDDEN: 'visually-hidden',
  };

  var ViewportWidth = {
    MAX_MOBILE: '(max-width: 767px)',
  };

  var MediaQuery = {
    MAX_MOBILE_WIDTH: window.matchMedia(ViewportWidth.MAX_MOBILE),
  };

  var activitiesSlider = document.querySelector(SliderClass.Activities.Container.SELECTOR);
  var activitiesSliderList = document.querySelector(SliderClass.Activities.Wrapper.SELECTOR);
  var reviewsSlider = document.querySelector(SliderClass.Reviews.Container.SELECTOR);
  var reviewsSliderList = document.querySelector(SliderClass.Reviews.Wrapper.SELECTOR);
  var reviewsSliderButtons = document.querySelector(SliderClass.Reviews.Navigation.SLIDER_BUTTONS);

  var activitiesSliderSwiper;
  var reviewsSliderSwiper;

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

  var runReviewsSlider = function () {
    if (!reviewsSlider.classList.contains(SliderClass.Common.CONTAINER_INITIALIZED)) {
      reviewsSliderList.style.display = 'flex';
      reviewsSliderList.style.flexWrap = 'nowrap';
      reviewsSliderButtons.classList.remove(CommonClass.VISUALLY_HIDDEN);

      if (MediaQuery.MAX_MOBILE_WIDTH.matches) {
        reviewsSlider.classList.remove(SliderClass.Common.NO_SWIPING);
      } else {
        reviewsSlider.classList.add(SliderClass.Common.NO_SWIPING);
      }

      reviewsSliderSwiper = new Swiper(SliderClass.Reviews.Container.SELECTOR, {
        init: false,
        spaceBetween: 0,
        initialSlide: 2,
        wrapperClass: SliderClass.Reviews.Wrapper.CLASS,
        slideClass: SliderClass.Reviews.Slide.CLASS,
        pagination: {
          el: SliderClass.Reviews.Pagination.SELECTOR,
          type: 'fraction',
          currentClass: SliderClass.Reviews.Fraction.CURRENT_CLASS,
          totalClass: SliderClass.Reviews.Fraction.TOTAL_CLASS,
          clickable: false,
        },
        navigation: {
          nextEl: SliderClass.Reviews.Navigation.NEXT_CLASS,
          prevEl: SliderClass.Reviews.Navigation.PREV_CLASS,
        },
      });
      reviewsSliderSwiper.init();
    }
  };

  runReviewsSlider();
  runActivitiesSliderSwiper();
  window.addEventListener('resize', function () {
    runActivitiesSliderSwiper();
    if (MediaQuery.MAX_MOBILE_WIDTH.matches) {
      reviewsSlider.classList.remove(SliderClass.Common.NO_SWIPING);
      return;
    } else {
      reviewsSlider.classList.add(SliderClass.Common.NO_SWIPING);
    }
  });
})();
