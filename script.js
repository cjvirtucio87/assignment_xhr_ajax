var dollarSign = {
  ajax: function(options) {
    options = options || {};

    var xhr = new XMLHttpRequest();

    xhr.onload = function ( e ) {
      if ( xhr.readyState === 4 ) {
        if ( xhr.status === 200 ) {
          options.success();
        } else {
          options.error();
        }
        options.complete(xhr);
      }
    };

    xhr.open(options.method, options.url, options.async);

    for (var key in options.headers) {
      xhr.setRequestHeader(key, options.headers[key]);
    }

    xhr.send(options.data);

  },
};


dollarSign.ajax({
  method: 'GET',
  url: "http://reqres.in/api/users",
  complete: function(xhr) {
    console.log(xhr.responseText);
  },
  success: function() {
    console.log('this is successful');
  },
  error: function() {
    console.log('this is an error');
  },
  headers: {
  },
  data: '',
  async: true
});
