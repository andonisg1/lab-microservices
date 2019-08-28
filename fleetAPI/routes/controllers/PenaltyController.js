let penaltyService = require('../services/PenaltyService');

const penaltyController = {

    getPenaltiesByDriver(req, res, next) {
        penaltyService.getPenaltiesByDriver(req.params.driver)
            .then(response => {
                return res.status(200).json({data: response});
            })
            .catch(err => {
                next(err);
            })
    },

    getPenaltiesByTripId(req, res, next) {
        penaltyService.getPenaltiesByTripId(req.params.tripId)
            .then(response => {
                return res.status(200).json({data: response});
            })
            .catch(err => {
                next(err);
            })
    },

    postPenalty(req, res, next) {
        penaltyService.postPenalty(req.body)
            .then(response => {
                return res.status(200).json({data: response});
            })
            .catch(err => {
                next(err);
            })
    },

    countPenaltiesByTripId(req, res, next) {
        penaltyService.countPenaltiesByTripId(req.params.tripId)
            .then(response => {
                return res.status(200).json({data: response});
            })
            .catch(err => {
                next(err);
            })
    },

    countPenaltiesByDriver(req, res, next) {
        penaltyService.countPenaltiesByDriver(req.params.driver)
            .then(response => {
                return res.status(200).json({data: response});
            })
            .catch(err => {
                next(err);
            })
    }
};

module.exports = penaltyController;
