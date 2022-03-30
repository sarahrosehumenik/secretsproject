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
    img: {type: String,
        default: "https://i.imgur.com/qcqiTKG.jpg?1"
    },
    
  }, 
 
  
  {
    timestamps: true
  });

module.exports = mongoose.model('User', userSchema);