const mongoose = require('mongoose')

const Schema = mongoose.Schema



const commentSchema = new Schema({
    comments: {
        type: String,
        required: true
    },
})
 

const secretSchema = new Schema({
    yourSecret: {
        type: String ,
        required: true
    },
     comments: [commentSchema],
})


module.exports = mongoose.model('secretsCollection', secretSchema)