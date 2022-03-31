
const mongoose = require('mongoose');
const Secret = require('../models/secret');
const User = require('../models/user');






module.exports = {
  show,
  create,
  update,
  edit
  


};

function show(req, res) {

  User.findById(req.params.id, function (err, profileUser) {
    Secret.find({ user: profileUser._id }, function (err, secrets) {

     
console.log(profileUser)



      res.render('profile/show', { profileUser, secrets })
    })
  })
}

function create(req, res) {

  User.findById(req.params.id, function (err, user) {
    console.log(req.body)
    console.log(user.profileComments)
    req.body.userName = req.user.name;
    user.profileComments.push(req.body)
    user.save(function (err) {

      res.redirect(`/profile/${user._id}`);
    });
  });
}


function edit(req, res) {
  const profile = { id: req.params.id }

  res.render('profile/edit', { profile })
}


function update(req, res) {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, user) {
    console.log(req.body)
    console.log(req.params.id)
    if (err)
      return res.redirect(`/profile/${user._id}`)
    res.redirect(`/profile/${user._id}/edit`)
  });
}

