const models = require("../models/index.js");
const telegram = require("../../../modules/telegram/index.js");

function gempa(body, client, flag) {
  const data_tempa = models.gempa.gempa_terbaru();

  if (!flag && body == "/gempa") {
    console.log("[gempa] ::: ", body);

    data_tempa.then((response) => {
      let pesan = "*Informasi Gempa Terkini dari* \n";
      pesan += "BMKG (Badan Meteorologi, Klimatologi, dan Geofisika) \n\n";
      pesan += `*Tanggal* : ${response.data.Infogempa.gempa.Tanggal} \n`;
      pesan += `*Pukul* : ${response.data.Infogempa.gempa.Jam} \n`;
      pesan += `*Wilayah* : ${response.data.Infogempa.gempa.Wilayah} \n`;
      pesan += `*Kedalaman* : ${response.data.Infogempa.gempa.Kedalaman} \n`;
      pesan += `*Magnitude* : ${response.data.Infogempa.gempa.Magnitude} \n`;
      pesan += `*Potensi* : ${response.data.Infogempa.gempa.Potensi} \n`;
      pesan += `*Dirasakan* : ${response.data.Infogempa.gempa.Dirasakan} \n\n`;

      pesan += `*Foto Lokasi* : https://ews.bmkg.go.id/TEWS/data/${response.data.Infogempa.gempa.Shakemap} \n`;

      client.sendMessage(mek.key.remoteJid, { text: pesan }, mek);
      const coordinates = response.data.Infogempa.gempa.Coordinates.split(",");
      client.sendMessage(
        mek.key.remoteJid,
        {
          location: {
            degreesLatitude: coordinates[0],
            degreesLongitude: coordinates[1],
          },
        },
        mek
      );
    });

    return true;
  } else {
    return false;
  }
}

function gempa_telegram(body, userId, flag) {
  const data_tempa = models.gempa.gempa_terbaru();
  console.log('masok gempa_telegram ', body)
  if (!flag && body == "/gempa") {
    console.log("[gempa] ::: ", body);

    data_tempa.then((response) => {
      let pesan = "**Informasi Gempa Terkini dari** \n";
      pesan += "BMKG (Badan Meteorologi, Klimatologi, dan Geofisika) \n\n";
      pesan += `**Tanggal** : ${response.data.Infogempa.gempa.Tanggal} \n`;
      pesan += `**Pukul** : ${response.data.Infogempa.gempa.Jam} \n`;
      pesan += `**Wilayah** : ${response.data.Infogempa.gempa.Wilayah} \n`;
      pesan += `**Kedalaman** : ${response.data.Infogempa.gempa.Kedalaman} \n`;
      pesan += `**Magnitude** : ${response.data.Infogempa.gempa.Magnitude} \n`;
      pesan += `**Potensi** : ${response.data.Infogempa.gempa.Potensi} \n`;
      pesan += `**Dirasakan** : ${response.data.Infogempa.gempa.Dirasakan} \n\n`;

      pesan += `**Foto Lokasi** : https://ews.bmkg.go.id/TEWS/data/${response.data.Infogempa.gempa.Shakemap} \n`;

      telegram.telegramController.sendMessage(userId, pesan, null);
      const coordinates = response.data.Infogempa.gempa.Coordinates.split(",");
      telegram.telegramController.sendLocation(
        userId,
        { latitude: coordinates[0], longitude: coordinates[1] },
        null
      );
    });

    return true;
  } else {
    return false;
  }
}

module.exports = { gempa, gempa_telegram };
