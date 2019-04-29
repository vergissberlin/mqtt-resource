'use strict'

module.exports = (input, callback) => {
	const mqtt = require('mqtt')
	const validate = require('./validate')
	let error = null
	let output = null

	validate(input, (validatedInput, thrownError) => {
		input = validatedInput
		error = thrownError
	})

	output = {
		'version': {'ref': 'input'},
		'metadata': [
			{'name': 'topic', 'value': 'Hulk Hogan'},
			{'name': 'timestamp', 'value': Date.now().toString()}
		]
	}


	callback(error, output, source)
}
