'use strict'

const chai = require('chai')
const expect = chai.expect

const out = require('../src/out.js')
const baseFileDir = process.cwd() + '/spec'
const fixtureInput = require('./fixtures/input.json')

/**
 * Test behavior
 *
 * 1. Test configuration
 * - source: url, password
 * - params: message, topic
 * 2. Test to send messages
 * 3. Test callback to send status
 */
describe('mqtt out', () => {

	beforeEach((done) => {
		this.input = JSON.parse(JSON.stringify(fixtureInput))
		done()
	})

	afterEach((done) => {
		delete this.input
		done()
	})

	describe('source configuration', () => {
		it('throws an error when url is missing', (done) => {
			delete this.input.source.url

			out(this.input, baseFileDir, (error, result) => {
				expect(error).to.exist
					.and.be.instanceof(Error)
					.and.have.property('message', 'URL for MQTT broker is not being set.')
				done()
			})
		})

		it('set default port when port is not set', (done) => {
			delete this.input.source.port

			out(this.input, baseFileDir, (error, result, source, params) => {
				expect(error).to.be.null
				expect(source.port).to.be.equal(1883)
				done()
			})
		})

		it('set default port when port is not a number', (done) => {
			this.input.source.port = 'holy cow'

			out(this.input, baseFileDir, (error, result, source, params) => {
				expect(error).to.be.null
				expect(source.port).to.be.equal(1883)
				done()
			})
		})

		it('set port from configuration even when it is a string', (done) => {
			this.input.source.port = '144'

			out(this.input, baseFileDir, (error, result, source, params) => {
				expect(error).to.be.null
				expect(source.port).to.be.equal(144)
				done()
			})
		})

		it('set port from configuration even when it is a string', (done) => {
			this.input.source.port = 144

			out(this.input, baseFileDir, (error, result, source, params) => {
				expect(error).to.be.null
				expect(source.port).to.be.equal(144)
				done()
			})
		})

		it('throws an error when username is missing', (done) => {
			delete this.input.source.username

			out(this.input, baseFileDir, (error, result) => {
				expect(error).to.exist
					.and.be.instanceof(Error)
					.and.have.property('message', 'username for MQTT broker is not being set.')
				done()
			})
		})

		it('throws an error when password is missing', (done) => {
			delete this.input.source.password

			out(this.input, baseFileDir, (error, result) => {
				expect(error).to.be.not.null
				expect(error).to.exist
					.and.be.instanceof(Error)
					.and.have.property('message', 'password for MQTT broker is not being set.')
				done()
			})
		})

	})

	describe('parameter configuration', () => {
		it('throws an error when message is missing', (done) => {
			delete this.input.params.message
			out(this.input, baseFileDir, (error, result) => {
				expect(error).to.exist
					.and.be.instanceof(Error)
					.and.have.property('message', 'The parameter message is not being set.')
				done()
			})
		})

		it('sets default value for qos to 0', (done) => {
			delete this.input.params.qos
			out(this.input, baseFileDir, (error, result, source, params) => {
				expect(error).to.be.null
				expect(params.qos).to.be.equal(0)
				done()
			})
		})
	})
	describe('override configuration', () => {

		it('is possible to override the topics with params', (done) => {
			out(this.input, baseFileDir, (error, result, source, params) => {
				expect(error).to.be.null
				expect(source.topic).to.be.equal('override/topic/from/params')
				done()
			})
		})

		it('is possible to set topic as source only', (done) => {
			delete this.input.params.topic
			out(this.input, baseFileDir, (error, result, source, params) => {
				expect(error).to.be.null
				expect(source.topic).to.be.equal('topic/from/source')
				done()
			})
		})
		it('is possible to set topic as param only', (done) => {
			delete this.input.source.topic
			out(this.input, baseFileDir, (error, result, source, params) => {
				expect(error).to.be.null
				expect(source.topic).to.be.equal('override/topic/from/params')
				done()
			})
		})

	})
})
