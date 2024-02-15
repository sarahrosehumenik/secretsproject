   
const express = require('express');
const router = express.Router();
const profileCtrl = require('../controllers/users');
const User = require('../models/user');
const Secret = require('../models/secret');

router.get('/users', async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Fetch secrets for each user
    const usersWithSecrets = await Promise.all(users.map(async (user) => {
      const secrets = await Secret.find({ user: user._id });
      return { ...user.toObject(), secrets };
    }));

    // Send the users with secrets as a JSON response
    res.json(usersWithSecrets);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const profileUser = await User.findOne({ googleId: req.params.id });
    console.log("user by id", profileUser)
    if (!profileUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    const secrets = await Secret.find({ user: profileUser._id });
    // Assuming you want to send the data as JSON
    res.json({ profileUser, secrets });
  } catch (error) {
    console.error('Error fetching user and secrets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/:id/comments', async (req, res) => {
    try {
        const { profileComments, userName } = req.body;
        const userId = req.params.id;

        // Find or create the user by user ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Add a new comment to the user's profileComments array
        user.profileComments.push({
            profileComments: profileComments,
            userName,
        });

        // Save the updated user with the new profile comment
        const updatedUser = await user.save();

        res.status(201).json(updatedUser);
    } catch (error) {
        console.error('Error adding profile comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//a script to update all users in the database from a schema change
// User.updateMany({}, { $set: { backgroundColor: 'none', status: "I'm a secret keeper" } }, (err, result) => {
//   if (err) {
//     console.error('Error updating users:', err);
//   } else {
//     console.log('Users updated successfully:', result);
//   }
// });


router.post('/profile/:id/comments', profileCtrl.create)
router.get('/profile/:id/edit', profileCtrl.edit);
router.put('/profile/:id', profileCtrl.update);


 module.exports = router; 