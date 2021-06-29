const request = require('request');
const fs = require('fs');
const stats = require('fs').statSync;
const writeFile = require('fs').writeFile;
const readline = require('readline');
const args = process.argv.slice(2);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(args[0], (error, response, body) => {
  if (error) throw new error;
  if (body) {
    if (stats(args[1]).isFile()) {    
      if (response.statusCode === 200) {
        if (fs.existsSync(args[1])) {
          rl.question("Do you want to overwrite it? ", (answer) => {
            if (answer === 'Y' || answer === 'y') {
              writeFile(args[1], body, (err) => {
                if (err) throw err;
                console.log(`Downloaded and saved ${stats(args[1]).size} bytes to ${args[1]}`);
                rl.close();
              });
            }
          });
        } else {
          writeFile(args[1], body, (err) => {
            if (err) throw err;
            console.log(`Downloaded and saved ${stats(args[1]).size} bytes to ${args[1]}`);
            rl.close();
          });
        }
      } else {
        return console.log("Invalid URL");
      }
    }
  }
});