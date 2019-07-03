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
	clientId: 'mqtt-send',
	retain: true,
	will: {
		topic: 'device',
		payload: 'pipeline'
	}
}

let client = mqtt.connect(url, options)

client.on('connect', function () {
	client.subscribe(topic, function (err) {
		if (!err) {
			for ( let i = 0; i <= 1000; i++ ) {
				let message = `Hello message no. ${ i }`
				client.publish(topic, message, {
					qos: 0,
					retain: true
				})
				console.log(`Message sent: "${ message }"`)
			}
			client.end()
		}
	})
})
