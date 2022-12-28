const gempa = require('./gempa.js')
const db_gempa_terkini = require('./db-data-gempa-terkini.js')
const db_bot = require('./bot-log.js')

const models = {
    gempa,
    db_gempa_terkini,
    db_bot
}

module.exports = models