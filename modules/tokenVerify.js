const jwt = require('jsonwebtoken');

const { decrypt } = require('./crypt');

const tokenVerify = async (req, res, next) => {
  try {
    if (!req.headers.token)
      return res.status(401).json({ "error": "No Token Provided" });

    let token = decrypt(req.headers.token, req.app.get('cryptoSecret'));
    let payload = jwt.verify(token, req.app.get('tokenSecret'));
    payload.password = decrypt(payload.password, req.app.get('cryptoSecret'));

    req.formPayload = (db) => ({ ...payload, db });

    next();
  } catch (err) {
    return res.status(400).json({ "error": "Server Error." });
  }
}

module.exports = tokenVerify;
