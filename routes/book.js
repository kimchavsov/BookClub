const express = require('express')
const book = require('../controller/book')
const { isLoggedIn } = require('../middleware/auth')

const router = express.Router()


router.route('/')
  .get(book.viewAll)

router.route('/new')
  .get(book.renderNew)

router.route('/:id')
  .get(book.viewBook)
  .post(book.createBook)
  .put(book.updateBook)
  .delete(book.deleteBook)

router.post('/:id/progress', book.updateProgress)

router.get('/*', book.handleNotFound)

module.exports = router