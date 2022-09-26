const express = require('express')
const user = require('../controller/user')

const router = express.Router();



router.route('/login')
      .get(user.renderLogin)
      // .post()

router.route('/register')
      .get(user.renderRegister)

module.exports = router;