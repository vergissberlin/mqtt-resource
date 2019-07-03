// https://github.com/mqttjs/MQTT.js/issues/647

let mqtt = require('mqtt')

let username = 'test',
	password = 'test',
	url = 'mqtt://0.0.0.0',
	port = 1883,
	topic = 'test'


let options = {
	username: username,
	password: password,
	port: port,
	clientId: 'mqtt-listen',
	clean: true,
	will: {
		topic: 'device',
		payload: 'pipeline'
	}
}

let client = mqtt.connect(url, options)

client.on('connect', function (connection) {
	console.log('connection.sessionPresent:', connection.sessionPresent)
	client.subscribe(topic, {}, function (error, granted) {
		if (error) {
			return console.error
		}
		console.log(`Subscribed "${ topic }"`, granted)
	})

})

client.on('message', function (topic, message) {
	console.log('Last id: ' + client.getLastMessageId())
	if (message.toString() !== 'none') {
		console.log(message.toString())
		// Delete the retained message
		client.publish(topic, 'none', {retain: true})
	} else {
		console.log('No message available')
	}
	client.end()
})


