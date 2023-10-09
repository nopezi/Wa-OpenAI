var mysql = require('mysql')
var dbConf = {
  // host: 'us-cdbr-east-02.cleardb.com',
  // user: 'b10250d4524049', //
  // password: 'd377e116', //
  // database: 'heroku_13b21ebb9b93855',
  // port: '3306',
  host: '0.tcp.ap.ngrok.io',
  user: 'root', //
  password: '', //
  database: 'bot',
  port: '11506',
}
// var connection = mysql.createConnection()
// connection.connect((err) => {
//   if (err) {
//     console.log(err)
//     console.log('Database close')
//     return
//   }
//   console.log('Database connected')
// })

var pool = mysql.createPool(dbConf)

pool.on('connection', function(_conn) {
  if (_conn) {
      console.log('Connected the database via threadId %d!! ', _conn.threadId);
      _conn.query('SET SESSION auto_increment_increment=1');
  }
})

module.exports = pool