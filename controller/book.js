const Book = require('../models/book')

module.exports.updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id, {...req.body.book})
  res.redirect(`/books/${book._id}`)
}