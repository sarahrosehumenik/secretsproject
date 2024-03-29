const mongoose = require('mongoose');
const Schema = mongoose.Schema;





const profileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    profileComments: {
        type: String,
        required: true,
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        userName: String,
    },
    userName: String
})


const userSchema = new mongoose.Schema({
    name: String,
    backgroundColor: {
        type:String,
        default:"none"
    },
    status: {
        type:String,
        default: "I'm a secret keeper"
    },
    googleId: {
        type: String,
        required: true
    },
    banned: Boolean,
    profileComments: [profileSchema],
    img: {
        type: String,
        default: "https://i.imgur.com/qcqiTKG.jpg?1"
    },

},
    {
        timestamps: true
    });

module.exports = mongoose.model('User', userSchema);