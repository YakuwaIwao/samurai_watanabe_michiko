let http = require('http');
let server = http.createServer();

server.on('request', function(req, res) {

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('hello world!!!');
  res.end();

});

server.listen(8000, 'localhost');
console.log('server listen...');

// server.listen(8000, '127.0.0.1');

// let aa = 'aa';
// const AAA = 'XX';

// let func = function() {
//   return 'Call function!'
// };

// console.log('hello world!' + aa + '/' + AAA);
// console.log(func());


