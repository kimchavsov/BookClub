const Note = require("../models/note")



module.exports.renderNotes = async (req, res) => {
  console.log("rendernote");
  res.render('console.log')
}

module.exports.createNote = async (req, res) => {
  // Handle note create from book
  if (req.params.id) {
    note = new Note(req.body.note);
    note.book = req.params.id;
    await note.save();
    return res.redirect(`/books/${req.params.id}`);
  }
  // TODO: Handle create note from note creation

}
