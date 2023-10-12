const telegram = require("./telegram.js");
const whatsapp = require("../../whatsapp-bot/index.js");
const models = require("../../bmkg/models/index.js");

function gempaCronJob() {
  const data_gempa = models.gempa.gempa_terbaru();
  data_gempa.then(async (response) => {
    await models.gempa_terkini.cek_gempa_terkini2(
      response.data,
      async function (cek_kirim) {
        console.log("cek data ::: ", cek_kirim);
        let pesan = "*Informasi Gempa Terkini dari* \n";
        pesan += "BMKG (Badan Meteorologi, Klimatologi, dan Geofisika) \n\n";
        pesan += `*Tanggal* : ${response.data.Infogempa.gempa.Tanggal} \n`;
        pesan += `*Pukul* : ${response.data.Infogempa.gempa.Jam} \n`;
        pesan += `*Wilayah* : ${response.data.Infogempa.gempa.Wilayah} \n`;
        pesan += `*Kedalaman* : ${response.data.Infogempa.gempa.Kedalaman} \n`;
        pesan += `*Magnitude* : ${response.data.Infogempa.gempa.Magnitude} \n`;
        pesan += `*Potensi* : ${response.data.Infogempa.gempa.Potensi} \n`;
        pesan += `*Dirasakan* : ${response.data.Infogempa.gempa.Dirasakan} \n\n`;

        pesan += `https://ews.bmkg.go.id/TEWS/data/${response.data.Infogempa.gempa.Shakemap} \n`;
        const coordinates =
          response.data.Infogempa.gempa.Coordinates.split(",");

        await whatsapp.models.db_bot.get_bot_bmkg2("", function (wa_bmkg) {
          if (cek_kirim) {
            console.log("get_bot_bmkg2", wa_bmkg);
            if (wa_bmkg.length > 0) {
              wa_bmkg.forEach((element) => {
                console.log("wa_bmkg", element);
                telegram.sendMessage(element.user_id, pesan, null);
                telegram.sendLocation(
                  element.user_id,
                  { latitude: coordinates[0], longitude: coordinates[1] },
                  null
                );
              });
            }
          }
        });
      }
    );
  });
}

module.exports = gempaCronJob;
