const express = require("express");
const router = express.Router();
const Note = require('../models/Notes')
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const note = await Note.find({ user: req.user.id })
        res.json(note);


    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error");
    }
})

//endpoint for adding notes
router.post('/addnotes', fetchuser, [
    body('title', 'Title cannot be less than three charcters').isLength({ min: 3 }),
    body('description', 'description must be at least 5charcters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const saveNotes = await note.save();
        res.json(saveNotes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error");
    }
})


// route 3 for update an existing notes 
//:id will give the id of a particular note
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        let note = await Note.findById(req.params.id);// this req.params.id is from :id  of /updatnotes
        if (!note) {
            return res.status(404).send("notes not found");
        }
        //note.user.tostring will give id of this note user id 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("unauthorized access");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error");
    }

})
//delete an existing note using delete request
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //find note using id of note of logged in user
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("notes not found");
        }
        //allowing deletion only if user owns this notes
        //note.user.tostring id dega jo note model me user ka id hai
        //aur req.user.id fetchuser ka id dega jo header me present hai req marte time
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "success": "note has been deleted", note: note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error");
    }
})

module.exports = router