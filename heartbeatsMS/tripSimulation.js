const randomLocation = require('random-location');
const moment = require('moment');
const publishToQueue = require('./config/heartbeatProducer').sendToQueue;

module.exports = function produceHeartbeat(dataFromQueue) {

    dataFromQueue = JSON.parse(dataFromQueue);

    let startPoint = {
        longitude: dataFromQueue.startPoint.longitude,
        latitude: dataFromQueue.startPoint.latitude
    };

    let endPoint = {
        longitude: dataFromQueue.endPoint.longitude,
        latitude: dataFromQueue.endPoint.latitude
    };

    let distance = Math.floor(randomLocation.distance(startPoint, endPoint)); //destination to meters

    //let prevPoint = randomLocation.randomCircumferencePoint(startPoint, distance)

    let seconds = 0;
    while (distance != 0) {
        let distanceTravelled = 0;
        if (distance > 33) {
            distanceTravelled = getRandomInt();
        } else {
            distanceTravelled = distance;
        }

        distance -= distanceTravelled;

        let speed = Math.floor(distanceTravelled * 3.6); //convert to km per hour
        seconds++;

        let data = {
            driver: dataFromQueue.driver,
            speed: speed,
            time: moment().add(seconds, "seconds").format(),
            tripId : dataFromQueue.tripId
        };

        publishToQueue("heartBeatsQueue", data);

        console.log("speed : " + speed + " distance : " + distance);

    }
    console.log("time travelled : " + seconds / 60 + " minutes");
};

function getRandomInt() {
    let min = Math.ceil(0);
    let max = 33;// CONSTANT FOR AVERAGE SPEED meters per second
    let random = Math.random() * (max - min) + min; //The maximum is exclusive and the minimum is inclusive
    return random;
}
