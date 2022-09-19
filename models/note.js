const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: String,
  content: String,
  book: {
    type: Object.type.ObjectId,
    ref: 'Book'
  }
})

module.exports = mongoose.model("Note", NoteSchema)