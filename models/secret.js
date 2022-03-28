const mongoose = require('mongoose')

const Schema = mongoose.Schema





const commentSchema = new Schema({
    comments: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
 }, {
          timestamps: true
      })
 

const secretSchema = new Schema({
    yourSecret: {
        type: String ,
        required: true
    },
     comments: [commentSchema]
 },
  {
        timestamps: true,
    });


module.exports = mongoose.model('secretsCollection', secretSchema)