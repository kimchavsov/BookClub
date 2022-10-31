const Book = require("../models/book");
const Note = require("../models/note");



module.exports.renderNotes = async (req, res) => {
  console.log("rendernote");
  res.render('console.log')
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
  }
  // TODO: Handle create note from note creation

}
