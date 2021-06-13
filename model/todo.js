const mongoose = require('mongoose');
const {status_enum,defaultstatus}=require('./enum.js');


const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    description: String,
    deadline:{
        type: String,
        required: true
    },
    status:{
        type: [String],
        enum:status_enum,
        required:true,
        default:defaultstatus
    }
})
const todoModel= mongoose.model('todo',todoSchema);

module.exports = todoModel;