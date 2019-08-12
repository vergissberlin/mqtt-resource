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

	// if file exist do:
	//   message = require('fs').readFile('/tmp/build/put/out/message', (err,buf) => { process.stdout.write(buf)})
	// endif
	// 	{'name': 'pwd', 'value': process.cwd()},

	// Send MQTT
	if (!error) {
		let configurationMqtt = configuration.mqtt(input)
		let client = mqtt.connect(input.source.url, configurationMqtt)
		input.params.qos = 0
		const sendMessage = async () => {
			try {
				await client.publish(
					input.params.topic,
					input.params.payload.toString()
				)
				output = {
					'version': {
						'ref': 'none',
						'message': input.params.payload.toString()
					},
					'metadata': [
						{'name': 'MQTT_LAST_MESSAGE_ID', 'value': client.getLastMessageId().toString() || 'not set'},
						{'name': 'ATC_EXTERNAL_URL', 'value': process.env.ATC_EXTERNAL_URL || 'not set'},
						{'name': 'BUILD_ID', 'value': process.env.BUILD_ID || 'not set'},
						{'name': 'BUILD_NAME', 'value': process.env.BUILD_NAME || 'not set'},
						{'name': 'BUILD_JOB_NAME', 'value': process.env.BUILD_JOB_NAME || 'not set'},
						{'name': 'BUILD_JOB_ID', 'value': process.env.BUILD_JOB_ID || 'not set'},
						{'name': 'BUILD_PIPELINE_NAME', 'value': process.env.BUILD_PIPELINE_NAME || 'not set'},
						{'name': 'BUILD_PIPELINE_ID', 'value': process.env.BUILD_PIPELINE_ID || 'not set'},
						{'name': 'BUILD_TEAM_NAME', 'value': process.env.BUILD_TEAM_NAME || 'not set'},
						{'name': 'source.url', 'value': input.source.url || 'not set'},
						{'name': 'source.port', 'value': input.source.port.toString() || 'not set'},
						{'name': 'params.payload', 'value': input.params.payload || 'not set'},
						{'name': 'params.topic', 'value': input.params.topic || 'not set'},
						{'name': 'params.qos', 'value': input.params.qos.toString() || 'not set'}
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
