const postToExternalAPI = require('./utils/externalAPIService');

module.exports = function heartbeatMonitor(dataFromQueue){
    dataFromQueue = JSON.parse(dataFromQueue);

    let speed = dataFromQueue.speed;

    let data = {
        speed: dataFromQueue.speed,
        tripId: dataFromQueue.tripId,
        driver: dataFromQueue.driver
    }

    if(speed>60 && speed<=80)
    {
        //1 penalty point
        data.penaltyPoints = 1;
        postToExternalAPI('/penalty',data);
    }
    else if(speed>80 && speed<=100)
    {
        //2 penalty points
        data.penaltyPoints = 2;
        postToExternalAPI('/penalty',data);
    }
    else if(speed>100)
    {
        //5 penalty points
        data.penaltyPoints = 5;
        postToExternalAPI('/penalty',data);
    }

    console.log(dataFromQueue);
};
