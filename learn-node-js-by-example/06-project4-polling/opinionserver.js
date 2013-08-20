// Express App

var express = require('express');

// create server obj
var app = express();

app.configure(function() {
  app.set('view options', {layout: false});
  app.use(express.static(__dirname + '/public'));
});

// register a simple html view engine instead of using
// a fancy view rendering system, e.g. Jade, ejb, etc.
// app.register('.html', {
//   compile: function(str, options) {
//     return function(locals) {
//       return str;
//     };
//   }
// });

// app.engine('jade', require('jade').__express);

app.get('/test', function(req, res) {
  res.send('Hello World!');
});

app.listen(8080);