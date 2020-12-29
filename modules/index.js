const { Router: er } = require('express');
const router = er();

const client = require('./client');
const tokenVerify = require('./tokenVerify');

// DB Connect
const connect = require('./connect');
router.route('/auth/connect')
  .post(connect);

router.use(tokenVerify);

router.route('/databases')
  .get(client.getDBs);

router.route('/databases/:dbName')
  .get(client.listCollections)
  .post(client.createCollection);

router.route('/databases/:dbName/:collectionName')
  .get(client.viewDocuments)
  .post(client.addDocument)
  .delete(client.dropCollection);

router.route('/databases/:dbName/:collectionName/:id')
  .put(client.updateDocument)
  .delete(client.deleteDocument);

module.exports = router;