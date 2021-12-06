const express = require("express");
const morgan = require("morgan");
const path = require("path");
const axios = require("axios");
const config = require("../config/config.js");
const wallet = require("./db/models/wallet.js");
const current = require("./db/models/currentBets.js");
const db = require("./db/pool.js");
const app = express();
const port = 3000;

//middleware
app.use(express.json());
app.use(morgan("dev"));

//serving static files
app.use(express.static(path.join(__dirname, "../public")));

// api routes

app.get("/mma/fight/odds/", (req, res) => {
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

app.get("/mma/event/results/:event_id", (req, res) => {
  let eventId = req.params.event_id;
  console.log("🚀 ~ file: index.js ~ line 41 ~ app.get ~ eventId", eventId);
  let options = {
    method: "get",
    url: `https://api.sportsdata.io/v3/mma/scores/json/Event/${eventId}`,
    headers: {
      "User-Agent": "request",
      "Ocp-Apim-Subscription-Key": config.RESULTSTOKEN,
    },
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

app.get("/fighters/stats", (req, res) => {
  let options = {
    method: "get",
    url: `https://api.sportsdata.io/v3/mma/scores/json/Fighters`,
    headers: {
      "User-Agent": "request",
      "Ocp-Apim-Subscription-Key": config.RESULTSTOKEN,
    },
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

//wallet routes
app.get("/wallet/total", (req, res) => {
  wallet
    .getMoney()
    .then(({ rows }) => {
      res.json(rows);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/wallet/total", (req, res) => {
  let total = req.body.total;
  wallet
    .addMoney(total)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.put("/wallet/deduct", (req, res) => {
  let amount = req.body.amount;
  wallet
    .deductMoney(amount)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//currentBets routes
app.get("/current/bets", (req, res) => {
  current
    .getBets()
    .then(({ rows }) => {
      res.json(rows);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/current/bets", (req, res) => {
  console.log(req.body);
  let bet = {
    fav_name: req.body.fav.name,
    fav_odds: req.body.fav.odds,
    under_name: req.body.under.name,
    under_odds: req.body.under.odds,
    pick_name: req.body.pick.name,
    pick_odds: req.body.pick.odds,
    amount: req.body.amount,
    payout: req.body.payout,
    date_aired: req.body.date,
  };

  current
    .addBet(bet)
    .then((data) => {
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
