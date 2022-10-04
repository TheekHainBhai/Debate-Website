const mongoose = require('mongoose');
const conn2 = require("../db/conn2");    //importing databse conection  for creating model

//newly added  //topicCons schema
const topicCons = new mongoose.Schema({
    comment : {
        type : String,
        required : true
    }
});

module.exports = conn2.model('TopicCons',topicCons)    //newly added   //topic cons model