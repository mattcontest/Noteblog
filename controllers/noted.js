const Note = require('../models/note');


module.exports = {create, removeNoted};

async function create(req,res){
    try {
        const note = await Note.findById(req.params.id);
        note.noted.push({username: req.user.username, userId: req.user._id});
        await note.save();
        res.status(201).json({data: "Noted ~ Recorded"})
    } catch (err) {
        res.status(400).json({err})
        
    }
}

async function removeNoted(req,res){
    try {
        const note = await Note.findOne({'noted._id' : req.params.id, "noted.username" : req.user.username});
        note.noted.remove(req.params.id); //Mutating a document
        await note.save();
        res.json({data:"Remove from Noted Status"})
    } catch (err) {
        res.status(400).json({err})
        
    }
}