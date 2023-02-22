const models = require('../models/index.js')

function jawa_ngoko(body, client, flag) {

    const pesanArray = body.split(" ")
    const pesanMasuk = body.replace(pesanArray[0], "")

    if (!flag && pesanArray[0] == '/jawa-ngoko') {

        let pesan = models.jawa(pesanMasuk, 'indojawa')
        client.sendMessage(mek.key.remoteJid, {text: pesan }, mek)

        return true
    }

}

function jawa_alus(body, client, flag) {

    const pesanArray = body.split(" ")
    const pesanMasuk = body.replace(pesanArray[0], "")

    if (!flag && pesanArray[0] == '/jawa-halus') {

        let pesan = models.jawa(pesanMasuk, 1)
        client.sendMessage(mek.key.remoteJid, {text: pesan }, mek)

        return true
    }

}

function jawa_indo(body, client, flag) {

    const pesanArray = body.split(" ")
    const pesanMasuk = body.replace(pesanArray[0], "")

    if (!flag && pesanArray[0] == '/indo-jawa') {

        let pesan = models.jawa(pesanMasuk, 'jawaindo')
        client.sendMessage(mek.key.remoteJid, {text: pesan }, mek)

        return true
    }

}

module.exports = {
    jawa_ngoko,
    jawa_alus,
    jawa_indo
}