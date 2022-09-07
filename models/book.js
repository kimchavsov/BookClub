const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: String,
  cover: String,
  author: String,
  status: {
    type: String,
    enum: ['Completed', 'Reading', 'Bucket List'],
    default: 'Bucket List'
  },
  page: Number,
})

module.exports = mongoose.model('Book', BookSchema)