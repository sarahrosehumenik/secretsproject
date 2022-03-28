 
const mongoose = require('mongoose');
 const Secret = require('../models/secret');
 const User = require('../models/user');
 const Profile = require('../models/profile')





module.exports = {
     show,
    create
 };

 function show(req, res) {
   
   User.findById(req.params.id, function(err, user) {
     console.log(user)
        res.render('profile/show', { user } )
      
    })
}

      function create(req, res) {

        User.findById(req.params.id, function(err, user) {
            console.log(req.body)
            console.log(user.profileComments)
            user.profileComments.push(req.body)
            user.save(function(err) {
                
                res.redirect(`/profile/${user._id}`);
              });
            });
          }