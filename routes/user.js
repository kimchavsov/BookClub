const express = require('express');
const passport = require('passport');

const user = require('../controller/user');


const router = express.Router();



router.route('/login')
      .get(user.renderLogin)
      .post(passport.authenticate('local', { failureRedirect: '/login' }), user.handleLogin)

router.route('/register')
      .get(user.renderRegister)
      .post(user.handleRegister)

router.route('/logout')
      .get(user.handleLogout)

module.exports = router;