var express = require('express');
var router = express.Router();
var client = require('../modules/client');

router.route('/auth/connect')
.post(client.connect, client.returnDb);

router.route('/databases')
.get(client.getDBs);

router.route('/databases/:dbName')
.get(client.listCollections);

router.route('/databases/:dbName/:collectionName')
.get(client.viewDocuments)
.post(client.addDocument)
.delete(client.dropCollection);

router.route('/databases/:dbName/:collectionName/:id')
.put(client.updateDocument)
.delete(client.deleteDocument);

module.exports = router;