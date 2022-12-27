let env = require('../key.json')
const modules = require('./modules/index.js')

modules.whatsapp.controllers(env)
// modules.whatsapp.models.gempa_terkini()