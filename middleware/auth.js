

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log("run this")
    return res.redirect('/login')
  }
  next()
}