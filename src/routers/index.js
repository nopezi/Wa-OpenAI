const express = require("express");
const app = express();
const env = require("../config/key.json");
const modules = require("../modules/index.js");
// const bodyParser = require("body")

const io = require("socket.io-client");
const socket = io("https://socket-heroku-22.herokuapp.com");

function routers() {
  // app.use(express.bodyParser());
  app.use(express.json())

  app.get("/", (req, res) => {
    // modules.bmkg.controllers.gempa_crontjob()
    socket.emit("dariServer", "masok dari routers");

    res.send("index");
  });

  app.get("/gempa-realtime", (req, res) => {
    modules.bmkg.controllers.gempa_realtime();
    res.json({
      status: true,
    });
  });

  app.get("/jadwal-azan-hari-ini", (req, res) => {
    modules.islamic.controllers.adzan.hari_ini(res);
  });

  app.get("/bahasa-jawa", (req, res) => {
    const kalimat = req.query.kalimat;
    const opsi = req.query.opsi;
    res.json({
      status: true,
      message: "success get data",
      data: modules.bahasa.models.jawa(kalimat, opsi),
    });
  });

  app.get("/telegram/kirim-pesan", (req, res) => {
    const body = req.query.pesan;
    const userId = req.query.userId;

    const hasil = modules.telegram.telegramController.sendMessage(
      userId,
      body,
      null
    );

    hasil
      .then((response) => {
        //   console.log("result send message", res);
        res.json({
          status: true,
          message: "berhasil",
          data: response.data,
        });
      })
      .catch((err) => {
        console.error("error dong", err);
        res.json({
          status: false,
          message: "gagal",
          data: err,
        });
      });
  });

  app.post("/telegram/webhook", (req, res) => {
    modules.telegram.webhookController(req.body, modules.bmkg)
    res.json({
      status: true,
      message: "berhasil",
      data: req.body,
    });
  });

  app.get("/telegram/gempa-realtime", (req, res) => {
    modules.telegram.gempaCronJobController()
    res.json({
      status: true,
      message: "berhasil",
    })
  })

  app.listen(process.env.PORT || env.port_express);

  console.log("[router run] ::: port ", process.env.PORT || env.port_express);
}

module.exports = routers;
