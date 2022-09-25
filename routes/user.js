const express = require('express')
const user = require('../controller/user')

const router = express.Router();



router.route('/login')
      .get(user.renderLogin)
      // .post()



module.exports = router;