const express = require('express');
const router = express.Router();
const client = require('./client');

router.route('/auth/connect')
.post(client.connect, client.returnDb);

router.route('/databases')
.get(client.getDBs);

router.route('/databases/:dbName')
.get(client.listCollections)
.post(client.createCollection)
.put(client.renameDb)
.delete(client.dropDb);

router.route('/databases/:dbName/:collectionName')
.get(client.viewDocuments)
.post(client.addDocument)
.put(client.renameCollection)
.delete(client.dropCollection);

router.route('/databases/:dbName/:collectionName/:id')
.put(client.updateDocument)
.delete(client.deleteDocument);

module.exports = router;