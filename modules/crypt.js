const crypto = require('crypto');

module.exports.encrypt = (text, key) => {
  var cipher = crypto.createCipher('aes-256-cbc', key);
  var encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

module.exports.decrypt = (cipher, key) => {
  var decipher = crypto.createDecipher('aes-256-cbc', key);
  var decrypted = decipher.update(cipher, 'hex', 'utf8');
  decrypted += decipher.final("utf8");
  return decrypted;
}