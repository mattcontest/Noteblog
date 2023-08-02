const express = require('express');
const router = express.Router();
const notedCtrl = require('../../controllers/noted');

router.post('/notes/:id/noted', notedCtrl.create);
router.delete('/notes/:id', notedCtrl.removeNoted);


module.exports = router;