var axios = require('axios')

function hari_ini() {
    return axios({
       method: 'get',
       url: 'http://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia&method=11',
       proxy: {
        protocol: 'http',
        host: '172.20.3.219',
        port: 8080,
        // auth: {
        //   username: 'mikeymike',
        //   password: 'rapunz3l'
        // }
      },
    })

}

module.exports = {
    hari_ini
}