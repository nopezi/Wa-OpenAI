const whatsapp = (env) => {
    require("http").createServer((_, res) => res.end("Server Running ::: ... ")).listen(env.po)
    const { default: sansekaiConnect, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto, getContentType } = require("@adiwajshing/baileys")
    const fs = require('fs')
    const chalk = require('chalk')
    const _ = require('lodash')
    const startHisoka = require('./startHisoka.js')

    startHisoka(env)

    let file = require.resolve(__filename)
    fs.watchFile(file, () => {
        fs.unwatchFile(file)
        console.log(chalk.redBright(`Update ${__filename}`))
        delete require.cache[file]
        require(file)
    })

}

module.exports = whatsapp