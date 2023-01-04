const express = require('express')
const app = express()
const env = require('../config/key.json')
const modules = require('../modules/index.js')

function routers() {
    app.get('/', ((req, res) => {
        modules.bmkg.controllers.gempa_crontjob()
        res.send('masok')
    }))
    
    app.listen(process.env.PORT || env.port_express)

    console.log('[router run] ::: port ', process.env.PORT || env.port_express)
}

module.exports = routers