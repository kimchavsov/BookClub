const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportMongoose = require('passport-local-mongoose')


const UserSchema = new Schema ({
  username: String, 
  email: String,
  password: String,
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
});

UserSchema.plugin(passportMongoose, {usernameField: 'email'});

module.exports = mongoose.model("User", UserSchema);