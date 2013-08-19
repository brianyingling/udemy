// network communications module
var net = require('net');

// counts the # of clients
var client_ctr = 0;

// create a server obj
var server = net.createServer(function(socket) {
  client_ctr++;
  console.log('Client ' + client_ctr + ' connected');
  // send a message to client
  socket.write("Connected to server.\r\n");

  // pipe addtl traffic to the client using pipe();
  // cause server to echo any msg sent by client back
  // oto it
  socket.pipe(socket);

});

// listen to a specifiec port for incoming traffic
server.listen(8080, '127.0.0.1');