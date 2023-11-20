const crypto = require('crypto');
const path = require('path');

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.CRYPTO_KEY, 'hex');
const iv = Buffer.from(process.env.CRYPTO_IV, 'hex');

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

exports.getDecryptedNew = (encrypted) => {
  const decryptedArr = [];
  encrypted.forEach((elem) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(elem.secret, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    decryptedArr.push(decrypted);
  });
  return decryptedArr;
};
