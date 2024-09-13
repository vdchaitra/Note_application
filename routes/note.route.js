import express from "express";
import noteModel from "../model/note.model.js";

const noteRouter = express.Router();

// Create a new note
noteRouter.post("/create", async (req, res) => {

  const { title, description, status } = req.body;
  const userId = req.user.id;

  try {
    const note = new noteModel({
      title,
      description,
      status,
      userId,
    });
    await note.save();
    res.status(201).json({
      msg: "Note created successfully",
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error while creating note: ${error}`,
    });
  }
});

// Get all notes for a specific user
noteRouter.get("/", async (req, res) => {
  const userId = req.user._id;


  try {
    const notes = await noteModel.find({ userId });
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({
      msg: `Error while fetching notes: ${error}`,
    });
  }
});

// Update a specific note
noteRouter.patch("/update/:id", async (req, res) => {
  const userId = req.user._id;
  const noteId = req.params.id;
  const updateIt = req.body;
  

  try {
    const note = await noteModel.findOne({ _id: noteId });
    if (!note) {
      
      return res.status(404).json({
        msg: "Note not found",
      });
    }

    if (note.userId.toString() === userId.toString()) {
      await noteModel.findByIdAndUpdate({ _id: noteId }, updateIt);
      return res.status(200).json({
        msg: "Note updated successfully",
      });
    } else {
      
      return res.status(401).json({
        msg: "Unauthorized: user not found or does not own the note",
      });
    }
  } catch (error) {

    res.status(500).json({
      msg: `Error while updating note: ${error}`,
    });
  }
});

// Delete a specific note
noteRouter.delete("/delete/:id", async (req, res) => {
  const userId = req.user._id;
  const noteId = req.params.id;

  

  try {
    const note = await noteModel.findOne({ _id: noteId });
    if (!note) {
      
      return res.status(404).json({
        msg: "Note not found",
      });
    }

    if (note.userId.toString() === userId.toString()) {
      await noteModel.findByIdAndDelete({ _id: noteId });
      return res.status(200).json({
        msg: "Note deleted successfully",
      });
    } else {
      
      return res.status(401).json({
        msg: "Unauthorized: user not found or does not own the note",
      });
    }
  } catch (error) {
   
    res.status(500).json({
      msg: `Error while deleting note: ${error}`,
    });
  }
});

export default noteRouter;
