const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");


//We use Multer and upload to ensure we can upload files
const multer = require('multer');
const upload = multer();

/*---------- Public Routes ----------*/
router.post("/signup",  upload.single('photo'), usersCtrl.signup);
router.post("/login", usersCtrl.login);

/*---------- Protected Routes ----------*/

module.exports = router;



/*---------- Protected Routes ----------*/



