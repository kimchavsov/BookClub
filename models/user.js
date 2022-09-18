const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  username: String,
  password: String,
  books: {
    type: Object.type.ObjectId,
    ref: 'Book'
  }
})

modules.exports = mongoose.model("User", UserSchema)