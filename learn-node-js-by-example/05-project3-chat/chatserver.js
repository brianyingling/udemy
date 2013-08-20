var http  = require('http'),
    url   = require('url'),
    fs    = require('fs'),
    server;

server = http.createServer(function(req, res) {

  // parse the pathname as a url
  var path = url.parse(req.url).pathname;

  switch(path) {

    case '/':
      fs.readFile(__dirname + '/chatclient.html', function(err, data){
        if(err) return send404(res);
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(data, 'utf8');
        res.end();
      });

      break;

    default:
      send404(res);
      break;
  }

});

send404 = function(res) {
  res.writeHead(404);
  res.write('404');
  res.end();
};

server.listen(8080, '127.0.0.1');
console.log('Server running at 127.0.0.1:8080');

var io = require('socket.io').listen(server);
var users = [];

// on a 'connection' event
io.sockets.on('connection', function(socket) {
  console.log('Connection ' + socket.id + ' accepted');

  // now that we have our connected 'socket' obj, we can
  // define its event handlers
  socket.on('disconnect', function() {
    console.log('Connection '+socket.id+' terminated');
  });

  // when we receive a message, send it to all connected clients
  socket.on('message',function(message) {
    // log message to server
    console.log('Received message: '+message+' from client '+socket.id);

    // get the user's name
    var user_name;
    for(var i=0; i<users.length; i++) {
      if(socket.id === users[i].id)
        user_name = users[i].name;
    }

    // send message to all connected clients
    // custom event - 'chat' is defined by me
    io.sockets.emit('chat', user_name, message);

  });

  // register new user
  socket.on('register', function(user) {
    user.id = socket.id;
    users.push(user);
    console.log(users);
  });

});

