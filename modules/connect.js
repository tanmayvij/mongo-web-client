const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { encrypt } = require('./crypt');
const getUri = require('./getURI');

async function connectHandler(req, res, next) {
  try {
    let token = '';
    let uri = getUri(req.body);

    await mongoose.connect(uri, { useNewUrlParser: true, connectTimeoutMS: 2500 });

    let { host, port, username, authdb, password, srv } = req.body;

    let payload = {
      host,
      port,
      username,
      authdb,
      password: encrypt(password, req.app.get('cryptoSecret')),
      srv
    };

    token = jwt.sign(payload, req.app.get('tokenSecret'), { expiresIn: 3600 * 24 });
    token = encrypt(token, req.app.get('cryptoSecret'));

    res.json({ token, host, port, username, authdb, });

    await mongoose.connection.close();
  } catch (err) {
    if (!req.headersSent) {
      return res.status(400).json({
        "error": "Could not connect to the specified host",
      })
    }
  }
};

module.exports = connectHandler;
