const mqtt = require('mqtt')
const validate = require('./validate')
const configuration = require('./configuration')

module.exports = (input, callback) => {
	let error = null,
		output = []

	validate.sourceConfiguration(input, (validatedInput, thrownError) => {
		input = validatedInput
		error = thrownError
	})

	if (!error) {
		let configurationMqtt = configuration.mqtt(input)
		let client = mqtt.connect(input.source.url, configurationMqtt)
		let version = 0
		let topic = input.params.topics

		client.on('connect', () => {
			client.subscribe(topic, (errorConnection) => {
				if (!errorConnection) {
					client.on('message', (topic, message) => {
						version = message.toString()
					})
				} else {
					error = errorConnection.toString()
					callback(error, output)
				}
			})
		})

		client.on('message', function (topic, message) {
			if (message.toString() !== 'none') {
				output.push({'message': message.toString()})
			}
			client.end()
			callback(error, output)
		})
	} else {
		callback(error, output)
	}
}
