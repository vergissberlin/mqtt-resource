'use strict'

module.exports = (input, callback) => {
	const mqtt = require('mqtt')
	const configuration = require('./configuration')
	const validate = require('./validate')
	let error = null
	let output = null
	let receivedMessage

	validate.sourceConfiguration(input, (validatedInput, thrownError) => {
		input = validatedInput
		error = thrownError
	})
	validate.paramConfiguration(input, (validatedInput, thrownError) => {
		input = validatedInput
		error = thrownError
	})

	// Send MQTT
	if ( !error ) {
		let configurationMqtt = configuration.mqtt(input)
		let client = mqtt.connect(input.source.url, configurationMqtt)

		client.on('connect', () => {
			client.subscribe(input.source.topic, (errorConnection) => {
				if ( !errorConnection ) {
					client.publish(input.source.topic, input.params.payload, {
						qos: input.params.qos,
						retain: false
					})
				} else {
					error = errorConnection
				}
			})
		})

		client.on('message', (topic, message) => {
			output = {
				'version': {'ref': 'output'},
				'metadata': [
					{'name': 'message', 'value': input.params.payload.toString()},
					{'name': 'receivedMessage', 'value': message.toString()},
					{'name': 'qos', 'value': input.params.qos.toString()},
					{'name': 'timestamp', 'value': Date.now().toString()},
					{'name': 'topic', 'value': topic}
				]
			}
			client.end()
			callback(error, output)
		})

	}
}
