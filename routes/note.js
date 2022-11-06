const express = require('express');
const note = require("../controller/note");

const router = express.Router();

// router.route('/')
//   .post(console.log("hello"))


router.route('/')
  .get(note.renderNotes)
  .post(note.createNote)

router.route('/new')
  .get(note.renderNewNote)

module.exports = router