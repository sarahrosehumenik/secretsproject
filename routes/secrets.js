var express = require('express');
var router = express.Router();
const secretsCtrl = require('../controllers/secrets')

router.get('/', secretsCtrl.index)
router.get('/new', secretsCtrl.new)
router.get('/:id', secretsCtrl.show)
router.post('/', secretsCtrl.create)
module.exports = router;
