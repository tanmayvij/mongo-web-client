const crypto = require('crypto');

module.exports = (cipher) => {
    let decipher = crypto.createDecipher('aes-256-cbc', process.env.CRYPTOKEY);
    let decrypted = decipher.update(cipher, 'hex', 'utf8');
    decrypted += decipher.final("utf8");
    return decrypted;
}