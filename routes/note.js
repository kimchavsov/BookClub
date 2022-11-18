const express = require('express');
const note = require("../controller/note");

const router = express.Router();


router.route('/')
  .get(note.renderNotes)
  .post(note.createNote)

router.route('/new')
  .get(note.renderNewNote)


router.route('/:id')
  .get(note.viewNote)
  .put(note.updateNote)

router.route('/:id/edit')
  .get(note.renderEdit)

module.exports = router