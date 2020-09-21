"use strict";!function(){if(document.querySelector(".faq")){var e=document.querySelectorAll(".faq__accordion-toggler"),t=function(e,t,n){for(var a=0;a<e.length;a++)t.call(n,e[a],a)},n=function(e){e.classList.add("faq__accordion-toggler--closed"),e.parentElement.querySelector(".faq__accordion-description").hidden=!0};t(e,function(a){a.addEventListener("click",function(){if(a.classList.contains("faq__accordion-toggler--closed"))return t(e,function(e){n(e)}),(i=a).classList.remove("faq__accordion-toggler--closed"),void(i.parentElement.querySelector(".faq__accordion-description").hidden=!1);var i;n(a)}),n(a)})}}(),function(){var e=document.querySelector("body"),t=document.querySelector(".modal-feedback"),n=document.querySelector(".modal-accepted"),a=document.querySelector(".call-back"),i={LONG:"Escape",SHORT:"Esc"},c=function(e){var t;return window.masks.forEach(function(n){n.el.input===e&&(t=n.unmaskedValue)}),t},o=function(t,n){t.classList.remove(n),e.style.overflow="hidden"},s=function(t,n){t.classList.add(n),e.style.overflow=""},r=function(t,n,a){(t.key===i.LONG||t.key===i.SHORT)&&s(n,a),e.removeEventListener("keydown",r)},l=function(e,t){localStorage.clear(),localStorage.setItem("userData",JSON.stringify({userName:e,userPhone:t}))},d=function(){if(n){var t=n.querySelector(".modal-accepted__clear-button"),a=n.querySelector(".modal-accepted__cross-button"),i=n.classList[0].concat("--hidden");e.addEventListener("keydown",function(e){r(e,n,i)}),t.addEventListener("click",function(){s(n,i)}),a.addEventListener("click",function(){s(n,i)}),window.addEventListener("click",function(e){e.target===n&&s(n,i)}),o(n,i)}};if(t){var u=document.querySelector(".modal-feedback__container"),m=document.querySelector(".header__callback"),f=document.querySelector('.modal-feedback__form button[type="reset"]'),L=document.querySelector(".modal-feedback__form form"),v=document.getElementById("modal-feedback__user-name"),_=document.getElementById("modal-feedback__user-phone"),p=document.getElementById("modal-admission"),E=t.classList[0].concat("--hidden"),S=function(){u.style.animation="shake 0.8s",setTimeout(function(){u.style.animation=""},600)};m.addEventListener("click",function(){o(t,E),setTimeout(function(){v.focus()},500),e.addEventListener("keydown",function(e){r(e,t,E)})}),window.addEventListener("click",function(e){e.target===t&&s(t,E)}),f.addEventListener("click",function(){s(t,E)}),L.addEventListener("submit",function(e){e.preventDefault();var n=c(_);p.checked&&11===n.length?(l(v.value,_.value),window.upload.post(function(){s(t,E),d()},S,new FormData(L))):n.length<11&&y(_)})}var y=function(e){var t=e.parentElement,n=t.classList[0].concat("--invalid");t.classList.add(n)};if(a){var k=document.querySelector(".call-back form"),g=document.getElementById("call-back__user-phone");k.addEventListener("submit",function(e){e.preventDefault(),c(g).length<11?y(g):(l("",g.value),window.upload.post(d,null,new FormData(k)))})}}(),function(){var e=document.querySelectorAll('input[type="tel"]');window.masks=[];for(var t=function(e){var t,n=e.parentNode,a=n.classList[0].concat("--active"),i=n.classList[0].concat("--valid"),c=n.classList[0].concat("--invalid"),o=(t=e,new window.IMask(t,{mask:"+{7} (000) 000-00-00",lazy:!0}));return o.on("accept",function(){switch(e.parentNode.classList.add(a),e.parentNode.classList.contains(c)&&e.parentNode.classList.remove(c),!0){case 0===o.unmaskedValue.length:e.parentNode.classList.remove(a);break;case 11===o.unmaskedValue.length:e.parentNode.classList.add(i);break;case o.unmaskedValue.length<11&&e.parentNode.classList.contains(i):case o.unmaskedValue.length<11:e.parentNode.classList.remove(i)}}),o},n=0;n<e.length;n++)e[n]&&masks.push(t(e[n]))}(),function(){var e,t,n,a=document.querySelectorAll(".programs__names li"),i=document.querySelectorAll(".programs__descriptions li"),c=function(e,t,n){for(var a=0;a<e.length;a++)t.call(n,e[a],a)},o=function(e){e&&c(e,function(e){e.classList.contains("visually-hidden")||e.classList.add("visually-hidden")})},s=function(e){e&&e.classList.contains("visually-hidden")&&e.classList.remove("visually-hidden")},r=function(e,t){e.classList.contains(t)||e.classList.add(t)};e=1,a&&i&&(o(i),n=e,(t=a)&&c(t,function(e){r(e,"programs__name"),r(t[n],"programs__name--checked")}),s(i[e]),c(a,function(e){e.addEventListener("click",function(){var e;(e=a)&&c(e,function(e){var t;(t=e).classList.contains("programs__name--checked")&&t.classList.remove("programs__name--checked")}),r(this,"programs__name--checked"),o(i),s(i[function(e){for(var t=0;null!=(e=e.previousSibling);)e.nodeType!=Node.TEXT_NODE&&t++;return t}(this)])})}))}(),function(){var e,t={Container:{CLASS:"activities__slider",SELECTOR:".activities__slider"},Wrapper:{CLASS:"activities__slider-list",SELECTOR:".activities__slider-list"},Slide:{CLASS:"activities__slider-item",SELECTOR:".activities__slider-item"},Pagination:{CLASS:"activities__slider-pagination",SELECTOR:".activities__slider-pagination"},BULLET_ELEMENT:"div",BULLET_CLASS:"activities__slider-bullet",BULLET_ACTIVE_CLASS:"activities__slider-bullet--active"},n={CONTAINER_INITIALIZED:"swiper-container-initialized",NO_SWIPING:"swiper-no-swiping"},a=window.matchMedia("(max-width: 767px)"),i=document.querySelector(t.Container.SELECTOR),c=document.querySelector(t.Wrapper.SELECTOR),o=function(){a.matches&&!i.classList.contains(n.CONTAINER_INITIALIZED)?(c.style.flexWrap="nowrap",(e=new Swiper(t.Container.SELECTOR,{init:!1,spaceBetween:0,wrapperClass:t.Wrapper.CLASS,slideClass:t.Slide.CLASS,pagination:{el:t.Pagination.SELECTOR,bulletElement:t.BULLET_ELEMENT,bulletClass:t.BULLET_CLASS,bulletActiveClass:t.BULLET_ACTIVE_CLASS,type:"bullets",clickable:!1}})).init()):i.classList.contains(n.CONTAINER_INITIALIZED)&&!a.matches&&e.destroy()};o(),window.addEventListener("resize",function(){o()})}(),function(){var e="POST";window.upload={post:function(t,n,a){var i=function(e,t){var n=new XMLHttpRequest;return n.responseType="json",n.addEventListener("load",function(){200===n.status?e(n.response):t()}),n}(t,n);i.open(e,"https://run.mocky.io/v3/64a5108f-2ae6-419d-ac3a-fa1129d1fab3"),i.send(a)}}}();