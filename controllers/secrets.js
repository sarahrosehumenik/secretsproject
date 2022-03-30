const Secret = require('../models/secret')

module.exports = {
    index,
    new: newSecret,
    show,
    create,
   

}

function index(req, res) {
    Secret.find({}, function(err, secrets) {
        res.render('secrets/index', { secrets } )
        
    })
}

function newSecret(req, res) {
    res.render('secrets/new')

}
function show(req, res) {
  Secret.findById(req.params.id, (err, secrets) =>{
      console.log(secrets)
   
    
 
      res.render('secrets/show', { secrets })
  })
}

function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    
  const secret = new Secret(req.body)

 
  secret.save((err) => {
   
      if(err){
     return res.render('secrets/new')
  }
      res.redirect('secrets')
   
})
}

// function deleteComment(req, res, next) {
//     // Note the cool "dot" syntax to query on the property of a subdoc
//     Secret.findOne({'yourSecret._id': req.params.id}).then(function(secret) {
//       // Find the review subdoc using the id method on Mongoose arrays
//       // https://mongoosejs.com/docs/subdocs.html
//       const secret = yourSecret.id(req.params.id);
      
//       // Ensure that the review was created by the logged in user
//        if (!secret.user.equals(req.user._id)) 
//       return res.redirect(`/secrets/${secret._id}`);
//       // Remove the review using the remove method of the subdoc
//       secret.remove();
//       // Save the updated movie
//       secret.save().then(function() {
//         // Redirect back to the movie's show view
//         res.redirect(`/secrets/${secret._id}`);
//       }).catch(function(err) {
//         // Let Express display an error
//         return next(err);
//         // res.redirect(`/movies/${movie._id}`);
//       });
//     });
//   }



