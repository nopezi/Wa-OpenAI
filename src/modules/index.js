const whatsapp = require('./whatsapp-bot/index.js')
const bmkg = require('./bmkg/index.js')
const socket = require('./socket.io/index.js')
const islamic = require('./islamic/index.js')
const bahasa = require('./bahasa/index.js')

module.exports = {
    whatsapp,
    bmkg,
    socket,
    islamic,
    bahasa
}