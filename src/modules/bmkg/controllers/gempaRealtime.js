const models = require('../models/index.js')
const whatsapp = require('../../whatsapp-bot/index.js')
const io = require('socket.io-client')
const socket = io('https://socket-heroku-22.herokuapp.com')

function cek_gempa_realtime() {

    const data_gempa = models.gempa.gempa_terbaru()
    console.log('[Running setInterval every 5 second ...]')
    
    data_gempa.then(async (response) => {
        await models.gempa_terkini.cek_gempa_terkini2(response.data, async function(cek_kirim) {
            console.log('cek data ::: ', cek_kirim)
            await whatsapp.models.db_bot.get_bot_bmkg2('', function(wa_bmkg){
                if (cek_kirim) {
                    kirim_gempa_realtime(response, wa_bmkg)
                }
            })
        })
    })

}

function kirim_gempa_realtime(response, wa_bmkg) {

    // const wa_bmkg = whatsapp.models.db_bot.get_bot_bmkg()

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
        const coordinates = response.data.Infogempa.gempa.Coordinates.split(",")

    if (wa_bmkg) {
        const kirim = {
            wa_bmkg: wa_bmkg,
            pesan: pesan,
            degreesLatitude: coordinates[0], 
            degreesLongitude: coordinates[1]
        }
        console.log('[kirim socket] ::: ')
        socket.emit('dariServer', kirim)
    }

    

}

module.exports = cek_gempa_realtime