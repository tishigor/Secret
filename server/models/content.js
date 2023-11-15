const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    uuid: String,
    secret: String,
  },
  { timestamps: true },
);
// contentSchema.set('toObject', { getters: true, virtuals: true })
const Content = mongoose.model('Content', contentSchema);
module.exports = Content;
