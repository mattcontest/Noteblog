const express = require("express");
const router = express.Router();
const notesCtrl = require("../../controllers/notes");


//We use Multer and upload to ensure we can upload files
const multer = require('multer');
const upload = multer();

/*---------- Public Routes ----------*/
router.post("/",  upload.single('photo'), notesCtrl.create);
router.get("/", notesCtrl.index);

/*---------- Protected Routes ----------*/

module.exports = router;



/*---------- Protected Routes ----------*/

