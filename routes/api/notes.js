const express = require("express");
const router = express.Router();
const notesCtrl = require("../../controllers/notes");
const notedCtrl = require('../../controllers/noted');


//We use Multer and upload to ensure we can upload files
const multer = require('multer');
const upload = multer();

/*---------- Public Routes ----------*/
router.post("/",  upload.single('photo'), notesCtrl.create);
router.get("/", notesCtrl.index);
router.delete("/:id", notesCtrl.removeNote)

//Noted Routing
router.post('/noted/:id', notedCtrl.create);
router.delete('/noted/:id', notedCtrl.removeNoted);



/*---------- Protected Routes ----------*/

module.exports = router;



/*---------- Protected Routes ----------*/

