const telegram = require("./telegram.js");

function help(body, userId, flag) {

    if (!flag && body == '/help' || !flag && body == '/start') {

        // client.sendPresenceUpdate('unavailable')
        
        // let pesan = 'yah ketahuan deh wa ane ada bot nya \n'
        //     pesan += 'ydah deh, ane kasih tau kata chat apa aja yang di sediakan di bot ane yak \n\n'
        //     telegram.sendMessage(userId, pesan, null)

        let pesan2 = '/help : **untuk memunculkan list komen bot** \n'
            pesan2 += '/gempa : **untuk menampilkan data gempa terbaru** \n\n'
            pesan2 += '/gempa-live : **untuk menampilkan data gempa secara realtime dan terus menerus** \n\n'
            pesan2 += '/gempa-terkini : **untuk menampilkan data gempa terkini dari yang tidak dirasakan, hingga di rasakan** \n\n'
            pesan2 += '/gempa-dirasakan : **untuk menampilkan data gempa terbaru yang dirasakan saja** \n\n'
            pesan2 += '/bot spaci kalimat : **untuk mengirim chat apapun, yang akan di balas oleh open ai** \n\n'
            pesan2 += '/jawa-ngoko : **menerjemahkan bahasa indonesia ke bahasa jawa ngoko** \n\n'
            pesan2 += '/jawa-halus : **menerjemahkan bahasa indonesia ke bahasa jawa krama halus** \n\n'
            pesan2 += '/indo-jawa : **menerjemahkan bahasa jawa ke bahasa indonesia** \n\n'
            pesan2 += 'contoh : /bot kapan saya menikah \n\n'
    
            telegram.sendMessage(userId, pesan2, null)
            return true

    }

}

module.exports = help