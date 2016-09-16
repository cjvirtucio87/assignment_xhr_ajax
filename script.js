var dollarSign = {
  ajax: function(options) {
    options = options || {};

    var xhr = new XMLHttpRequest();

    xhr.onload = function ( e ) {
      if ( xhr.readyState === 4 ) {
        if ( xhr.status === 200 || xhr.status === 201 ) {
          if (options.success) {
            options.success(xhr);
          }
        } else {
          console.log(xhr.status);
          if (options.error) {
            options.error(xhr);
          }
        }
        if (options.complete) {
          options.complete(xhr);
        }
      }
    };

    options.async = options.async || true;

    xhr.open(options.method, options.url, options.async);

    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    for (var key in options.headers) {
      xhr.setRequestHeader(key, options.headers[key]);
    }

    options.data = options.data || '';

    xhr.send(options.data);

  },
};

dollarSign.ajax({
  method: 'POST',
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
