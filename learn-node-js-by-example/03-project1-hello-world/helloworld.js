
var rl = require('readline');
var interface = rl.createInterface(process.stdin,process.stdout,null);

interface.question("What's your name?", function(answer) {
  console.log('Hello ' + answer + "!");

  // close interface, destroy process to prevent never-ending loop
  interface.close();
  process.stdin.destroy();
});
