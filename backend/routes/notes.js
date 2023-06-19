const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1 : Get all notes using : GET request , login required
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
    console.log(notes);
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error" });
  }
});

// Route 2 : add notes using : POST request , login required
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Enter a valid Title").isLength({ min: 1 }),
    body("description", "Minimum length is 8").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const {title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array });
      }
      const note = await new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNotes = await note.save();
      res.json(savedNotes);
    } catch (error) {
      console.log(error);
      res.json({ error: "Internal server error" });
    }
  }
);

// Route 3 : Update note using put request  -- login required & note
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // Create new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find a note and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error" });
  }
});

// Route 4 : Delete note using delete request  -- login required & note
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  //   const { title, description, tag } = req.body;
  try {
    // Find a note and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json("Successfully deleted");
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error" });
  }
});
module.exports = router;
