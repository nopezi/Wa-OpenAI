var axios = require('axios')

function gempa_dirasakan() {
  return axios({
    method: 'get',
    url: 'https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json'
  })
}

function gempa_terbaru() {
  return axios({
      method: 'get',
      url: 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json'
  })
}

function gempa_terkini() {
  return axios({
      method: 'get',
      url: 'https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json'
  })
}

module.exports = { gempa_terbaru, gempa_dirasakan, gempa_terkini}