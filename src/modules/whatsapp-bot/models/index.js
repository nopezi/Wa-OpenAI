const gempa_terkini = require('./data-gempa-terkini.js')
const gempa_dirasakan = require('./data-gempa-dirasakan.js')
const gempa = require('./gempa.js')

const db_gempa_terkini = require('./db-data-gempa-terkini.js')

const models = {
    gempa,
    gempa_terkini,
    gempa_dirasakan,
    db_gempa_terkini
}

module.exports = models