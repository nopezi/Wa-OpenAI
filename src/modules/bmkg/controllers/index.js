const gempa = require('./gempa.js')
const gempa_terkini = require('./gempaTerkini.js')
const gempa_dirasakan = require('./gempaDirasakan.js')
const gempa_live = require('./gempaLive.js')
const gempa_crontjob = require('./gempaCrontJob.js')
const gempa_realtime = require('./gempaRealtime.js')

const controllers = {
    gempa,
    gempa_terkini,
    gempa_dirasakan,
    gempa_live,
    gempa_crontjob,
    gempa_realtime,
}

module.exports = controllers