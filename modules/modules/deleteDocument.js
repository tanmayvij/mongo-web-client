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
            payload.db = req.params.dbName;
            let uri = getUri(payload);
            let ObjectId = mongoose.mongo.ObjectID;
            let connection = mongoose.createConnection(uri, {useNewUrlParser:true});
            connection.on('open', function() {
                 try {   
                    let collection = connection.db.collection(req.params.collectionName);
                    collection.findOneAndDelete({_id: ObjectId(req.params.id)}, function(error, result) {
                        if(error) res.status(500).json({"error": error});
                        else res.status(204).json();
                        connection.close();
                    });
                 } catch(e) {
                    res.status(500).json({"error": "some error occurred"});
                    connection.close();
                 }
            });
        }
    });
};