let carService = require('../services/CarService');

const CarController = {

    postCar(req, res, next) {
        carService.postCar(req)
            .then(response => {
                return res.status(200).json({data: response});
            })
            .catch(err => {
                next(err);
            })
    },

    getCar(req, res, next) {
        carService.getCar(req.params.carRegNo)
            .then(response => {
                return res.status(200).json({data: response});
            })
            .catch(err => {
                next(err);
            })
    },

    updateCar(req,res,next) {
      carService.updateCar(req.params.carRegNo,req.body)
          .then(response => {
              return res.status(200).json({data: response});
          })
          .catch(err => {
              next(err);
          })
    },

    deleteCar(req,res,next) {
        carService.deleteCar(req.params.carRegNo)
            .then(response => {
                return res.status(200).json({data: response});
            })
            .catch(err => {
                next(err);
            })
    }
};

module.exports = CarController;
