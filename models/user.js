const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    profileComments: {
        type: String,
        required: true 
    },

})

const userSchema = new mongoose.Schema({
    name: String,
    googleId: {
      type: String,
      required: true
    },


    banned: Boolean,
    profileComments: [profileSchema],
  }, 

  
  {
    timestamps: true
  });

module.exports = mongoose.model('User', userSchema);