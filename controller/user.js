// const User = require('../models/user')



module.exports.renderLogin = (req, res) => {
  res.render('users/login')
}

module.exports.renderRegister = (req, res) => {
  res.render('users/register')
}