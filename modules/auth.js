var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var jwtkey = 'vhxbvkjlcjvbcvbg';
var cryptokey = 'vxcvxzszadcxzxcs';

module.exports.connect = function(req, res) {
    var token = '';
    var conn = getConn(req.body);
    if(testConn(conn))
    {
        var payload = conn;
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

function testConn(conn) {
    conn.password = decrypt(conn.password);
    return false;
}

function getConn(params)
{
    var uri = 'mongodb';
    if(params.srv)
    {
        uri+='+srv';
    }
    uri+=`://${params.host}:${params.port}/?authSource=${params.authdb}`;
    var conn = {
        'uri': uri,
        'username': params.username,
        'password': encrypt(params.password)
    }
    return conn;
}

function encrypt(text) {
    var cipher = crypto.createCipher('aes-256-cbc', cryptokey);
    var encrypted = Buffer.concat([cipher.update(new Buffer(text, "utf8")), cipher.final()]);
    return encrypted;
}

function decrypt(cipher) {
    var decipher = crypto.createDecipher('aes-256-cbc', cryptokey);
    var decrypted = Buffer.concat([decipher.update(cipher), decipher.final()]);
    return decrypted;
}