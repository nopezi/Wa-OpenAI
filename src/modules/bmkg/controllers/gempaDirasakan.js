const models = require('../models/index.js')
const telegram = require("../../../modules/telegram/index.js");

function gempa_dirasakan(body, client, flag) {
    if (!flag && body === '/gempa-dirasakan') {
        console.log('[gempa dirasakan] ::: ', body)
        const dirasakan = models.gempa.gempa_dirasakan()
        dirasakan.then((result) => {
            let pesan = '*Informasi Gempa Yang Dirasakan dari* \n'
                pesan += 'BMKG (Badan Meteorologi, Klimatologi, dan Geofisika) \n\n'
            result.data.Infogempa.gempa.forEach((data) => {
                    pesan += `*Tanggal* : ${data.Tanggal} \n`
                    pesan += `*Pukul* : ${data.Jam} \n`
                    pesan += `*Wilayah* : ${data.Wilayah} \n`
                    pesan += `*Kedalaman* : ${data.Kedalaman} \n`
                    pesan += `*Dirasakan* : ${data.Dirasakan} \n`
                    pesan += `*Magnitude* : ${data.Magnitude} \n`
                    pesan += `*lokasi map* : https://www.google.com/maps/search/${data.Coordinates} \n\n`
                    pesan += `==============\n\n`
            })
            client.sendMessage(mek.key.remoteJid, {text: pesan }, mek)
        })
        return true
    }
}

function gempa_dirasakan_telegram(body, userId, flag) {
    if (!flag && body === '/gempa-dirasakan') {
        console.log('[gempa dirasakan] ::: ', body)
        const dirasakan = models.gempa.gempa_dirasakan()
        dirasakan.then((result) => {
            let pesan = '*Informasi Gempa Yang Dirasakan dari* \n'
                pesan += 'BMKG (Badan Meteorologi, Klimatologi, dan Geofisika) \n\n'
            telegram.telegramController.sendMessage(userId, pesan, null)
                pesan = ''
            result.data.Infogempa.gempa.forEach((data) => {
                    pesan += `**Tanggal** : ${data.Tanggal} \n`
                    pesan += `**Pukul** : ${data.Jam} \n`
                    pesan += `**Wilayah** : ${data.Wilayah} \n`
                    pesan += `**Kedalaman** : ${data.Kedalaman} \n`
                    pesan += `**Dirasakan** : ${data.Dirasakan} \n`
                    pesan += `**Magnitude** : ${data.Magnitude} \n`
                    pesan += `**lokasi map** : https://www.google.com/maps/search/${data.Coordinates} \n\n`
                    pesan += `==============\n\n`
                    telegram.telegramController.sendMessage(userId, pesan, null)
                    pesan = ''
            })
            
        })
        return true
    }
}

module.exports = {gempa_dirasakan, gempa_dirasakan_telegram}