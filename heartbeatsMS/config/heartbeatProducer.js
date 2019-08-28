const amqp = require('amqplib/callback_api');

const CONN_URL = 'amqp://rabbitmq:rabbitmq@localhost';

let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, channel) {
        ch = channel;
        channel.assertQueue('heartBeatsQueue', {
            durable: false
        });
    });
});
module.exports.sendToQueue=(queueName, data) => {
    ch.sendToQueue(queueName, new Buffer.from(JSON.stringify(data)));
};
process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});
