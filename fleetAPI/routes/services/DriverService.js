let DriverModel = require('../../models/DriverModel');

const driverService = {

    postDriver(data) {
        return new Promise((resolve, reject) => {
            let msg = new DriverModel({
                firstName: data.firstName,
                lastName: data.lastName,
                carRegNo: data.carRegNo,
                idNo: data.idNo,
                created_at: Date.now(),
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

    getDriver(idNo) {
        return new Promise((resolve, reject) => {
            DriverModel.find({
                idNo: idNo
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

    updateDriver(idNo,data) {
        return new Promise((resolve, reject) => {
            data.updated_at = Date.now();
            DriverModel.findOneAndUpdate({
                    idNo: idNo
                },data,
                { returnNewDocument: true })
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

    deleteDriver(idNo) {
        return new Promise((resolve, reject) => {
            DriverModel.findOneAndRemove({
                idNo: idNo
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

    assignCarFromDriver(data) {
        return new Promise((resolve, reject) => {
            data.updated_at = Date.now();
            DriverModel.findOneAndUpdate({
                    idNo: data.idNo
                },
                data
                ,{ returnNewDocument: true })
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

    unassignCarFromDriver(data) {
        return new Promise((resolve, reject) => {
            DriverModel.findOneAndUpdate({
                    idNo: data.idNo
                },
                {
                    carRegNo: null,
                    updated_at: Date.now(),
                },{ returnNewDocument: true })
                .then(doc => {
                    console.log(doc);
                    resolve(doc);
                })
                .catch(err => {
                    console.error(err)
                    reject(err);
                })
        });
    }
};

module.exports = driverService;
