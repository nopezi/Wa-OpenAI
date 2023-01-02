let env = require('../config/key.json')
const modules = require('./modules/index.js')

modules.whatsapp.controllers(env)