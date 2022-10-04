const mongoose = require('mongoose');

var conn2 = mongoose.createConnection('mongodb+srv://Somesh:39XyNtB3xgVSqfE@cluster0.lrygfjr.mongodb.net/Topics?retryWrites=true&w=majority',{useNewUrlParser : true, useUnifiedTopology : true})

module.exports=conn2;
