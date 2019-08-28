const PenaltyModel = require('../../models/PenaltyModel');
const DriverModel = require('../../models/DriverModel');
const TripModel = require('../../models/TripModel');

const penaltyService = {

    getPenaltiesByTripId(tripId) {
        return new Promise((resolve, reject) => {
            PenaltyModel.find({
                tripId: tripId
            })
                .then(doc => {
                    console.log(doc);
                    resolve(doc);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                })
        });
    },

    getPenaltiesByDriver(driver) {
        return new Promise((resolve, reject) => {
            PenaltyModel.find({
                driver: driver
            })
                .then(doc => {
                    console.log(doc);
                    resolve(doc);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                })
        });
    },


    postPenalty(data) {
        return new Promise((resolve, reject) => {
            let msg = new PenaltyModel({
                driver: data.driver,
                tripId: data.tripId,
                speed: data.speed,
                penaltyPoints: data.penaltyPoints,
                created_at: Date.now()
            });
            DriverModel.findOne({idNo: data.driver})
                .then(response => {
                    if (!response)
                        throw("Unable to find driver");
                    return TripModel.findOne({tripId: data.tripId})
                })
                .then(response => {
                    if (!response)
                        throw("Unable to find trip");
                    return msg.save();
                })
                .then(async doc => {
                    console.log(doc);
                    resolve(doc);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                })
        });
    },

    countPenaltiesByTripId(tripId) {
        return new Promise((resolve, reject) => {
            PenaltyModel.aggregate([
                { $match: { tripId: parseInt(tripId) } },
                { $group: { _id: null, penaltyPoints: { $sum: "$penaltyPoints" } } }
            ])


                .then(doc => {
                    console.log(doc);
                    resolve(doc);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                })
        });
    },

    countPenaltiesByDriver(driver) {
        return new Promise((resolve, reject) => {
            PenaltyModel.aggregate([
                { $match: { driver: parseInt(driver) } },
                { $group: { _id: null, penaltyPoints: { $sum: "$penaltyPoints" } } }
            ])


                .then(doc => {
                    console.log(doc);
                    resolve(doc);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                })
        });
    },

};
module.exports = penaltyService;
