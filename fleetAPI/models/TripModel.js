let mongoose = require('mongoose');

let tripSchema = new mongoose.Schema({
    startPoint: {
        longitude:{type: Number,required:[true,"Start point longitude is Required"]},
        latitude: {type: Number,required:[true,"Start point latitude is Required"]},
    },
    endPoint : {
        longitude:{type: Number,required:[true,"End point longitude is Required"]},
        latitude: {type: Number,required:[true,"End point latitude is Required"]}
    },
    startDate:Date,
    driver: {type: Number,required:[true,"Driver is Required"]},
    tripId: {type: Number,required:[true,"Trip ID is Required"],unique:true},
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('Trip', tripSchema);
