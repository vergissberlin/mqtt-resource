'use strict'

const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-integer'))
chai.use(require('chai-string'))

const configuration = require('../src/configuration.js')
const fixtureInput = require('./fixtures/input.json')

/**
 * Test behavior
 *
 * 1. Test configuration
 * - source: url, password
 * - params: payload, topic
 * 2. Test to send payloads
 * 3. Test callback to send status
 */
describe('configuration', () => {

	describe('MQTT', () => {
		let mqttConfig = configuration.mqtt(JSON.parse(JSON.stringify(fixtureInput)))
		it('has all properties defined', (done) => {
			expect(mqttConfig.username).to.not.be.undefined
			expect(mqttConfig.password).to.not.be.undefined
			expect(mqttConfig.port).to.not.be.undefined
			expect(mqttConfig.qos).to.not.be.undefined
			expect(mqttConfig.will.topic).to.not.be.undefined
			expect(mqttConfig.will.payload).to.not.be.undefined
			done()
		})
		it('has the username as string', (done) => {
			expect(mqttConfig.username).to.have.string('yourusername')
			done()
		})
		it('has the password as string', (done) => {
			expect(mqttConfig.password).to.have.string('yourpassword')
			done()
		})
		it('has the port as integer', (done) => {
			expect(mqttConfig.port).to.be.integer()
			done()
		})
		it('has the qos as integer', (done) => {
			expect(mqttConfig.qos).to.be.integer()
			done()
		})
	})

})
