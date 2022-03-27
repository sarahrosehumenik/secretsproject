const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profiles');

router.get('/flights/:id/profile/', profileController.show);

module.exports = router;