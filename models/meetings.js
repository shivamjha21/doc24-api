const mongoose = require('mongoose');


const meetingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    date: {
        type: String,
        default: ""
    },
    time: {
        type: String,
        default: ""
    },
    disease: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "disease",
        default: null,
    },
    appointment_type: {
        type: String,
        default: ""
    },
    note: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "pending"    
    },
    amount: {
        type: Number,
        default: 0
    },
    amount_status: {
        type: String,
        default: "unpaid"    
    }
}, { timestamps: true });


//Virtual field



module.exports = mongoose.model('meetings', meetingSchema);