const mongoose = require('mongoose');

var conn = mongoose.createConnection('mongodb+srv://Somesh:39XyNtB3xgVSqfE@cluster0.lrygfjr.mongodb.net/Sample?retryWrites=true&w=majority', {useNewUrlParser : true, useUnifiedTopology : true})

module.exports=conn;

