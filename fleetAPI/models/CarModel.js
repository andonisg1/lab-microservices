let mongoose = require('mongoose')

let carSchema = new mongoose.Schema({
    model: String,
    build: Number,
    carRegNo: {type: String,required:[true,"Reg Number is Required"],unique:true},
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('Car', carSchema)
