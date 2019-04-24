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

    if ( ! source.token ) {
        if ( !error ) {
            error = new Error('Token for MQTT broker is not being set.')
        }
    }

    if ( ! params.feed ) {
        if ( !error ) {
            error = new Error('The parameter feed is not being set.')
        }
    }

    if ( ! params.message ) {
        if ( !error ) {
            error = new Error('The parameter message is not being set.')
        }
    }


    callback(error, output)

}
