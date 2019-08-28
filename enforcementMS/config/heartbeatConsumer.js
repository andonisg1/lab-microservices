const amqp = require('amqplib/callback_api');
const heartbeatMonitor = require('../heartbeatMonitor');


const CONN_URL = 'amqp://rabbitmq:rabbitmq@localhost';

amqp.connect(CONN_URL, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        let queue = 'heartBeatsQueue';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s.", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            channel.ack(msg);
            heartbeatMonitor(msg.content.toString())
        }, {
            noAck: false
        });
    });
});
