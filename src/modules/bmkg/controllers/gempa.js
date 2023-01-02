const models = require('../models/index.js')

function gempa(body, client, flag) {
    const data_tempa = models.gempa.gempa_terbaru()

    if (!flag && body == '/gempa') {
        
        data_tempa.then((response) => {
            let pesan = '*Informasi Gempa Terkini dari* \n'
            pesan += 'BMKG (Badan Meteorologi, Klimatologi, dan Geofisika) \n\n'
            pesan += `*Tanggal* : ${response.data.Infogempa.gempa.Tanggal} \n`
            pesan += `*Pukul* : ${response.data.Infogempa.gempa.Jam} \n`
            pesan += `*Wilayah* : ${response.data.Infogempa.gempa.Wilayah} \n`
            pesan += `*Kedalaman* : ${response.data.Infogempa.gempa.Kedalaman} \n`
            pesan += `*Magnitude* : ${response.data.Infogempa.gempa.Magnitude} \n`
            pesan += `*Potensi* : ${response.data.Infogempa.gempa.Potensi} \n`
            pesan += `*Dirasakan* : ${response.data.Infogempa.gempa.Dirasakan} \n\n`
            
            pesan += `*Foto Lokasi* : https://ews.bmkg.go.id/TEWS/data/${response.data.Infogempa.gempa.Shakemap} \n`
    
            client.sendMessage(mek.key.remoteJid, {text: pesan }, mek)
            const coordinates = response.data.Infogempa.gempa.Coordinates.split(",")
            client.sendMessage(mek.key.remoteJid, { location: { degreesLatitude: coordinates[0], degreesLongitude: coordinates[1] } }, mek)
        })

        return true
    } else {
        return false
    }
}

module.exports = gempa