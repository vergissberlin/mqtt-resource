'use strict'

const chai = require('chai')
const expect = chai.expect

const out = require('../src/out.js')
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
describe('out', () => {

	beforeEach((done) => {
		this.configuration = JSON.parse(JSON.stringify(fixtureConfiguration))
		done()
	})

	afterEach((done) => {
		delete this.configuration
		done()
	})
})
