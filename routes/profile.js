   
 const express = require('express');
 const router = express.Router();
 const profileCtrl = require('../controllers/users');

 router.get('/profile/:id', profileCtrl.show);
router.post('/profile/:id', profileCtrl.create)
 module.exports = router; 