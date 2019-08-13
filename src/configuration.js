module.exports = {
	mqtt: (input) => {
		return {
			username: input.source.username || null,
			password: input.source.password || null,
			port: input.source.port || 1883,
			clientId: 'concourse-ci',
			qos: 1
		}
	}
}
