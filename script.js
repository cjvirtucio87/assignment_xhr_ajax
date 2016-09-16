var dollarSign = {
  ajax: function(options) {

    var xhr = new XMLHttpRequest();

    xhr.onload = function ( e ) {
      if ( xhr.readyState === 4 ) {
        if ( xhr.status === 200 ) {
          options.success();
        } else {
          options.error();
        }
        options.complete();
      }
    };

    xhr.open(options.method, options.url, options.async);

    for (var key in options.headers) {
      xhr.setRequestHeader(key, options.headers[key]);
    };

    xhr.send(options.data);

  },
};