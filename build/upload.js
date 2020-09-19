'use strict';
(function () {
  var ADRESS = 'https://run.mocky.io/v3/64a5108f-2ae6-419d-ac3a-fa1129d1fab3';
  var SUCCESS_STATUS = 200;

  var HttpRequestType = {
    Post: 'POST',
    Get: 'GET',
  };

  var createRequestInstance = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    return xhr;
  };

  var post = function (onLoad, onError, data) {
    var xhr = createRequestInstance(onLoad, onError);

    xhr.open(HttpRequestType.Post, ADRESS);
    xhr.send(data);
  };


  window.upload = {
    post: post,
  };
})();
