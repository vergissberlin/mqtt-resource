module.exports = {
	mqtt: (input) => {
		return {
			username: input.source.username,
			password: input.source.password,
			port: input.source.port,
			qos: 2
		}
	}
}
