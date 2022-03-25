const Secret = require("../models/secret")

module.exports = {
    create
}
function create(req, res) {

    Secret.findById(req.params.id, function(err, secrets) {
      
        //console.log(req.body)
        secrets.comments.push(req.body)
        secrets.save(function(err) {
            
            res.redirect(`/secrets/${secrets._id}`);
          });
        });
      }