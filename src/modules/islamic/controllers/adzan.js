const models = require('../models/index.js')
const helpers = require('../../../helpers/index.js')

function hari_ini(res) {
  const data_adzan = models.adzan.hari_ini()
  data_adzan.then(async (response) => {
    // await console.log(response.data)
    const hari_ini = helpers.date.dateDayIndonesia()
    const tanggal = helpers.date.dateStringToDate()
    let pesan = `Bismillahirrahmanirrahiim \n`;
        pesan += `*JADWAL SHALAT HARIAN*\n`;
        pesan += `untuk DKI Jakarta dan sekitarnya.\n\n`;
        pesan += `Hari *${data_adzan}*\n`
        pesan += `*${tanggal} M*\n`
        pesan += `*${response.data.date.hijri.day} `
        pesan += `${response.data.date.hijri.month.en} `
        pesan += `${response.data.date.hijri.year}* `

    await res.send(pesan)
  })
}

module.exports = {
    hari_ini
}