const db = require('../../../config/db.js')

let hasil_cek_gempa_terkini

function cek_gempa_terkini(cek) {
    
    let sql = `SELECT * FROM 
                    gempa_terkini 
                WHERE 
                    shakemap = '${cek.Infogempa.gempa.Shakemap}' 
                AND
                    jam = '${cek.Infogempa.gempa.Jam}'
               ORDER BY 
                id DESC LIMIT 1`
    console.log('[query cek_gempa_terkini] ', sql)
    // db.resume()
    db.query(sql, function (err, rows) {
        if (err) {
          console.log('[cek_gempa_terkini error] :>> ', err)
        } else {
            console.log(rows == [])
            if (rows == '') {
                sql = "INSERT INTO gempa_terkini ("
                sql += `tanggal, `
                sql += `jam, `
                sql += `datetime, `
                sql += `coordinates, `
                sql += `lintang, `
                sql += `bujur, `
                sql += `shakemap) `
                sql += ` values (`
                sql += `'${cek.Infogempa.gempa.Tanggal}',`
                sql += `'${cek.Infogempa.gempa.Jam}',`
                sql += `'${cek.Infogempa.gempa.DateTime}',`
                sql += `'${cek.Infogempa.gempa.Coordinates}',`
                sql += `'${cek.Infogempa.gempa.Lintang}',`
                sql += `'${cek.Infogempa.gempa.Bujur}',`
                sql += `'${cek.Infogempa.gempa.Shakemap}' )`
                console.log('[query insert cek_gempa_terkini] ', sql)
                db.query(sql, function(err, result) {
                    console.log('[error] ::: ', err)
                    console.log('[result] ::: ', result)
                })
                // db.end()
                hasil_cek_gempa_terkini = true
            } else {
                hasil_cek_gempa_terkini = false
            }
        }
      })
    
    console.log('[cek hasil] ', hasil_cek_gempa_terkini)
    return hasil_cek_gempa_terkini
}

function cek_gempa_terkini2(cek, callback) {
    
    let sql = `SELECT * FROM 
                    gempa_terkini 
                WHERE 
                    shakemap = '${cek.Infogempa.gempa.Shakemap}' 
                AND
                    jam = '${cek.Infogempa.gempa.Jam}'
               ORDER BY 
                id DESC LIMIT 1`
    console.log('[query cek_gempa_terkini] ', sql)
    // db.resume()
    db.query(sql, function (err, rows) {
        if (err) {
          console.log('[cek_gempa_terkini error] :>> ', err)
          return callback(false)
        } else {
            console.log(rows == [])
            if (rows == '') {
                sql = "INSERT INTO gempa_terkini ("
                sql += `tanggal, `
                sql += `jam, `
                sql += `datetime, `
                sql += `coordinates, `
                sql += `lintang, `
                sql += `bujur, `
                sql += `shakemap) `
                sql += ` values (`
                sql += `'${cek.Infogempa.gempa.Tanggal}',`
                sql += `'${cek.Infogempa.gempa.Jam}',`
                sql += `'${cek.Infogempa.gempa.DateTime}',`
                sql += `'${cek.Infogempa.gempa.Coordinates}',`
                sql += `'${cek.Infogempa.gempa.Lintang}',`
                sql += `'${cek.Infogempa.gempa.Bujur}',`
                sql += `'${cek.Infogempa.gempa.Shakemap}' )`
                console.log('[query insert cek_gempa_terkini] ', sql)
                db.query(sql, function(err, result) {
                    console.log('[error] ::: ', err)
                    console.log('[result] ::: ', result)
                })
                // db.end()
                hasil_cek_gempa_terkini = true
                return callback(true)
            } else {
                hasil_cek_gempa_terkini = false
                return callback(false)
            }
        }
      })
    
    // console.log('[cek hasil] ', hasil_cek_gempa_terkini)
    // return hasil_cek_gempa_terkini
}

module.exports = {
    cek_gempa_terkini,
    cek_gempa_terkini2
}