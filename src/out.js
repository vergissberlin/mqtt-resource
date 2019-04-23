'use strict'

const async = require('async')
const debug = require('debug')('mqtt-resource')

module.exports = (input, baseFileDir, callback) => {
    const source = input.source
    const params = input.params

    debug('Searching for issue: %s', input.params.summary)

    if ( issue ) {
        output = {
            version: {
                ref: issue.key
            }
        }
    } else if ( !error ) {
        error = new Error('Could not create issue.')
    }

    callback(error, output)

}
