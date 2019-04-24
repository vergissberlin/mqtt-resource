'use strict'

const chai = require('chai')
const expect = chai.expect

const out = require('../src/out.js')
const baseFileDir = process.cwd() + '/spec'
const fixtureInput = require('./fixtures/input.json')

/*
Test behavior

1. Test configuration
    - source: url, token
    - params: message, feed
2. Test to send messages
3. Test callback to send status
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

    describe('configuration', () => {
        it('throws an error when url is missing', (done) => {
            delete this.input.source.url

            out(this.input, baseFileDir, (error, result) => {
               expect(error).to.be.not.null
                expect(error).to.exist
                    .and.be.instanceof(Error)
                    .and.have.property('message', 'URL for MQTT broker is not being set.')
                done()
            })
        })

        it('throws an error when token is missing', (done) => {
            delete this.input.source.token

            out(this.input, baseFileDir, (error, result) => {
                expect(error).to.be.not.null
                expect(error).to.exist
                    .and.be.instanceof(Error)
                    .and.have.property('message', 'Token for MQTT broker is not being set.')
                done()
            })
        })

        it('throws an error when parameter feed is missing', (done) => {
            delete this.input.params.feed
            out(this.input, baseFileDir, (error, result) => {
                expect(error).to.be.not.null
                expect(error).to.exist
                    .and.be.instanceof(Error)
                    .and.have.property('message', 'The parameter feed is not being set.')
                done()
            })
        })

        it('throws an error when parameter message is missing', (done) => {
            delete this.input.params.message
            out(this.input, baseFileDir, (error, result) => {
                expect(error).to.be.not.null
                expect(error).to.exist
                    .and.be.instanceof(Error)
                    .and.have.property('message', 'The parameter message is not being set.')
                done()
            })
        })

    })
})
