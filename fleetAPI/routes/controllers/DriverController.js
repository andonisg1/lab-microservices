let driverService = require('../services/DriverService');

const driverController = {

    getDriver(req, res, next) {
        driverService.getDriver(req.params.idNo)
            .then(response => {
                return res.status(200).json({data: response});
            })
            .catch(err => {
                next(err);
            })
    },

    postDriver(req, res, next) {
        driverService.postDriver(req.body)
            .then(response => {
                return res.status(200).json({data: response});
            })
            .catch(err => {
                next(err);
            })
    },

    updateDriver(req,res,next) {
        driverService.updateDriver(req.params.idNo,req.body)
            .then(response => {
                return res.status(200).json({data: response});
            })
            .catch(err => {
                next(err);
            })
    },

    deleteDriver(req,res,next) {
        driverService.deleteDriver(req.params.idNo)
            .then(response => {
                return res.status(200).json({data: response});
            })
            .catch(err => {
                next(err);
            })
    },

    assignCarToDriver(req,res,next){
        driverService.assignCarFromDriver(req.body)
            .then(response => {
                return res.status(200).json({data: response});
            })
            .catch(err => {
                next(err);
            })
    },

    unassignCarFromDriver(req,res,next){
        driverService.unassignCarFromDriver(req.body)
            .then(response => {
                return res.status(200).json({data: response});
            })
            .catch(err => {
                next(err);
            })
    }
};

module.exports = driverController;
