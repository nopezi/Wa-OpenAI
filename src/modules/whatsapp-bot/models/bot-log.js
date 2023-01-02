const db = require('../../../config/db.js')

function bot_log(val) {
    sql = "INSERT INTO bot_log ("
    sql += `type, `
    sql += `message_id, `
    sql += `user_id, `
    sql += `first_name_user, `
    sql += `message, `
    sql += `jenis_kirim ) `

    sql += ` values (`
    sql += `'whatsapp',`
    sql += `'${val.message_id}',`
    sql += `'${val.user_id}',`
    sql += `'${val.first_name_user}',`
    sql += `'${val.message}',`
    sql += `'${val.jenis_kirim}' )`

    db.query(sql, function(err, result) {
        console.log('[error] ::: ', err)
        console.log('[result] ::: ', result)
    })
}

function bot_bmkg(val) {
    sql = `SELECT * FROM bot_bmkg WHERE user_id = '${val.user_id}' LIMIT 1`
    db.query(sql, function (err, rows) {
        if (err) {
            console.log('[get_bot_bmkg error] :>> ', err)
        } else if(rows == '') {
            sql = "INSERT INTO bot_bmkg ("
            sql += `user_id, `
            sql += `name_user ) `

            sql += ` values (`
            sql += `'${val.user_id}',`
            sql += `'${val.first_name_user}' )`

            db.query(sql, function(err, result) {
                console.log('[error] ::: ', err)
                console.log('[result] ::: ', result)
            })
        }
    })
}

let data_get_bot_bmkg = ''
function get_bot_bmkg(val) {
    sql = `SELECT * FROM bot_bmkg ORDER BY id DESC`
    db.query(sql, function (err, rows) {
        if (err) {
            console.log('[get_bot_bmkg error] :>> ', err)
        } else {
            data_get_bot_bmkg = rows
        }
    })
    return data_get_bot_bmkg
}

module.exports = {
    bot_log,
    bot_bmkg,
    get_bot_bmkg
}