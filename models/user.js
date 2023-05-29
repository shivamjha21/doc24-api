const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: ""
    },

    address: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    date_of_birth: {
        type: String
    },
    active: {
        type: Number,
        default: 0,
    },
    role: {
        type: Number,
        default: 0,
    },
    amount_charge: {
        type: String,
        default: ""
    },
    profile_pic: {
        type: String,
        default: ""
    },
    qualification: {
        type: String,
        default: ""
    },
    about: {
        type: String
    },
    user_type: {
        type: String,
        default: "user"
    },
    free_meetings: {
        type: Number,
        default: 3
    },
    specialist: {
        type: Array,
        default:[]
    },
    deleted: {
        type: Number,
        default: 0
    },
}, { timestamps: true });


//Virtual field



module.exports = mongoose.model('User', userSchema);