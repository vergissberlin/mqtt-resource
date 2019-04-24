'use strict'

module.exports = (input, baseFileDir, callback) => {
    const source = input.source
    const params = input.params
    let error = null
    let output = null

    if ( ! source.url ) {
        if ( !error ) {
            error = new Error('URL for MQTT broker is not being set.')
        }
    }

    if ( ! source.username ) {
        if ( !error ) {
            error = new Error('username for MQTT broker is not being set.')
        }
    }

    if ( ! source.password ) {
        if ( !error ) {
            error = new Error('password for MQTT broker is not being set.')
        }
    }

    if ( ! params.topic ) {
        if ( !error ) {
            error = new Error('The parameter topic is not being set.')
        }
    }

    if ( ! params.message ) {
        if ( !error ) {
            error = new Error('The parameter message is not being set.')
        }
    }

    callback(error, output)

}
