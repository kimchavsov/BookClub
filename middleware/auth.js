

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log(req.user)
    return res.redirect('/login')
  }
  next()
}