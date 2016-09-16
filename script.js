var dollarSign = {
  ajax: function(options) {
    options = options || {};

    // defaults
    options.complete = options.complete || function(xhr) {
      console.log(xhr.responseText);
    };

    options.success = options.success || function() {
      console.log('this is successful');
    };

    options.error = options.error || function() {
      console.log('this is an error');
    };

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

    if (options.dataType) {
      xhr.responseType = dataType;
    }

    options.data = options.data || '';

    xhr.send(options.data);

    var promise = new Promise(resolve, reject) {
      
    };

    return promise;

  },

  get: function(url, data, callback, dataType) {
    dollarSign.ajax({url: url,
                    data: data,
                    method: 'GET',
                    success: callback,
                    dataType: dataType });
  },

  post: function(url, data, callback, dataType) {
    dollarSign.ajax({url: url,
                    data: data,
                    method: 'POST',
                    success: callback,
                    dataType: dataType });
  }
};


// regular ajax
dollarSign.ajax({
  method: 'POST',
  url: "http://reqres.in/api/posts",
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
  data: 'title=Foo&body=Bar&userId=1',
  async: true
});

// get helper
// dollarSign.get(
//   "http://reqres.in/api/users",
//   '',
//   function() {
//     console.log('from the get request');
//   });

// get helper
// dollarSign.post(
//   "http://reqres.in/api/posts",
//   'title=Foo&body=Bar&userId=1',
//   function() {
//     console.log('from the post request');
//   });
