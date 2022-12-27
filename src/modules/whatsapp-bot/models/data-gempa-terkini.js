var axios = require('axios')

function gempa_terkini() {
  return axios({
    method: 'get',
    url: 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json'
  })
  // .then((response) => {
  //   // console.log('[data gempa terkini] ', response.data)
  //   data = response.data
  // })
}

module.exports = gempa_terkini