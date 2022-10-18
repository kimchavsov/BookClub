const User = require('../models/user')


module.exports.renderLogin = (req, res) => {
  res.render('users/login')
}

module.exports.handleLogin = (req, res) => {
  console.log('running this line')
  console.log(req.session.returnTo)
  console.log(req.session.currentUser)
  const redirectUrl = req.session.returnTo || '/books'
  res.redirect(redirectUrl)
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

module.exports.handleLogout = (req, res) => {
  req.logout((err) => {
    if (err) { return next(err)}
    
    res.redirect('/');
  })
}