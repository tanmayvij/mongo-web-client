const crypto = require('crypto');

module.exports = (text) => {
    let cipher = crypto.createCipher('aes-256-cbc', process.env.CRYPTOKEY);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}