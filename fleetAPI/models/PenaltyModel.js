let mongoose = require('mongoose');

let penaltySchema = new mongoose.Schema({
    driver: {type: Number,required:[true,"Driver is Required"]},
    tripId: {type: Number,required:[true,"Trip ID is Required"]},
    speed: {type: Number,required:[true,"Speed is Required"]},
    penaltyPoints: {type: Number,required:[true,"Penalty Points Required"]},
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('Penalty', penaltySchema);
