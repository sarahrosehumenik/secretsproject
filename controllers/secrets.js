const Secret = require('../models/secret')

module.exports = {
    index,
    new: newSecret,
    show,
    create,


}

function index(req, res) {
    Secret.find({}, function (err, secrets) {
        return secrets 
    })
}

function newSecret(req, res) {
    res.render('secrets/new')

}
function show(req, res) {
    Secret.findById(req.params.id, (err, secrets) => {
        console.log(secrets)



        res.render('secrets/show', { secrets })
    })
}

function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;

    const secret = new Secret(req.body)


    secret.save((err) => {

        if (err) {
            return res.render('secrets/new')
        }
        res.redirect('secrets')

    })
}


