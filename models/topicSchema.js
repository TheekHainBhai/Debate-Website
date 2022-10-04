const mongoose = require('mongoose');
const conn2 = require("../db/conn2");    //importing databse conection  for creating model

//topic schema
const topicSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    }
});


module.exports = conn2.model('Topics',topicSchema) 


