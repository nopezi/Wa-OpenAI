const io = require('socket.io-client')
// const socket = io("https://socket-realtime.herokuapp.com")
const socket = io('https://socket-heroku-22.herokuapp.com')

function cobaSocket(data) {
    socket.on('dataServer', (data) => {
        console.log('socket client dataServer ::: ', data)
    })
    socket.emit('dariServer', 'masok dong')
}

module.exports = cobaSocket