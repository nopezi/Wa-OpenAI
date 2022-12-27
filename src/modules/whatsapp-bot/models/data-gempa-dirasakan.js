var axios = require('axios')

function gempa_dirasakan() {
  return axios({
    method: 'get',
    url: 'https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json'
  })
}

module.exports = gempa_dirasakan