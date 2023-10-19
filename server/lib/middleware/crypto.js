const crypto = require('crypto');
const credentials = require('../../credentials')

const algorithm = 'aes-256-cbc';
const key = Buffer.from(credentials.crypto.key, 'hex');
const iv = Buffer.from(credentials.crypto.iv, 'hex');


exports.getEncrypted = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

exports.getDecrypted = (encrypted) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};