const mongoose = require('mongoose');
const conn2 = require("../db/conn2");    //importing databse conection  for creating model

//newly added  //topicPros schema
const topicPros = new mongoose.Schema({
    comment : {
        type : String,
        required : true
    }
});

module.exports = conn2.model('TopicPros',topicPros)    //newly added   //topic pros model


