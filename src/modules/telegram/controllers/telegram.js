const { Axios, default: axios } = require("axios");

function sendMessage(userId, body, other) {
  let hasil;
  return axios.post(
    "https://api.telegram.org/bot736592923:AAEJ0_zq4SOI-y1BGEpKC9Mt0xAn_raif2s/sendMessage",
    {
      chat_id: userId,
      text: body,
    }
  );
}

function sendLocation(userId, body, other) {
  let hasil;
  return axios.post(
    "https://api.telegram.org/bot736592923:AAEJ0_zq4SOI-y1BGEpKC9Mt0xAn_raif2s/sendlocation",
    {
      chat_id: userId,
      latitude: body.latitude,
      longitude: body.longitude,
    }
  );
}

module.exports = {
  sendMessage,
  sendLocation,
};
