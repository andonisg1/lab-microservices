const mongoose = require('mongoose');

let driverSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    carRegNo: String,
    idNo: {type: Number,required:[true,"ID Number is Required"],unique:true},
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('Driver', driverSchema);
