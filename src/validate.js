'use strict'


class Validate {

	url (string) {
		let regex = /(mqtt|mqtts|tcp|tls|ws|wss):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
		var pattern = new RegExp(regex)
		return pattern.test(string)
	}

	configuration(input, callback)  {

		let error = null

		if ( !input.source.url ) {
			if ( !error ) {
				error = new Error('URL for MQTT broker has not been set.')
			}
		}

		if ( !this.url(input.source.url) ) {
			if ( !error ) {
				error = new Error('Your defined URL is invalid. It should start with mqtt://')
			}
		}

		let port = Number.parseInt(input.source.port)
		if ( Number.isNaN(port) ) {
			input.source.port = 1883
		} else {
			input.source.port = port
		}

		if ( !input.source.username ) {
			if ( !error ) {
				error = new Error('The user name for MQTT broker has not been set.')
			}
		}

		if ( !input.source.password ) {
			if ( !error ) {
				error = new Error('The password for MQTT broker has not been set.')
			}
		}

		if ( !input.source.topic && !input.params.topic ) {
			if ( !error ) {
				error = new Error('The parameter topic has not been set.')
			}
		} else if(input.params) {
			input.source.topic = input.params.topic || input.source.topic
		}


		if ( !input.params ) {
			if ( !error ) {
				error = new Error('The parameters are not been set.')
			}
		} else {
			if ( !input.params.payload ) {
				if ( !error ) {
					error = new Error('The parameter payload has not been set.')
				}
			} else {
				input.params.payload.toString()
			}

			if ( ![0, 1, 2].includes(input.params.qos) ) {
				input.params.qos = 0
			}
		}

		callback(input, error)
	}

}

module.exports = new Validate
