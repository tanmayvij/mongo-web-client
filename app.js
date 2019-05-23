const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const routes = require('./routes');

app.set('port', process.env.port ? process.env.port : 80);

app.use(function(req, res, next) {
	console.log(req.method, req.url);
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token,Authorization');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', routes);

var server = app.listen(app.get('port'), function() {
	console.log(server.address());
});