const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const encrypt = require('../utils/encrypt');
const getUri = require('../utils/getUri');

module.exports = (req, res, next) => {
    let token = '';
    let uri = getUri(req.body);
    mongoose.connect(uri, { useNewUrlParser: true, connectTimeoutMS: 2500 });
    mongoose.connection.on("connected", function() {
        let payload = {
            'host': req.body.host,
            'port': req.body.port,
            'username': req.body.username,
            'authdb': req.body.authdb,
            'password': encrypt(req.body.password),
            'srv': req.body.srv
        };
        token = jwt.sign(payload, process.env.JWTKEY, {expiresIn: 3600*24});
        token = encrypt(token);
        result = {
            'token': token,
            'host': req.body.host,
            'port': req.body.port,
            'username': req.body.username,
            'authdb': req.body.authdb,
            'error': false,
            'errorMsg': ''
        };
        mongoose.connection.close();
        req.status = 200;
        req.result = result;
        next();
    });
    mongoose.connection.on("error", function(err) {
        result = {
            'error': true,
            'errorMsg': 'Error: Could not connect to the given host.'
        }
        mongoose.connection.close();
        req.status = 400;
        req.result = result;
        next();
    });
};