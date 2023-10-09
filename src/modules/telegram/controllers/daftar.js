const telegram = require("./telegram.js");
const whatsapp = require("../../whatsapp-bot/index.js")

async function daftar(data, body) {

    console.log('[daftar] ::: ', body)
    if (body == "/gempa-live") {
        console.log('function daftar')
        await whatsapp.models.db_bot.bot_bmkg({
            user_id: data.user_id,
            first_name_user: data.first_name_user
        }, function(callback){
            console.log('[daftar] ::: ', callback)
            if (callback) {
                const pesan = 'Terima kasih, anda akan mendapatkan informasi dari kami secara live, jika terjadi gempa bumi yang dapat di rasakan di seluruh wilayah indonesia'
                telegram.sendMessage(data.user_id, pesan, null)
            } else {
                let pesan = 'mohon maaf, whatsapp anda telah terdaftar di database kami \n\n'
                pesan += 'anda akan mendapatkan informasi dari kami secara live, jika terjadi gempa bumi yang dapat di rasakan di seluruh wilayah indonesia'
                telegram.sendMessage(data.user_id, pesan, null)
            }
        })

        return true
    } else {
        return false
    }

}

module.exports = daftar