const express = require('express')
const book = require('../controller/book')

const router = express.Router()


router.route('/')
  .get(book.viewAll)

router.route('/:id')
  .get(book.viewBook)
  .post(book.createBook)
  .put(book.updateBook)
  .delete(book.deleteBook)

router.post('/:id/progress', book.updateProgress)

router.get('/*', book.handleNotFound)

module.exports = router