'use strict'

var mqtt = require('mqtt')

module.exports = (input, baseFileDir, callback) => {
	const source = input.source
	const params = input.params
	let error = null
	let output = null


	// Validate configuration
	if ( !source.url ) {
		if ( !error ) {
			error = new Error('URL for MQTT broker is not being set.')
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
			error = new Error('username for MQTT broker is not being set.')
		}
	}

	if ( !source.password ) {
		if ( !error ) {
			error = new Error('password for MQTT broker is not being set.')
		}
	}

	if ( !source.topic && !params.topic ) {
		if ( !error ) {
			error = new Error('The parameter topic is not being set.')
		}
	} else if ( params.topic ) {
		source.topic = params.topic
	}

	if ( !params.payload ) {
		if ( !error ) {
			error = new Error('The parameter payload is not being set.')
		}
	}

	if ( ![0, 1, 2].includes(params.qos) ) {
		params.qos = 0
	}

	callback(error, output, params)

}
