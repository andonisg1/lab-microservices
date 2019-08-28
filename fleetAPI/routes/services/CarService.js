let CarModel = require('../../models/CarModel');

const carService = {
    postCar(req, res, next) {
        return new Promise((resolve, reject) => {
            let data = req.body;
            let msg = new CarModel({
                model: data.model,
                build: data.build,
                carRegNo: data.carRegNo,
                created_at: Date.now()
            });
            msg.save()
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

    getCar(carRegNo) {
        return new Promise((resolve, reject) => {
            CarModel.find({
                carRegNo: carRegNo
            })
                .then(doc => {
                    console.log(doc)
                    resolve(doc);
                })
                .catch(err => {
                    console.error(err)
                    reject(err);
                })
        });
    },

    updateCar(carRegNo,data) {
        return new Promise((resolve, reject) => {
            data.updated_at = Date.now();
            CarModel.findOneAndUpdate({
                    carRegNo: carRegNo
                },data,
                { returnNewDocument: true })
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

    deleteCar(carRegNo) {
        return new Promise((resolve, reject) => {
            CarModel.findOneAndRemove({
                    carRegNo: carRegNo
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
module.exports = carService;
