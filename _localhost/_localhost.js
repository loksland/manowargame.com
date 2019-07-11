var connect = require('connect');
var serveStatic = require('serve-static');
var baseDir = './../_dist';

var app = connect();

var PORT = 5000;

app.use(serveStatic(baseDir));
app.listen(PORT);

console.log('\nServing');
console.log(  '-------');
console.log('http://localhost:5000/');

var fs = require('fs');
var path = require('path');



function getCommandLine() {
   switch (process.platform) {
      case 'darwin' : return 'open';
      case 'win32' : return 'start';
      case 'win64' : return 'start';
      default : return 'xdg-open';
   }
}

var sys = require('sys');
var exec = require('child_process').exec;

exec(getCommandLine() + ' http://localhost:5000/');


// Local IP
// --------

// For mobile testing on local network

var os = require('os');
var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

console.log('\nLocal network');
console.log(  '-------------');
for (var i = 0; i < addresses.length; i++){
	console.log('http://' + String(addresses[i]) + ':5000/');
}
