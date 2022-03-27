const Secret = require('../models/secret')

module.exports = {
    index,
    new: newSecret,
    show,
    create

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
  console.log(secrets.createdAt)
      res.render('secrets/show', { secrets })
  })
}

function create(req, res) {
    
  const secret = new Secret(req.body)
 
  secret.save((err) => {
      if(err){
     return res.render('secrets/new')
  }
      res.redirect('secrets')
   
})
}





