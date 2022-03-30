 
const mongoose = require('mongoose');
 const Secret = require('../models/secret');
 const User = require('../models/user');
 const Profile = require('../models/profile')





module.exports = {
     show,
    create,
    update,
    edit,
    deleteComment
    
 };

 function show(req, res) {
  
   User.findById(req.params.id, function(err, user) {
     Secret.find({ user : req.user._id },  function(err, secrets) {

    
    
     
        res.render('profile/show', { user, secrets } )
      }) 
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
        
          function edit(req, res) {
            const profile = {id: req.params.id}
           
            res.render('profile/edit', { profile })
        }
       
            
          function update(req, res) {
            User.findOneAndUpdate( {_id: req.params.id}, req.body, {new: true} , function(err, user) {
                console.log(req.body)
                console.log(req.params.id)
                if (err)
                return res.redirect (`/profile/${user._id}`)
                res.redirect(`/profile/${user._id}/edit`)
            });
        }
        function deleteComment(req, res, next) {
          // Note the cool "dot" syntax to query on the property of a subdoc
          User.findOne({'profileComments._id': req.params.id}).then(function(user) {
            // Find the review subdoc using the id method on Mongoose arrays
            // https://mongoosejs.com/docs/subdocs.html
            const comment = user.profileComments.id(req.params.id);
            console.log(comment)
            // Ensure that the review was created by the logged in user
             if (!comment.user.equals(req.user._id)) 
            return res.redirect(`/profile/$user._id}`);
            // Remove the review using the remove method of the subdoc
            comment.remove();
            // Save the updated movie
            user.save().then(function() {
              // Redirect back to the movie's show view
              res.redirect(`/profile/${user._id}`);
            }).catch(function(err) {
              // Let Express display an error
              return next(err);
              // res.redirect(`/movies/${movie._id}`);
            });
          });
        }
  
  