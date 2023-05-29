const mongoose = require('mongoose');


const diseaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
     },
    description: {
        type: String,
        default:""
     },
    short_description: {
        type: String,
        default:""
    },
    active: {
        type: Number,
        default: 0,
    },
    deleted: {
        type: Number,
        default: 0,
    },
 
}, { timestamps: true });


//Virtual field



module.exports = mongoose.model('disease', diseaseSchema);