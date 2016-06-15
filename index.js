var fs = require('fs');
var http = require('http');
var https = require('https');
var jwt = require('express-jwt');
var cors = require('cors');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');

console.log(process.env.ENVIRONMENT);

if(process.env.ENVIRONMENT === 'production') {
	var keyfile = process.env.KEY_FILE;
	var crtfile = process.env.CRT_FILE;

	var privateKey = fs.readFileSync(keyfile, 'utf8');
	var certificate = fs.readFileSync(crtfile, 'utf8');

	var credentials = {key: privateKey, cert: certificate};

};

var express = require('express');
var app = express();

var port = 80;
var sslport = 443;

app.set('view engine', 'ejs');

app.use('/assets', express.static(__dirname + '/public'));
app.use(cors());
app.use(errorhandler());

app.get('/', function(req, res) {
	res.render('index');
});

var httpServer = http.createServer(app);
httpServer.listen(port);

if(process.env.ENVIRONMENT === 'production') {
	var httpsServer = https.createServer(credentials, app);
	httpsServer.listen(sslport);
};
