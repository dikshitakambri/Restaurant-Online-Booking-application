const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UsersSchema = new Schema({
    email:  {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        default : ''
    }
}, {
    timestamps: true
});

var Users = mongoose.model('users', UsersSchema);

module.exports = Users;