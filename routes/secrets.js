var express = require('express');
var router = express.Router();
const secretsCtrl = require('../controllers/secrets')
const isLoggedIn = require('../config/auth');

router.get('/', secretsCtrl.index)
router.get('/new', isLoggedIn, secretsCtrl.new)
router.get('/:id', isLoggedIn, secretsCtrl.show)
router.post('/', isLoggedIn, secretsCtrl.create)


module.exports = router;
