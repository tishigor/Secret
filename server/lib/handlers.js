const { v4 } = require('uuid');
const crypto = require('./middleware/crypto');
const db = require('../db');

exports.saveContent = async (req, res) => {
  const originalText = req.body.value;
  const encryptedText = crypto.getEncrypted(originalText);
  const context = { uuid: v4(), secret: encryptedText };
  const result = await db.saveContent(context);
  if (!result) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  context.original = originalText;
  res.status(201).json(context);
};

exports.getAllContent = async (req, res) => {
  const { uuid } = req.params;
  const content = await db.getAllContent({ uuid });
  if (!content) {
    return res.status(404).json({ error: 'Контент не найден' });
  }
  const context = [];
  content.forEach((item) => {
    context.push({
      uuid: item.uuid,
      original: crypto.getDecrypted(item.secret),
      createdAt: item.createdAt,
    });
  });
  res.json(context);
};

exports.getContent = async (req, res) => {
  const { uuid } = req.params;
  const content = await db.getContent({ uuid });
  if (!content) {
    return res.status(404).json({ error: 'Контент не найден' });
  }
  const context = {
    content: {
      uuid: content.uuid,
      original: crypto.getDecrypted(content.secret),
      createdAt: content.createdAt,
    },
  };
  res.json(context);
};

exports.deleteContent = async (req, res) => {
  const { uuid } = req.params;
  const content = await db.deleteContent({ uuid });
  if (!content.deletedCount) {
    return res.status(404).json({ error: 'Контент не найден' });
  }
  res.json({ message: 'Контент был удален' });
};
