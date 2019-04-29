'use strict'

module.exports = {
	mqtt: (input) => {
		return {
			username: input.source.username,
			password: input.source.password,
			port: input.source.port,
			qos: input.params.qos,
			will: {
				topic: input.source.topic,
				payload: input.params.payload
			}
		}
	}
}
