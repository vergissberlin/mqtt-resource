'use strict'

module.exports = (input, callback) => {
	const mqtt = require('mqtt')
	const validate = require('./validate')
	const configuration = require('./configuration')
	let error = null
	let output = null

	validate.configuration(input, (validatedInput, thrownError) => {
		input = validatedInput
		error = thrownError
	})

	// Send MQTT
	if ( !error ) {
		let configurationMqtt = configuration.mqtt(input)
		let client = mqtt.connect(input.source.url, configurationMqtt)
		let version = null

		client.on('connect', () => {
			client.subscribe(input.source.prefix, (errorConnection) => {
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
			version = message.toString()
			client.end()
		})



		output = [
			{'ref': version}
		]
	}


	callback(error, output)
}
