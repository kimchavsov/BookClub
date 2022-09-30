const express = require('express');
const passport = require('passport');

const user = require('../controller/user');


const router = express.Router();



router.route('/login')
      .get(user.renderLogin)
      // .post()
      .post(passport.authenticate('local', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
      })

router.route('/register')
      .get(user.renderRegister)
      .post(user.handleRegister)

module.exports = router;