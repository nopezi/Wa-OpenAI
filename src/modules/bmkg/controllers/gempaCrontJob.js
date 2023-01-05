const models = require('../models/index.js')
const whatsapp = require('../../whatsapp-bot/index.js')

const pino = require('pino')
const { Boom } = require('@hapi/boom')

const { default: sansekaiConnect, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto, getContentType } = require("@adiwajshing/baileys")
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

function kirim(data, client) {

    whatsapp.models.db_bot.bot_bmkg({
        user_id: data.user_id,
        first_name_user: data.first_name_user
    })

    const data_gempa = models.gempa.gempa_terbaru()

    data_gempa.then( async(response) => {

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

        // let cek_kirim = await models.gempa_terkini.cek_gempa_terkini(response.data)

        setInterval(async () => {

            console.log('[Running setInterval every 5 second ...] ')
            await models.gempa_terkini.cek_gempa_terkini2(response.data, async function(cek_kirim) {
                console.log('cek data ::: ', cek_kirim)
                await whatsapp.models.db_bot.get_bot_bmkg2('', function(wa_bmkg){
                    if (cek_kirim) {
                        wa_bmkg.forEach((data, key) => {
                            if (data.user_id) {
                                client.sendMessage(data.user_id, {text: pesan })
                                const coordinates = response.data.Infogempa.gempa.Coordinates.split(",")
                                client.sendMessage(data.user_id, { location: { degreesLatitude: coordinates[0], degreesLongitude: coordinates[1] } })
                                console.log('[send message bot bmkg] ::: ', data.user_id)
                            }
                        })
                    }

                })
            })

        }, 10000)
        
    })

}

async function gempa_cronjob() {

    const setting = require('../../../config/key.json')
    const { state, saveState } = useSingleFileAuthState(`./${setting.sessionName}.json`)
    const { version, isLatest } = await fetchLatestBaileysVersion()
	console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)

    const client = sansekaiConnect({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        browser: ['Wa-OpenAI - Sansekai','Safari','3.0'],
        auth: state
    })

    store.bind(client.ev)

    // Handle error
    const unhandledRejections = new Map()
    process.on('unhandledRejection', (reason, promise) => {
        unhandledRejections.set(promise, reason)
        console.log('Unhandled Rejection at:', promise, 'reason:', reason)
    })
    process.on('rejectionHandled', (promise) => {
        unhandledRejections.delete(promise)
    })
    process.on('Something went wrong', function(err) {
        console.log('Caught exception: ', err)
    })

    client.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update	    
        if (connection === 'close') {
            console.log('cek DisconnectReason ', DisconnectReason)
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); process.exit(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); startHisoka(); } 
            else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); startHisoka(); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); process.exit(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Delete Session file yusril.json and Scan Again.`); process.exit(); }
            else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); startHisoka(); }
            else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); startHisoka(); }
            else { console.log(`Unknown DisconnectReason: ${reason}|${connection}`); startHisoka(); }
        } else if(connection === 'open') {
            console.log('Bot conneted to server')
            kirim(client)
        }
    })

    return client
}

async function daftar(data, client) {

    console.log('[daftar] ::: ')
    await whatsapp.models.db_bot.bot_bmkg({
        user_id: data.user_id,
        first_name_user: data.first_name_user
    }, function(callback){
        console.log('[daftar] ::: ', callback)
        if (callback) {
            const pesan = 'Terima kasih, anda akan mendapatkan informasi dari kami secara live, jika terjadi gempa bumi yang dapat di rasakan di seluruh wilayah indonesia'
            client.sendMessage(data.user_id, {text:  pesan})
        } else {
            let pesan = 'mohon maaf, whatsapp anda telah terdaftar di database kami \n\n'
            pesan += 'anda akan mendapatkan informasi dari kami secara live, jika terjadi gempa bumi yang dapat di rasakan di seluruh wilayah indonesia'
            client.sendMessage(data.user_id, {text:  pesan})
        }
    })

}

module.exports = {gempa_cronjob, kirim, daftar}