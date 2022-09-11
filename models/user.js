const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  username: String,
  password: String,
})

modules.exports = mongoose.model("User", UserSchema)