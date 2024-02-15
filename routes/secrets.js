var express = require('express');
var router = express.Router();
const secretsCtrl = require('../controllers/secrets')
const isLoggedIn = require('../config/auth');
const Secret = require('../models/secret')

router.get('/', async (req, res) => {
  try {
    const secrets = await Secret.find(); // Fetch all secrets from the database
    res.json(secrets);
  } catch (error) {
    console.error('Error fetching secrets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { yourSecret, user, userName, comments } = req.body;
    console.log(req.body)

    // Create a new secret
    const newSecret = new Secret({
      yourSecret,
      user,
      userName,
      comments,
    });

    // Save the secret to the database
    const savedSecret = await newSecret.save();

    res.status(201).json(savedSecret);
  } catch (error) {
    console.error('Error creating secret:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/:id/comments', async (req, res) => {
  try {
    const { comments, image, user, userName } = req.body;
    const secretId = req.params.id;

    // Find the secret by ID
    const secret = await Secret.findById(secretId);

    if (!secret) {
      return res.status(404).json({ error: 'Secret not found' });
    }

    // Add a new comment to the secret's comments array
    secret.comments.push({
      comments,
      image,
      user,
      userName,
    });

    // Save the updated secret with the new comment
    const updatedSecret = await secret.save();

    res.status(201).json(updatedSecret);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// router.get('/new', isLoggedIn, secretsCtrl.new)
// router.get('/:id', isLoggedIn, secretsCtrl.show)
// router.post('/', isLoggedIn, secretsCtrl.create)


module.exports = router;
