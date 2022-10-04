const mongoose = require('mongoose');

const conn2 = require("../db/conn2");



const topicSchema = new mongoose.Schema({
    comment : {
        type : String,
        required : true
    }
});

module.exports = conn2.model('Topics',topicSchema) 
