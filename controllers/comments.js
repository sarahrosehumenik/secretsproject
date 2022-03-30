const Secret = require("../models/secret")

module.exports = {
    create,
    deleteComment
}
function create(req, res) {

    Secret.findById(req.params.id, function(err, secrets) {
  
        //console.log(req.body)
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        
        
        secrets.comments.push(req.body)
        
        secrets.save(function(err) {
            
            res.redirect(`/secrets/${secrets._id}`);
          });
        });
      }

      function deleteComment(req, res, next) {
        // Note the cool "dot" syntax to query on the property of a subdoc
        Secret.findOne({'comments._id': req.params.id}).then(function(secret) {
          // Find the review subdoc using the id method on Mongoose arrays
          // https://mongoosejs.com/docs/subdocs.html
          const comment = secret.comments.id(req.params.id);
          console.log(comment)
          // Ensure that the review was created by the logged in user
           if (!comment.user.equals(req.user._id)) 
          return res.redirect(`/secrets/${secret._id}`);
          // Remove the review using the remove method of the subdoc
          comment.remove();
          // Save the updated movie
          secret.save().then(function() {
            // Redirect back to the movie's show view
            res.redirect(`/secrets/${secret._id}`);
          }).catch(function(err) {
            // Let Express display an error
            return next(err);
            // res.redirect(`/movies/${movie._id}`);
          });
        });
      }

