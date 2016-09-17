var dollarSign = {
  ajax: function(options) {
    var promise = new Promise ( function (resolve, reject) {
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
              resolve(xhr.responseText);
            }
          } else {
            console.log(xhr.status);
            if (options.error) {
              options.error(xhr);
              reject();
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
    });

    return promise;
  },

  // get: function(url, data, callback, dataType) {
  //   dollarSign.ajax({url: url,
  //                   data: data,
  //                   method: 'GET',
  //                   success: callback,
  //                   dataType: dataType });
  // },
  //
  // post: function(url, data, callback, dataType) {
  //   dollarSign.ajax({url: url,
  //                   data: data,
  //                   method: 'POST',
  //                   success: callback,
  //                   dataType: dataType });
  // }
};


// regular ajax
// var ajaxPromise = dollarSign.ajax({
//   method: 'GET',
//   url: "http://reqres.in/api/users",
//   complete: function(xhr) {
//     console.log(xhr.responseText);
//   },
//   success: function() {
//     console.log('this is successful (this happens in the promise)');
//   },
//   error: function() {
//     console.log('this is an error');
//   },
//   headers: {
//   },
//   data: '',
//   async: true
// });

// var ourResolve = function(data) {
//   console.log('this has been resolved (this is what the user passed in for after the promise is done)!');
//   console.log(data);
// };

// var ourReject = function(data) {
//   console.log('this was rejected');
// };


// ajaxPromise.then(ourResolve, ourReject);

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

//button ajax
var button = document.getElementById('ajax-button');
button.addEventListener('click', function(){

 var ajaxPromise1 = dollarSign.ajax({
  method: 'GET',
  url: "http://reqres.in/api/users",
  complete: function(xhr) {
    console.log(xhr.responseText);
  },
  success: function() {
    console.log('this is successful (this happens in the promise)');
  },
  error: function() {
    console.log('this is an error');
  },
  headers: {
  },
  data: '',
  async: true
  });

  var ajaxPromise2 = dollarSign.ajax({
      method: 'GET',
      url: "http://reqres.in/api/users",
      complete: function(xhr) {
        console.log(xhr.responseText);
      },
      success: function() {
        console.log('this is successful (this happens in the second promise)');
      },
      error: function() {
        console.log('this is an error');
      },
      headers: {
      },
      data: '',
      async: true
  });

  var ourResolve = function() {
    var node = document.createTextNode("Success.");
    document.getElementById('ajax-div').appendChild(node);
  };

  var ourReject = function(data) {
    console.log('this was rejected');
  };

  var resolve2 = function(data) {
    alert("ALERT from Promise2");
  };

  var promiseLater = Promise.resolve(3).then(function(data) {
    setTimeout(function () {
      console.log("this is from promiseLater" + " " + data + "took 2 seconds");
    },2000);
  });

  ajaxPromise1.then(ourResolve, ourReject);
  ajaxPromise2.then(resolve2, ourReject);

  Promise.all([ajaxPromise1, ajaxPromise2, promiseLater]).then(function() {
    console.log("THIS works");
  });
});
