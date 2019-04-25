'use strict'


module.exports = (input, baseFileDir, callback) => {
	const mqtt = require('mqtt')
	const source = input.source
	const params = input.params
	let error = null
	let output = null


	// Validate configuration
	if ( !source.url ) {
		if ( !error ) {
			error = new Error('URL for MQTT broker has not been set.')
		}
	}

	if ( !source.port ) {
		if ( !error ) {

		}
	}

	let port = Number.parseInt(source.port)
	if ( Number.isNaN(port) ) {
		source.port = 1883
	} else {
		source.port = port
	}

	if ( !source.username ) {
		if ( !error ) {
			error = new Error('The user name for MQTT broker has not been set.')
		}
	}

	if ( !source.password ) {
		if ( !error ) {
			error = new Error('The password for MQTT broker has not been set.')
		}
	}

	if ( !source.topic && !params.topic ) {
		if ( !error ) {
			error = new Error('The parameter topic has not been set.')
		}
	} else if ( params.topic ) {
		source.topic = params.topic
	}

	if ( !params.payload ) {
		if ( !error ) {
			error = new Error('The parameter payload has not been set.')
		}
	} else {
		params.payload.toString()
	}

	if ( ![0, 1, 2].includes(params.qos) ) {
		params.qos = 0
	}

	// Send MQTT
	if ( !error ) {
		let options = {
			username: source.username,
			password: source.password,
			port: source.port,
			qos: params.qos,
			will: {
				topic: source.topic,
				payload: params.payload
			}
		}

		let client = mqtt.connect(source.url, options)

		client.on('connect', () => {
			client.subscribe(source.topic, (errorConnection) => {
				if ( !errorConnection ) {
					client.publish(source.topic, params.payload, {
						qos: params.qos,
						retain: false
					})
				} else {
					error = errorConnection
				}
			})
		})

		client.on('message', (topic, message) => {
			output = message.toString()
			client.end()
		})
	}

	callback(error, output, source, params)

}
