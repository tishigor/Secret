const mongoose = require('mongoose');

if (!process.env.MONGODB_URI) {
  console.error('Отсутствует строка подключения к MongoDB!');
  process.exit(1);
}
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', (err) => {
  console.error(`Ошибка MongoDB:${err.message}`);
  process.exit(1);
});
db.once('open', () => console.log('Установлено соединение с MongoDB'));

// eslint-disable-next-line import/extensions
const Content = require('./models/content.js');

// Заполнение первоначальными данными.
const saveFixture = async () => {
  try {
    const secrets = await Content.find().exec();
    if (secrets.length) return;

    await Promise.all([
      new Content({
        uuid: 'ae433f52-d862-4ba5-ae34-3d4b5a170df1',
        secret: 'f846d342bf089d62fd035fff9cd844f44ee6b1534f7f800dc89bb7ed11a0d6ad',
      }).save(),
      new Content({
        uuid: 'dcf4f493-e000-4bc5-aae4-f9ac17d77764',
        secret: '10c6af4980ed96198706a3c1c9f8851e',
      }).save(),
      new Content({
        uuid: '4583de6a-e395-462d-9aca-bcfef15c8c4c',
        secret: '9974cd95a163a3a27cb02e5cb5f03c1f',
      }).save(),
    ]);
  } catch (err) {
    console.error(err);
  }
};
// saveFixture();

module.exports = {
  getContent: async (options = {}) => {
    const result = await Content.findOne(options).exec();
    console.log('Operation "getContent" complete:', result);
    return result;
  },
  getAllContent: async () => {
    const result = await Content.find().exec();
    console.log('Operation "getAllContent" complete:', result);
    return result;
  },
  saveContent: async (options = {}) => {
    const result = await Content.create(options);
    console.log('Operation "saveContent" complete:', result);
    return result;
  },
  deleteContent: async (options = {}) => {
    const result = await Content.deleteOne(options).exec();
    console.log('Operation "deleteContent" complete:', result);
    return result;
  },
};
