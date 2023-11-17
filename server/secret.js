const express = require('express');
const path = require('path');
const cors = require('cors');
// todo оставил только чтобы локально дебажить сервер. Для контейнеров это не нужно. Видел хорошее решение в оф доке докера
// https://github.com/docker/awesome-compose/blob/master/react-express-mongodb/backend/db/index.js
require('dotenv').config();

const handlers = require('./lib/handlers');
require('./db');

const app = express();

app.use('/api', cors());
app.use(express.json());
app.get('/api/content/', handlers.getAllContent);
app.get('/api/content/:uuid', handlers.getContent);
app.post('/api/content/', handlers.saveContent);
app.delete('/api/content/:uuid', handlers.deleteContent);
app.use(express.static(path.resolve(__dirname, 'client')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Express started on http://localhost:${port}; press Ctrl-C to terminate.`);
  });
} else {
  module.exports = app;
}
