const TripModel = require('../../models/TripModel');
const DriverModel = require('../../models/DriverModel');
const CarModel = require('../../models/CarModel');
const publishToQueue = require('../../config/produceTrips').sendToQueue;

const tripService = {

    getTrip(tripId) {
        return new Promise((resolve, reject) => {
            TripModel.find({
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


    postTrip(data) {
        return new Promise((resolve, reject) => {
                let msg = new TripModel({
                    startPoint: {
                        name: data.startPoint.name,
                        longitude: data.startPoint.longitude,
                        latitude: data.startPoint.latitude
                    },
                    endPoint: {
                        name: data.startPoint.name,
                        longitude: data.startPoint.longitude,
                        latitude: data.startPoint.latitude
                    },
                    tripId: data.tripId,
                    start: data.start,
                    driver: data.driver,
                    created_at: Date.now()
                });
                DriverModel.findOne({idNo: data.driver})
                    .then(response => {
                        if (!response) {
                            throw("Unable to find driver provided")
                        }
                        if(!response.carRegNo)
                        {
                            throw("You need to assign a car to the driver")
                        }
                        else {
                            return CarModel.findOne({carRegNo:response.carRegNo})
                        }
                    })
                    .then(response => {
                        if(!response)
                        {
                            throw("Car Registration No. not Found")
                        }
                        return msg.save();
                    })
                    .then(async doc => {
                        console.log(doc);
                        publishToQueue("tripsQueue", data);
                        resolve(doc);
                    })
                    .catch(err => {
                        console.error(err);
                        reject(err);
                    })
        });
    },

    updateTrip(tripId, data) {
        return new Promise((resolve, reject) => {
            data.updated_at = Date.now();
            TripModel.findOneAndUpdate({
                    tripId: data.tripId
                },
                data,{ returnNewDocument: true })
                .then(doc => {
                    console.log(doc);
                    resolve(doc);
                })
                .catch(err => {
                    console.error(err)
                    reject(err);
                })
        });
    },

    deleteTrip(tripId) {
        return new Promise((resolve, reject) => {
            TripModel.findOneAndRemove({
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
    }
};
module.exports = tripService;
