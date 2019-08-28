let tripService = require('../services/TripService');

const tripController = {

    getTrip(req, res, next) {
        tripService.getTrip(req.params.tripId)
            .then(response => {
                return res.status(200).json({data: response});
            })
            .catch(err => {
                next(err);
            })
    },

    postTrip(req, res, next) {
        tripService.postTrip(req.body)
            .then(response => {
                return res.status(200).json({data: response});
            })
            .catch(err => {
                next(err);
            })
    },

    updateTrip(req, res, next) {
        tripService.updateTrip(req.params.tripId,req.body)
            .then(response => {
                return res.status(200).json({data: response});
            })
            .catch(err => {
                next(err);
            })
    },

    deleteTrip(req, res, next) {
        tripService.deleteTrip(req.params.tripId)
            .then(response => {
                return res.status(200).json({data: response});
            })
            .catch(err => {
                next(err);
            })
    }

};

module.exports = tripController;
