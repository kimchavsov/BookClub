const express = require('express')
const book = require('../controller/book')

const router = express.Router()

router.route('/')
  .post(console.log("hello"))


module.exports = router