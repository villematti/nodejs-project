var fs = require('fs');
var http = require('http');
var https = require('https');
var keyfile = process.env.KEY_FILE;
var crtfile = process.env.CRT_FILE;

var privateKey = fs.readFileSync(keyfile, 'utf8');
var certificate = fs.readFileSync(crtfile, 'utf8');

var credentials = {key: privateKey, cert: certificate};

var express = require('express');
var app = express();

var port = 80;
var sllport = 443;

app.use('/assets', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.send('Moi EMMI!!!');
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(port);
httpsServer.listen(443);
