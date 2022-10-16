"use strict";

// REF: https://www.npmjs.com/package/mqtt
const mqtt = require('mqtt')

let mqttTopic = "bns";
let host = "ws://172.28.0.41:9001";
let keepAliveInterval = 60;
let clientId = "Nodejs";
let cleanSession = true;
let useSSL = false; // Enable SSL before sending user/pass over the Internet
let userName = "SomeUser";
let password = "someSecret";

const connectOptions = {
    timeout: 10,
    useSSL: useSSL,
    cleanSession: cleanSession,
    clientId: clientId,
    username: userName,
    password: password,
    keepalive: keepAliveInterval
}
const client = mqtt.connect(host, connectOptions);

client.on('connect', function () {
    client.subscribe(mqttTopic, function (err) {
        if (!err) {
            client.publish(mqttTopic, 'Hello MQTT from Nodejs')
        }
    })
});

client.on('message', function (topic, message) {
    console.log(message.toString())
    // client.end()
});
