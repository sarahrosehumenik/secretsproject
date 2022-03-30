const mongoose = require('mongoose')

const Schema = mongoose.Schema





const commentSchema = new Schema({
    comments: {
        type: String,
        
    },
    image: {
        type: String,
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String
 }, {
          timestamps: true
      })
 

const secretSchema = new Schema({
    yourSecret: {
        type: String ,
        required: true
    }, 
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,

     comments: [commentSchema]
 },
  {
        timestamps: true,
       
    });


module.exports = mongoose.model('secretsCollection', secretSchema)