var net = require('net');
var rl  = require('readline');

var server = net.createServer(function(socket) {
  socket.write('Connected to Telnet server.\r\n');
  socket.write('Choose the following: \r\n');
  socket.write('add, sub, multiply, or div\r\n');
  socket.write("or 'disconnect' to end\r\n");

  socket.on('end', function() {
    process.stdin.destroy();
  });

  socket.on('data', function(data) {
    var input = data.toString().trim();
    switch(input) {
      case "disconnect":
        socket.write('goodbye\n');
        socket.end();
        break;
      case "server address":
        console.log('server address called...');
        info = socket.address();
        socket.write( "address: " + info.address + " port: " + info.port);
        break;

      default:
        var math = input.split(' ');
        var op = math[0].trim();
        var ans;
        switch(op) {
          case "multiply":
            ans = (math[1] * math[2]).toString();
            break;
          case "add":
            ans = (parseInt(math[1]) + parseInt(math[2]) ).toString();
            break;
          case "sub":
            ans = (math[1] - math[2]).toString();
            break;
          case "div":
            ans = (math[1] / math[2]).toString();
            break;
        }
        socket.write(ans + '\r\n');
        break;
    }

  });


  // socket.pipe(socket);

});


server.listen(8080,'127.0.0.1');