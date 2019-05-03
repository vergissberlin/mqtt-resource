const mqtt = require('mqtt')
const validate = require('./validate')
const configuration = require('./configuration')

module.exports = (input, callback) => {
	let error = null
	let output = null

	validate.sourceConfiguration(input, (validatedInput, thrownError) => {
		input = validatedInput
		error = thrownError
	})

	// Send MQTT
	if ( !error ) {
		let configurationMqtt = configuration.mqtt(input)
		let client = mqtt.connect(input.source.url, configurationMqtt)
		let version = null

		client.on('connect', () => {
			let topic = input.source.prefix + '/' + process.env.BUILD_TEAM_NAME + '/' + process.env.BUILD_PIPELINE_NAME
			client.subscribe(topic, (errorConnection) => {
				if ( !errorConnection ) {
					client.on('message', (topic, message) => {
						version = message.toString()
						client.end()
					})
				} else {
					error = errorConnection
				}
			})
		})

		output = [
			{'ref': version}
		]
	}

	callback(error, output)
}
