   
 const express = require('express');
 const router = express.Router();
 const profileCtrl = require('../controllers/users');

//  router.get('/profile/:id', profileCtrl.index)
router.get('/profile/:id', profileCtrl.show);
router.post('/profile/:id/comments', profileCtrl.create)

router.get('/profile/:id/edit', profileCtrl.edit);
router.put('/profile/:id', profileCtrl.update);


 module.exports = router; 