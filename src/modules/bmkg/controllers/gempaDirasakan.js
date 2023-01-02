const models = require('../models/index.js')

function gempa_dirasakan(body, client, flag) {
    if (!flag && body === '/gempa-dirasakan') {
        
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

module.exports = gempa_dirasakan