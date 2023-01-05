const whatsapp = require('./whatsapp-bot/index.js')
const bmkg = require('./bmkg/index.js')
const socket = require('./socket.io/index.js')

module.exports = {
    whatsapp,
    bmkg,
    socket
}