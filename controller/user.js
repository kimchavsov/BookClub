const User = require('../models/user')


module.exports.renderLogin = (req, res) => {
  res.render('users/login')
}

module.exports.handleLogin = (req, res) => {
  res.redirect('/')
}

module.exports.renderRegister = (req, res) => {
  res.render('users/register')
}

module.exports.handleRegister = async (req, res) => {
  const {email, username, password} = req.body;
  const user = new User({email, username})
  // TODO: do a password hashing before store to db
  // with the help of passport js this library will help us hash the password to db
  await user.setPassword(password)
  await user.save();
  res.redirect('/login')
}