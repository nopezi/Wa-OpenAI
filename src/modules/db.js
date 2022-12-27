var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'us-cdbr-east-02.cleardb.com',
  user: 'b10250d4524049', //
  password: 'd377e116', //
  database: 'heroku_13b21ebb9b93855',
  port: '3306'
})
connection.connect((err) => {
  console.log('Database process')
  if (err) {
    console.log(err)
    return
  }
  console.log('Database connected')
})

module.exports = connection