const Book = require("../models/book");
const note = require("../models/note");
const Note = require("../models/note");



module.exports.renderNotes = async (req, res) => {
  const books = await Book.find({owner: {$eq: req.user._id }}).populate('notes');
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

module.exports.viewNote = async (req, res) => {
  const note =  await Note.findById(req.params.id);
  res.render("notes/show", { note });
}

module.exports.renderEdit = async (req, res) => {
  const note = await Note.findById(req.params.id).populate('book');
  const books = await Book.find({owner: {$eq: req.user._id }});
  res.render("notes/edit", { books, note });
}

module.exports.updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note.book._id === req.body.note.book) {
    await Note.findByIdAndUpdate(req.params.id, {...req.body.note});
    res.redirect(`/notes/${note._id}`);
  } else {
    let book = await Book.findById(note.book._id);
    console.log(book.notes)
    await book.save();
    note.update(req.body.note);
    await note.save();
    book = await Book.findById(note.book._id).notes.push(note);
    await book.save();
  }
}