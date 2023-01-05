const express = require('express')
const app = express()
const env = require('../config/key.json')
const modules = require('../modules/index.js')

const io = require('socket.io-client')
const socket = io('https://socket-heroku-22.herokuapp.com')

function routers() {
    app.get('/', ((req, res) => {
        // modules.bmkg.controllers.gempa_crontjob()
        socket.emit('dariServer', 'masok dari routers')
        
        res.send('index')
    }))

    app.get('/gempa-realtime', ((req, res) => {
        modules.bmkg.controllers.gempa_realtime()
        res.json({
            status: true
        })
    }))
    
    app.listen(process.env.PORT || env.port_express)

    console.log('[router run] ::: port ', process.env.PORT || env.port_express)
}

module.exports = routers