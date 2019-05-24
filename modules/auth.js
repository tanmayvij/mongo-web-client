var mongoose = require('mongoose');

module.exports.connect = function(req, res) {
    result = {
        'token': 'token',
        'host': '127.0.0.1',
        'port': 27017,
        'username': 'root',
        'password': 'admin123',
        'authdb': 'admin'
    }
    res.status(200).json(result)
};