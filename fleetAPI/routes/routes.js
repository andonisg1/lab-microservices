const express = require('express');
const driver = require('./controllers/DriverController');
const car = require('./controllers/CarController');
const trip = require('./controllers/TripController');
const penalty = require('./controllers/PenaltyController');


const router = express.Router();

router.get('/driver/:idNo',driver.getDriver);
router.post('/driver',driver.postDriver);
router.delete('/driver/:idNo',driver.deleteDriver);
router.put('/driver/:idNo',driver.updateDriver);
router.patch('/driver/assign',driver.assignCarToDriver);
router.patch('/driver/unassign',driver.unassignCarFromDriver);


router.post('/car',car.postCar);
router.get('/car/:carRegNo',car.getCar);
router.put('/car/:carRegNo',car.updateCar);
router.delete('/car/:carRegNo',car.deleteCar);

router.post('/trip',trip.postTrip);
router.get('/trip/:tripId',trip.getTrip);
router.put('/trip/:tripId',trip.updateTrip);
router.delete('/trip/:tripId',trip.deleteTrip);

router.get('/penalty/trip/:tripId', penalty.getPenaltiesByTripId);
router.get('/penalty/driver/:driver', penalty.getPenaltiesByDriver);
router.post('/penalty', penalty.postPenalty);
router.get('/penalty/count_by_trip/:tripId',penalty.countPenaltiesByTripId);
router.get('/penalty/count_by_driver/:driver',penalty.countPenaltiesByDriver);

module.exports = router;
