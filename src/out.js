const mqtt = require('async-mqtt')
const configuration = require('./configuration')
const validate = require('./validate')

module.exports = (input, callback) => {

	let error = null
	let output = {}

	validate.sourceConfiguration(input, (validatedInput, thrownError) => {
		input = validatedInput
		error = thrownError
	})
	validate.paramConfiguration(input, (validatedInput, thrownError) => {
		input = validatedInput
		error = thrownError
	})

	// Send MQTT
	if (!error) {
		let configurationMqtt = configuration.mqtt(input)
		let client = mqtt.connect(input.source.url, configurationMqtt)
		let payload = validate.json(input.params.json) ? JSON.stringify(input.params.json) : input.params.payload.toString
		let qos =  input.params.qos ? input.params.qos : input.source.qos
		let topic =  input.params.topic ? input.params.topic : input.source.topic
		payload = '{"position": 2, "state": "succeeded"}'

		const sendMessage = async () => {
			try {
				await client.publish(
					topic,
					payload
				)
				output = {
					'version': {
						'ref': client.getLastMessageId().toString() || 'none',
						'message': payload
					},
					'metadata': [
						{'name': 'topic', 'value': topic || 'not set'},
						{'name': 'qos', 'value': qos.toString() || 'not set'},
						{'name': 'ATC_EXTERNAL_URL', 'value': process.env.ATC_EXTERNAL_URL || 'not set'},
						{'name': 'BUILD_ID', 'value': process.env.BUILD_ID || 'not set'},
						{'name': 'BUILD_NAME', 'value': process.env.BUILD_NAME || 'not set'},
						{'name': 'BUILD_JOB_NAME', 'value': process.env.BUILD_JOB_NAME || 'not set'},
						{'name': 'BUILD_JOB_ID', 'value': process.env.BUILD_JOB_ID || 'not set'},
						{'name': 'BUILD_PIPELINE_NAME', 'value': process.env.BUILD_PIPELINE_NAME || 'not set'},
						{'name': 'BUILD_PIPELINE_ID', 'value': process.env.BUILD_PIPELINE_ID || 'not set'},
						{'name': 'BUILD_TEAM_NAME', 'value': process.env.BUILD_TEAM_NAME || 'not set'},
						{'name': 'MQTT_LAST_MESSAGE_ID', 'value': client.getLastMessageId().toString() || 'not set'},
						{'name': 'source.url', 'value': input.source.url || 'not set'},
						{'name': 'source.port', 'value': input.source.port.toString() || 'not set'}
					]
				}
				await client.end()
				callback(error, output)
			} catch (e) {
				callback(e.stack, {})
			}
		}
		client.on('connect', sendMessage)
	}
}
