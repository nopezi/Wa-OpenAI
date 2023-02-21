const models = require('../models/index.js')

function jawa_ngoko(body, client, flag) {

    if (!flag && body == '/jawa-ngoko') {

        let pesan = models.jawa(body, 'indojawa')
        client.sendMessage(mek.key.remoteJid, {text: pesan }, mek)

        return true
    }

}

function jawa_alus() {

}

function indo_jawa() {
    
}

module.exports = {
    jawa_ngoko,
    jawa_alus,
    indo_jawa
}