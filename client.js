const net = require("net");
const fs = require('fs');
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// Will need to use Promise to make the messages come out more in synch...
const downloadFile = path => {
  const client = net.connect({host: "localhost", port: 3000}, () => {
    console.log('Connected!');
  });
  client.setEncoding('utf8');
  client.write('index.html');
  client.on('end', () => {
    console.log('Disconnected from server');
  });
    
  client.on('data', (data) => {
    fs.writeFile(path, data, 'utf8', (err) => {
      if (err) throw err;
      console.log(`Downloaded and saved ${data.length} bytes to ${path}`);
    });
    client.end();
  });
};


rl.question('Please input the file path in which you would like to save your requested file: ', (filePath) => {

  if (fs.existsSync(`${filePath}`)) {
    rl.question('The file name already exists. Please input "Y"(followed by the enter key) if you would like to overwrite this file: ', (answer) => {
      if (answer === 'Y') {
        console.log('Connecting to the server...');
        downloadFile(`${filePath}`);
      } else {
        console.log('Good-Bye');
      }
      rl.close();
    });
  } else {
    console.log('Checking...File Name not in use.');
    console.log('Connecting to the server...');
    downloadFile(`${filePath}`);
  }
});


// const net = require("net");
// const fs = require('fs');
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// const client = net.connect({host: "localhost", port: 3000}, () => {
//   console.log('Connected to server');
// });

// client.setEncoding('utf8'); // interpret data as text
// client.write('index.html');

// client.on('data', (data) => {
//   // console.log('Server says: ', data);
//   fs.access(`./itworked.html`, fs.F_OK, (err) => {
//     if (!err) {
//       rl.question("The file name already exists. Please input 'Y' (followed by the enter key) if you would like to overwrite this file: ", (answer) => {
//         if (answer === 'Y') {
//           fs.writeFile(`./itworked.html`, data, 'utf8', (err) => {
//             if (err) throw err;

//             console.log(`Downloaded and saved ${data.length} bytes to itworked.html`);
//           });
//         }
//         rl.close();
//       });
//     } else {
//       fs.writeFile(`./itworked.html`, data, 'utf8', (err) => {
//         if (err) throw err;
//         // console.log(`Downloaded and saved ${data.length} bytes to itworked.html`);
//       });
//     }
//   });
//   // client.end(); //
// });


// client.on('end', () => {
//   console.log('Disconnected from server');
// });
