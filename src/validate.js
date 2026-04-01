class Validate {

	url (string) {
		/* eslint no-useless-escape: 0 */
		let regex = /(mqtt|mqtts|tcp|tls|ws|wss):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
		var pattern = new RegExp(regex)
		return pattern.test(string)
	}

	json(json)	{
		if (typeof json !== 'object' ) {
			return false
		}
		return true
	}

	sourceConfiguration (input, callback) {
		let error = null

		if (!input.source.url) {
			if (!error) {
				error = new Error('URL for MQTT broker has not been set.')
			}
		}

		if (!this.url(input.source.url)) {
			if (!error) {
				error = new Error('Your defined URL is invalid. It should start with mqtt://')
			}
		}

		let port = Number.parseInt(input.source.port)
		if (Number.isNaN(port)) {
			input.source.port = 1883
		} else {
			input.source.port = port
		}

		callback(input, error)
	}

	paramConfiguration (input, callback) {
		let error = null

		if (!input.hasOwnProperty('params')) {
			if (!error) {
				return error = new Error('The parameters are not been set.')
			}
		} else {
			if (!input.params.topic) {
				if (!error) {
					error = new Error('The parameter topic has not been set.')
				}
			}
			if (!input.params.payload) {
				if (!error) {
					error = new Error('The parameter payload has not been set.')
				}
			}

			if (![0, 1, 2].includes(input.params.qos)) {
				input.params.qos = 1
			} else {
				input.params.qos.toString()
			}
		}

		callback(input, error)
	}

}

module.exports = new Validate
