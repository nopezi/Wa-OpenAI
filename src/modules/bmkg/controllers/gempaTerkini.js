const models = require('../models/index.js')

function gempa_terkini(body, client, flag) {
    if (!flag && body === '/gempa-terkini') {
        console.log('[gempa terkini] ::: ', body)
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
            client.sendMessage(mek.key.remoteJid, {text: pesan }, mek)
        })
        return true
    }
}

module.exports = gempa_terkini