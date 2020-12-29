const mongoose = require('mongoose');

const getUri = require('./getURI');

function IsJsonString(str) {
  try {
    var json = JSON.parse(str);
    return (typeof json === 'object');
  } catch (e) {
    return false;
  }
}

module.exports.getDBs = async function (req, res) {
  try {
    let payload = req.formPayload();
    let uri = getUri(payload);
    let connection = await mongoose.createConnection(uri, { useNewUrlParser: true });
    let admin = mongoose.mongo.Admin;

    let result = await new admin(connection.db).listDatabases();

    res.status(200).json(result.databases);

    return await connection.close();
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.listCollections = async function (req, res) {
  try {
    let payload = req.formPayload(req.params.dbName);
    let uri = getUri(payload);
    let connection = await mongoose.createConnection(uri, { useNewUrlParser: true });
    let collections = await connection.db.listCollections().toArray();

    res.status(200).json(collections);

    return await connection.close();
  } catch (err) {
    return res.status(500).json({ "error": err });
  }
};

module.exports.dropCollection = async function (req, res) {
  try {
    let payload = req.formPayload(req.params.dbName);
    let uri = getUri(payload);
    let connection = await mongoose.createConnection(uri, { useNewUrlParser: true });
    let collection = connection.db.collection(req.params.collectionName);

    await collection.drop();

    res.status(204).json({ "ok": true });

    return await connection.close();
  } catch (err) {
    return res.status(500).json({ "error": err });
  }
};

module.exports.viewDocuments = async function (req, res) {
  try {
    let payload = req.formPayload(req.params.dbName);
    let uri = getUri(payload);
    let connection = await mongoose.createConnection(uri, { useNewUrlParser: true });
    let collection = connection.db.collection(req.params.collectionName);

    let result = await collection.find({}).toArray();

    res.status(200).json(result);

    return await connection.close();
  } catch (err) {
    res.status(500).json({ "error": err });
  }
};

module.exports.addDocument = async function (req, res) {
  try {
    if (!IsJsonString(req.body.document))
      return res.status(400).json({ "error": "not a valid JSON object" });

    let payload = req.formPayload(req.params.dbName);
    let uri = getUri(payload);
    let connection = await mongoose.createConnection(uri, { useNewUrlParser: true });
    let collection = connection.db.collection(req.params.collectionName);

    let result = await collection.insertOne(document);

    res.status(201).json(result);

    return await connection.close();
  } catch (err) {
    return res.status(500).json({ "error": error });
  }
};

module.exports.updateDocument = async function (req, res) {
  try {
    if (!IsJsonString(req.body.document))
      return res.status(400).json({ "error": "not a valid JSON object" });

    let payload = req.formPayload(req.params.dbName);
    let uri = getUri(payload);
    let connection = await mongoose.createConnection(uri, { useNewUrlParser: true });
    let collection = connection.db.collection(req.params.collectionName);

    await collection.updateOne({ _id: ObjectId(req.params.id) }, document);

    res.status(204).json();

    return await connection.close();
  } catch (err) {
    return res.status(500).json({ "error": err });
  }
};

module.exports.deleteDocument = async function (req, res) {
  try {
    let payload = req.formPayload(req.params.dbName);
    let uri = getUri(payload);
    let connection = await mongoose.createConnection(uri, { useNewUrlParser: true });
    let collection = connection.db.collection(req.params.collectionName);

    await collection.findOneAndDelete({ _id: ObjectId(req.params.id) });

    res.status(204).json();

    return await connection.close();
  } catch (err) {
    return res.status(500).json({ "error": err });
  }
};

module.exports.createCollection = async function (req, res) {
  try {
    if (!req.body.collection)
      return res.status(400).json({ "error": "collection name is required" });

    let payload = req.formPayload(req.params.dbName);
    let uri = getUri(payload);
    let connection = await mongoose.createConnection(uri, { useNewUrlParser: true });

    await connection.db.createCollection(req.body.collection);

    res.status(201).json({ "success": true });

    return await connection.close();
  } catch (e) {
    return res.status(500).json({ "error": error });
  }
};