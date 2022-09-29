const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportMongoose = require('passport-local-mongoose')


const UserSchema = new Schema ({
  username: String,
  password: String,
  books: {
    type: Object.type.ObjectId,
    ref: 'Book'
  }
});

UserSchema.plugin(passportMongoose);

modules.exports = mongoose.model("User", UserSchema);