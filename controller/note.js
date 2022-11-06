const Book = require("../models/book");
const note = require("../models/note");
const Note = require("../models/note");



module.exports.renderNotes = async (req, res) => {
  console.log("rendernote");
  res.render('notes/index')
}

module.exports.createNote = async (req, res) => {
  // Handle note create from book
  if (req.params.id) {
    const book = await Book.findById(req.params.id);
    note = new Note(req.body.note);
    note.book = req.params.id;
    book.notes.push(note);
    await note.save();
    await book.save();
    return res.redirect(`/books/${req.params.id}`);
  } else {
    // TODO: Handle create note from note creation
    const book = await Book.findById(req.body.note.bookID);
    note = new Note(req.body.note);;
    book.notes.push(note);
    await note.save();
    await book.save();
    return res.redirect(`/notes`);
  }

}
