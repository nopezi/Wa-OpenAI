const models = require('../models/index.js')
const whatsapp = require('../../whatsapp-bot/index.js')

function gempa_live(body, data, client, flag) {

    if (!flag && body === '/gempa-live') {
        whatsapp.models.db_bot.bot_bmkg({
            user_id: data.user_id,
            first_name_user: data.first_name_user
        })
        // kirim informasi gempa terkini secara live

        setInterval(() => {
            const wa_bmkg = whatsapp.models.db_bot.get_bot_bmkg()
            console.log('[Running setInterval every 5 second ...]')
            
            data_tempa.then((response) => {
                // let cek_kirim = models.db_gempa_terkini.cek_gempa_terkini(response.data)
                let cek_kirim = models.gempa_terkini(response.data)

                let pesan = '*Informasi Gempa Terkini dari* \n'
                pesan += 'BMKG (Badan Meteorologi, Klimatologi, dan Geofisika) \n\n'
                pesan += `*Tanggal* : ${response.data.Infogempa.gempa.Tanggal} \n`
                pesan += `*Pukul* : ${response.data.Infogempa.gempa.Jam} \n`
                pesan += `*Wilayah* : ${response.data.Infogempa.gempa.Wilayah} \n`
                pesan += `*Kedalaman* : ${response.data.Infogempa.gempa.Kedalaman} \n`
                pesan += `*Magnitude* : ${response.data.Infogempa.gempa.Magnitude} \n`
                pesan += `*Potensi* : ${response.data.Infogempa.gempa.Potensi} \n`
                pesan += `*Dirasakan* : ${response.data.Infogempa.gempa.Dirasakan} \n\n`
                
                pesan += `https://ews.bmkg.go.id/TEWS/data/${response.data.Infogempa.gempa.Shakemap} \n`

                if (cek_kirim && wa_bmkg != '') {
                    wa_bmkg.forEach((data) => {
                        if (data.user_id) {
                            client.sendMessage(data.user_id, {text: pesan }, mek)
                            const coordinates = response.data.Infogempa.gempa.Coordinates.split(",")
                            client.sendMessage(data.user_id, { location: { degreesLatitude: coordinates[0], degreesLongitude: coordinates[1] } }, mek)
                            console.log('[send message bot bmkg] ::: ', data.user_id)
                        }
                    })
                }
            })
        }, 10000)

        return true
    }

}

module.exports = gempa_live