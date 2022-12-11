const Book = require('../models/book')


module.exports.viewAll = async (req, res) => {
  const books = await Book.find({owner: {$eq: req.user._id }});
  res.render('books/index', {books});
}

module.exports.viewBook = async (req, res) => {
  const book = await Book.findById(req.params.id).populate({path: 'notes'});
  res.render('books/show', {book})
}

module.exports.renderNew = async (req, res) => {
  res.render('books/new')
}

module.exports.createBook = async (req, res) => {
  const book = new Book(req.body.book);
  book.owner = req.user._id;
  book.createdDate = new Date();
  await book.save();
  res.redirect('/books');
}

module.exports.renderEdit = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) {
    return res.redirect('/books');
  }
  res.render('books/edit', {book})
}

module.exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, {...req.body.book})
  res.redirect(`books/${book._id}`)
}

module.exports.updateProgress = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, {...req.body.book})
  res.redirect(`books/${book._id}`)
}

module.exports.deleteBook = async (req, res) => {
  const { id } = req.params
  const delBook = await Book.findOneAndDelete(id)
  res.redirect('/books')
}

module.exports.handleNotFound = (req, res) => {
  res.redirect('/')
}

