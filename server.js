const net = require('net');
const fs = require('fs');

const server = net.createServer((conn) => {
  conn.setEncoding('utf-8');
  console.log('New client connected!');
  // conn.write('Hello There');
  conn.on('end', () => {
    console.log('Disconnected!');
    setTimeout(() => {
      process.exit();
    }, 3000);
  });

  conn.on('data', (req) => {
    console.log(`Client requested: ${req}`);

    fs.readFile(req, (err, data) => {
      if (!err) {
        conn.write(data);
        console.log(`${req} is now sent to the client`);
      } else {
        console.log(err);
        conn.write('Server says: File Not Found');
      }
    });
  });
});

server.on('error', (err) => {
  throw err;
});

server.listen(3000, () => {
  console.log('Server listening on port 3000!');

  setTimeout(() => {
    console.log('Waiting for Client to Connect...');
  }, 20000);

  setTimeout(() => {
    console.log('Good-bye');
    server.close();
  }, 25000);
});




