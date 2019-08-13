'use strict'

const chai = require('chai')
const expect = chai.expect

const validate = require('../src/validate.js')
const fixtureConfiguration = require('./fixtures/configuration/defaults.json')

/**
 * Test behavior
 *
 * 1. Test sourceConfiguration
 * - source: url, password
 * - params: payload, topic
 * 2. Test to send payloads
 * 3. Test callback to send status
 */
describe('validate', () => {

	beforeEach((done) => {
		this.configuration = JSON.parse(JSON.stringify(fixtureConfiguration))
		done()
	})

	afterEach((done) => {
		delete this.configuration
		done()
	})

	describe('url', () => {
		it('validate url with protocol protocol.', (done) => {
			let url = 'mybroker.eu'
			expect(validate.url(url)).to.be.false
			done()
		})
		it('validate url wich is not start with protocol \'mqtt\', \'mqtts\', \'tcp\', \'tls\', \'ws\' or \'wss\'.', (done) => {
			let url = 'http://mybroker.eu'
			expect(validate.url(url)).to.be.false
			done()
		})
		it('validate url wich is start with mqtt.', (done) => {
			let url = 'mqtt://mybroker.eu'
			expect(validate.url(url)).to.be.true
			done()
		})
	})

	describe('source sourceConfiguration', () => {
		it('throws an error when url is missing', (done) => {
			delete this.configuration.source.url
			validate.sourceConfiguration(this.configuration, (input, error) => {
				expect(error).to.exist
					.and.be.instanceof(Error)
					.and.have.property('message', 'URL for MQTT broker has not been set.')
				done()
			})
		})

		it('set default port when port is not set', (done) => {
			delete this.configuration.source.port
			validate.sourceConfiguration(this.configuration, (input, error) => {
				expect(error).to.be.null
				expect(input.source.port).to.be.equal(1883)
				done()
			})
		})

		it('set default port when port is not a number', (done) => {
			this.configuration.source.port = 'holy cow'
			validate.sourceConfiguration(this.configuration, (input, error) => {
				expect(error).to.be.null
				expect(input.source.port).to.be.equal(1883)
				done()
			})
		})

		it('set port from sourceConfiguration even when it is a string', (done) => {
			this.configuration.source.port = '144'
			validate.sourceConfiguration(this.configuration, (input, error) => {
				expect(error).to.be.null
				expect(input.source.port).to.be.equal(144)
				done()
			})
		})

		it('set port from sourceConfiguration even when it is a string', (done) => {
			this.configuration.source.port = 144
			validate.sourceConfiguration(this.configuration, (input, error)=> {
				expect(error).to.be.null
				expect(input.source.port).to.be.equal(144)
				done()
			})
		})
	})

	describe('parameter sourceConfiguration', () => {
		it('throws an error when topic is missing', (done) => {
			delete this.configuration.params.topic
			validate.paramConfiguration(this.configuration, (input, error) => {
				expect(error).to.exist
					.and.be.instanceof(Error)
					.and.have.property('message', 'The parameter topic has not been set.')
				done()
			})
		})

		it('throws an error when payload is missing', (done) => {
			delete this.configuration.params.payload
			validate.paramConfiguration(this.configuration, (input, error) => {
				expect(error).to.exist
					.and.be.instanceof(Error)
					.and.have.property('message', 'The parameter payload has not been set.')
				done()
			})
		})

		it('converts payload also to strings', (done) => {
			this.configuration.params.payload = 1.2
			validate.paramConfiguration(this.configuration, (input, error) => {
				expect(error).to.not.exist
				expect(input.params.payload).to.be.string
				done()
			})
		})

		it('sets default value for qos to 2', (done) => {
			delete this.configuration.params.qos
			validate.paramConfiguration(this.configuration, (input, error) => {
				console.log(input.params.qos)
				expect(error).to.be.null
				expect(input.params.qos).to.be.equal(1)
				done()
			})
		})

		it('sets default value if it is out of range', (done) => {
			this.configuration.params.qos = 12
			validate.paramConfiguration(this.configuration, (input, error) => {
				console.log(input.params.qos)
				expect(error).to.be.null
				expect(input.params.qos).to.be.equal(1)
				done()
			})
		})

		it('keeps the value for qos', (done) => {
			validate.paramConfiguration(this.configuration, (input, error) => {
				expect(error).to.be.null
				expect(input.params.qos).to.be.equal(1)
				done()
			})
		})
	})
})
