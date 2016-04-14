const http = require('http');

const server = module.exports = exports = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('The current time is:  ' + new Date().toTimeString() + '.');
    return res.end();
  }
  if (req.method === 'GET' && req.url.startsWith('/greet')) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('\'ow ya goin\' ' + req.url.split('/')[2] + '!');
    return res.end();
  }
  if (req.method === 'POST' && req.url === '/greet') {
    req.on('data', (data) => {
      var msg = JSON.parse(data);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(msg.salute);
      return res.end();
    });
    return;
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.write('Not Found');
  return res.end();
});

server.listen(3000, () => process.stdout.write('server up on 3000'));
