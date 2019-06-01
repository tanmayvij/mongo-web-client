const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const routes = require('./routes');

app.set('port', process.env.port ? process.env.port :8080);

app.use(function(req, res, next) {
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
});

app.use(function(req, res, next) {
	console.log(req.method, req.url);
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token,Authorization,token');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use('/api', routes);
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

var server = app.listen(app.get('port'), function() {
	console.log(server.address());
});
