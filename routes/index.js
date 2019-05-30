var express = require('express');
var router = express.Router();
var client = require('../modules/client');

router.route('/auth/connect')
.post(client.connect);

router.route('/databases')
.get(client.getDBs);

router.route('/databases/:dbName')
.get(client.listCollections);

router.route('/databases/:dbName/:collectionName')
.get(client.viewCollection);

module.exports = router;