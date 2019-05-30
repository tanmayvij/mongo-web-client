var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var jwtkey = 'vhxbvkjlcjvbcvbg';
var cryptokey = 'vxcvxzszadcxzxcs';

module.exports.connect = function(req, res) {
    var token = '';
    var uri = getUri(req.body);
    if(testConn(uri))
    {
        var payload = {
            'host': req.body.host,
            'port': req.body.port,
            'username': req.body.username,
            'authdb': req.body.authdb,
            'password': encrypt(req.body.password)
        };
        token = jwt.sign(payload, jwtkey, {expiresIn: 3600*24});
        token = encrypt(token);
        result = {
            'token': token,
            'host': req.body.host,
            'port': req.body.port,
            'username': req.body.username,
            'authdb': req.body.authdb,
            'error': false,
            'errorMsg': ''
        }
        res.status(200).json(result)
    }
    else {
        result = {
            'error': true,
            'errorMsg': 'Error: Could not connect to the given host.'
        }
        res.status(400).json(result)
    }
};

function testConn(uri) {
    mongoose.connect(uri, { useNewUrlParser: true });
    mongoose.connection.on('error', function(err) {
        console.log(err);
        return false;
    });
    mongoose.connection.on('connected', function() {
        mongoose.connection.close();
    });
    return true;
}

function getUri(params)
{
    var uri = 'mongodb';
    var db = params.db ? params.db : 'mongocat';
    if(params.srv)
    {
        uri+='+srv';
    }
    uri+=`://${params.username}:${params.password}@${params.host}:${params.port}/${db}?authSource=${params.authdb}`;
    return uri;
}

function encrypt(text) {
    var cipher = crypto.createCipher('aes-256-cbc', cryptokey);
    var encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

function decrypt(cipher) {
    var decipher = crypto.createDecipher('aes-256-cbc', cryptokey);
    var decrypted = decipher.update(cipher, 'hex', 'utf8');
    decrypted += decipher.final("utf8");
    return decrypted;
}

module.exports.getDBs = function(req, res) {
    if(!req.headers.token)
    {
        res.status(401).json({"error":"no token provided"});
        return;
    }
    var token = decrypt(req.headers.token);
    var payload = {};
    jwt.verify(token, jwtkey, function(err, decoded) {
        if(err) {
            res.status(401).json({"error": "bad token"});
        }
        else {
            payload = decoded;
            payload.password = decrypt(payload.password);
            var uri = getUri(payload);
            var admin = mongoose.mongo.Admin;
            var connection = mongoose.createConnection(uri, {useNewUrlParser:true});
            connection.on('open', function() {
                new admin(connection.db).listDatabases(function(err, result) {
                    if(err)
                        res.status(500).json(err);
                    else {
                        res.status(200).json(result.databases);
                    }
                });
            });
        }
    });
};