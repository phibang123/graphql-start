require('babel-register')
require('@babel/polyfill/noConflict')
const server = require('../../src/server').default


//This option allows the use of a custom global setup module which exports an async function that is triggered once before all test suites. This function gets Jest's globalConfig object as a parameter.
module.exports = async () => {
    global.httpServer = await server.start({ port: 4000 })
}