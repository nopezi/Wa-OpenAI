const gempa = require('./gempa.js')
const gempa_terkini = require('./gempaTerkini.js')
const gempa_dirasakan = require('./gempaDirasakan.js')
const gempa_live = require('./gempaLive.js')
const gempa_crontjob = require('./gempaCrontJob.js')

const controllers = {
    gempa,
    gempa_terkini,
    gempa_dirasakan,
    gempa_live,
    gempa_crontjob,
}

module.exports = controllers