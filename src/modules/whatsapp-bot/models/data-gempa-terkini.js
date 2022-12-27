var axios = require('axios')

function gempa_terkini() {
  return axios({
    method: 'get',
    url: 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json'
  })
}

module.exports = gempa_terkini