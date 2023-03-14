const { default: sansekaiConnect, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto, getContentType } = require("@adiwajshing/baileys")
const pino = require('pino')
const figlet = require('figlet')

const { Boom } = require('@hapi/boom')

const smsg = require('./smsg.js')
const color = require('./color.js')

const sessionName = 'nopezi'
const donet = 'https://saweria.co/sansekai'
const owner = ['6287878817169']

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

const models = require('../models/index.js')
const bmkg = require('../../bmkg/index.js')
const whatsapp = require('../controllers/index.js')
const modules = require('../../index.js')

let flag = false

const cron = require('node-cron');

async function startHisoka(setting) {
    const { state, saveState } = useSingleFileAuthState(`./${setting.sessionName}.json`)
    const { version, isLatest } = await fetchLatestBaileysVersion()
	console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)
    console.log(color(figlet.textSync('Wa-OpenAI', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		whitespaceBreak: false
	}), 'green'))

    const client = sansekaiConnect({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        browser: ['Wa-OpenAI - Sansekai','Safari','3.0'],
        auth: state
    })

    store.bind(client.ev)

    client.ev.on('messages.upsert', async chatUpdate => {
        //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
            mek = chatUpdate.messages[0]
            // console.log('[data mek] ::: ', mek)
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return
            if (!client.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
            m = smsg(client, mek, store)

            var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''

            models.db_bot.bot_log({
                message_id: mek.key.id,
                user_id: mek.key.remoteJid,
                first_name_user: m.pushName,
                message: body,
                jenis_kirim: (mek.key.fromMe) ? 'di kirim' : 'di terima'
            })

            flag = bmkg.controllers.gempa(body, client, flag)
            flag = bmkg.controllers.gempa_terkini(body, client, flag)
            flag = bmkg.controllers.gempa_dirasakan(body, client, flag)
            flag = modules.bahasa.controllers.jawa.jawa_ngoko(body, client, flag)
            flag = modules.bahasa.controllers.jawa.jawa_alus(body, client, flag)
            flag = modules.bahasa.controllers.jawa.jawa_indo(body, client, flag)
            flag = whatsapp.help(body, client, flag)
            // flag = bmkg.controllers.gempa_live(body, {
            //             user_id: mek.key.remoteJid,
            //             first_name_user: m.pushName
            //         }, client, flag)
            flag = (body === '/gempa-live') ? bmkg.controllers.gempa_crontjob.daftar({ user_id: mek.key.remoteJid, first_name_user: m.pushName }, client) : false
            require("./sansekai")(client, m, chatUpdate, store, setting, flag)

        } catch (err) {
            console.log(err)
        }
    })
	
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
    
    // Setting
    client.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    
    client.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = client.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
        }
    })

    client.getName = (jid, withoutContact  = false) => {
        id = client.decodeJid(jid)
        withoutContact = client.withoutContact || withoutContact 
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = client.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === client.decodeJid(client.user.id) ?
        client.user :
            (store.contacts[id] || {})
            return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    
    client.setStatus = (status) => {
        client.query({
            tag: 'iq',
            attrs: {
                to: '@s.whatsapp.net',
                type: 'set',
                xmlns: 'status',
            },
            content: [{
                tag: 'status',
                attrs: {},
                content: Buffer.from(status, 'utf-8')
            }]
        })
        return status
    }
	
    client.public = true

    client.serializeM = (m) => smsg(client, m, store)
    client.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update	    
        if (connection === 'close') {
            console.log('cek DisconnectReason ', DisconnectReason)
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); process.exit(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); startHisoka(setting); } 
            else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); startHisoka(setting); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); process.exit(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Delete Session file yusril.json and Scan Again.`); process.exit(); }
            else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); startHisoka(setting); }
            else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); startHisoka(setting); }
            else { console.log(`Unknown DisconnectReason: ${reason}|${connection}`); startHisoka(setting); }
        } else if(connection === 'open') {
            console.log('Bot conneted to server')
            // client.sendMessage(owner+'@s.whatsapp.net', { text: `Bot started!\n\njangan lupa support ya bang :)\n${donet}` })
            kirim_socket(client)
        }
        // console.log('Connected...', update)
    })

    client.ev.on('creds.update', saveState)

    client.sendText = (jid, text, quoted = '', options) => client.sendMessage(jid, { text: text, ...options }, { quoted })

    client.cMod = (jid, copy, text = '', sender = client.user.id, options = {}) => {
        //let copy = message.toJSON()
		let mtype = Object.keys(copy.message)[0]
		let isEphemeral = mtype === 'ephemeralMessage'
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
		let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
		else if (content.caption) content.caption = text || content.caption
		else if (content.text) content.text = text || content.text
		if (typeof content !== 'string') msg[mtype] = {
			...content,
			...options
        }
        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
		else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
		copy.key.remoteJid = jid
		copy.key.fromMe = sender === client.user.id

        return proto.WebMessageInfo.fromObject(copy)
    }

    return client
}

const io  = require("socket.io-client")
const socket = io('https://socket-heroku-22.herokuapp.com')

function kirim_socket(client) {
    socket.on('dataServer', (args) => {
        console.log('terima kirim_socket :: ', args)
        let pesan = ''
        if (args.wa_bmkg) {
            args.wa_bmkg.forEach((data) => {
                if (data.user_id) {
                          pesan = `${data.name_user} \n\n`
                          pesan += args.pesan
                    client.sendMessage(data.user_id, {text: pesan })
                    client.sendMessage(data.user_id, { 
                        location: { 
                            degreesLatitude: args.degreesLatitude, 
                            degreesLongitude: args.degreesLongitude 
                        } 
                    })
                    console.log('[send message bot bmkg] ::: ', data.user_id)
                }
            })
        }
    })
}

module.exports = startHisoka