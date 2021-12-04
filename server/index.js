const express = require("express");
const morgan = require("morgan");
const path = require("path");
const axios = require("axios");
const config = require("../config/config.js");
const app = express();
const port = 3000;

//middleware
app.use(express.json());
app.use(morgan("dev"));

//serving static files
app.use(express.static(path.join(__dirname, "../public")));

//routes

app.get("/mma/fight/odds", (req, res) => {
  let params = { apiKey: config.TOKEN, regions: "us", oddsFormat: "american" };
  let options = {
    method: "get",
    url: "https://api.the-odds-api.com/v4/sports/mma_mixed_martial_arts/odds/",
    headers: {
      "User-Agent": "request",
    },
    params: params,
  };

  axios(options)
    .then(({ data }) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.listen(port, () => {
  console.log(`server listening on port:${port}`);
});
