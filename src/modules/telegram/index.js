const telegramController = require('./controllers/telegram.js')
const webhookController = require('./controllers/webhook.js')
const gempaCronJobController = require('./controllers/gempaCronjob.js')

module.exports = {
    telegramController,
    webhookController,
    gempaCronJobController
}