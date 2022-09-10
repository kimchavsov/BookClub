const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: String,
  content: String,
  book: {
    type: Schema.Types.ObjectId,
    ref:  'book'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

module.exports = mongoose.model("Note", NoteSchema)