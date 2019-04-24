'use strict'

const chai = require('chai')
const expect = chai.expect

const out = require('../src/out.js')
const baseFileDir = process.cwd() + '/spec'
const fixtureInput = require('./fixtures/input.json')

/*
Test behavior

1. Test configuration
    - source: url, password
    - params: message, topic
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

    describe('source configuration', () => {
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

        it('throws an error when username is missing', (done) => {
            delete this.input.source.username

            out(this.input, baseFileDir, (error, result) => {
                expect(error).to.be.not.null
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
        
        it('throws an error when topic is missing', (done) => {
            delete this.input.params.topic
            out(this.input, baseFileDir, (error, result) => {
                expect(error).to.be.not.null
                expect(error).to.exist
                    .and.be.instanceof(Error)
                    .and.have.property('message', 'The parameter topic is not being set.')
                done()
            })
        })

        it('throws an error when message is missing', (done) => {
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
