const models = require('../models/index.js')

function jawa_ngoko(body, client, flag) {

    const pesanArray = body.split(" ")
    const pesan = body.replace(pesanArray[0], "")

    if (!flag && pesanArray[0] == '/jawa-ngoko') {

        let pesan = models.jawa(pesan, 'indojawa')
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