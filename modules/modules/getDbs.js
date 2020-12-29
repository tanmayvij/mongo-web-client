const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const getUri = require('../utils/getUri');
const decrypt = require('../utils/decrypt');

module.exports = (req, res) => {
    if(!req.headers.token)
    {
        res.status(401).json({"error":"no token provided"});
        return;
    }
    let token = decrypt(req.headers.token);
    let payload = {};
    jwt.verify(token, process.env.JWTKEY, function(err, decoded) {
        if(err) {
            res.status(401).json({"error": "bad token"});
        }
        else {
            payload = decoded;
            payload.password = decrypt(payload.password);
            let uri = getUri(payload);
            let admin = mongoose.mongo.Admin;
            let connection = mongoose.createConnection(uri, {useNewUrlParser:true});
            connection.on('open', function() {
                new admin(connection.db).listDatabases(function(err, result) {
                    if(err)
                        res.status(500).json(err);
                    else {
                        res.status(200).json(result.databases);
                        connection.close();
                    }
                });
            });
        }
    });
};