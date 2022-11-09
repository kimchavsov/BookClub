const Book = require("../models/book");
const note = require("../models/note");
const Note = require("../models/note");



module.exports.renderNotes = async (req, res) => {
  const books = await Book.find({owner: {$eq: req.user._id }});
  res.render('notes/index', { books });
}

module.exports.renderNewNote = async (req, res) => {
  const books = await Book.find({owner: {$eq: req.user._id }});
  res.render("notes/new", { books });
}

module.exports.createNote = async (req, res) => {
  // Handle note create from book
  if (req.params.id) {
    const book = await Book.findById(req.params.id);
    const note = new Note(req.body.note);
    note.book = req.params.id;
    book.notes.push(note);
    await note.save();
    await book.save();
    return res.redirect(`/books/${req.params.id}`);
  } else {
    // TODO: Handle create note from note creation
    const book = await Book.findById(req.body.note.book);
    const note = new Note({title: req.body.note.title, content: req.body.note.content});
    note.book = req.body.note.book;
    book.notes.push(note);
    await note.save();
    await book.save();
    return res.redirect(`/notes`);
  }

}
