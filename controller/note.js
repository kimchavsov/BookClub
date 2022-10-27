const Note = require("../models/note")

exports.module.createNote = async (req, res) => {
  const note = new Note(req.body.note);
  // Ref note to the book that take note on
  note = req.body.book;
  await note.save();
  // Redirect to book id
  res.redirect('/books');
}