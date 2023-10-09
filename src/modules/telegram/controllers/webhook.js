// const modules = require("../../../modules/index.js")
const help = require("./help.js");
const openAi = require("./openai.js");
const daftar = require("./daftar.js");

function webhook(data, modules) {
  modules.controllers.gempa_terkini_telegram(
    data.message.text,
    data.message.chat.id,
    null
  );
  modules.controllers.gempa.gempa_telegram(
    data.message.text,
    data.message.chat.id,
    null
  );
  modules.controllers.gempa_dirasakan.gempa_dirasakan_telegram(
    data.message.text,
    data.message.chat.id,
    null
  );
  daftar(
    {
      user_id: data.message.chat.id,
      first_name_user: data.message.from.username
    },
    data.message.text
  );
  help(data.message.text, data.message.chat.id, null);
  openAi(data.message.text);
}

module.exports = webhook;
