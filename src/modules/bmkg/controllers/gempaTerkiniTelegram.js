const models = require('../models/index.js')
const telegram = require("../../../modules/telegram/index.js")

function gempa_terkini_telegram(body, userId, flag) {
    console.log('masok ', body)
    if(body == '/gempa-terkini') {
        const terkini = models.gempa.gempa_terkini()
        terkini.then((result) => {
            let pesan = '*Informasi Gempa Terkini dari* \n'
                pesan += '*BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)* \n\n'
            result.data.Infogempa.gempa.forEach((data) => {
                    pesan += `*Tanggal* : ${data.Tanggal} \n`
                    pesan += `*Pukul* : ${data.Jam} \n`
                    pesan += `*Wilayah* : ${data.Wilayah} \n`
                    pesan += `*Kedalaman* : ${data.Kedalaman} \n`
                    pesan += `*Magnitude* : ${data.Magnitude} \n`
                    pesan += `*Potensi* : ${data.Potensi} \n`
                    pesan += `*lokasi map* : https://www.google.com/maps/search/${data.Coordinates}\n\n`
                    pesan += `==============\n\n`
            })
            telegram.telegramController.sendMessage(userId, pesan, null)
            // client.sendMessage(client, {text: pesan }, mek)
        })
        return true
    } else {
        return false
    }
}

module.exports = gempa_terkini_telegram