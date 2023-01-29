const whatsapp = require('./whatsapp.js')
const help = require('./help.js')

// const controllers = (val) => {
//     whatsapp(val)
// }

const controllers = {
    whatsapp,
    help,
}

module.exports = controllers