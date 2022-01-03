import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import moment from "moment";

const BetList = ({
  currentBets,
  prevBets,
  setPrevBets,
  getCurrentBets,
  dbPrevBets,
  depositMoney,
}) => {
  const [toggleBets, setToggleBets] = useState(true);

  const postPreviousBets = (prevBets) => {
    if (prevBets.length > 0) {
      prevBets.map((bet) => {
        axios
          .post("/previous/bets", bet)
          .then((data) => {
            console.log(data);
            if (bet.winner === true) {
              depositMoney(bet.payout);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  };

  const removeCurrentBets = (prevBets) => {
    if (prevBets.length > 0)
      prevBets.map((bet) => {
        axios
          .delete("/current/bets", { data: { id: bet.id } })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };

  if (toggleBets) {
    return (
      <Box
        sx={{
          width: 300,
          height: 300,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <div className="bet-list ">
          <h1>Current Bets</h1>
          <div className="scroll">
            {currentBets.map((bet, index) => {
              return (
                <div key={index} className="bet">
                  <span>Pick: {bet.pick_name}</span>
                  <span>
                    <b>Bet:</b> ${Number(bet.amount).toFixed(2)}
                  </span>
                  <span>
                    <b>Potential Payout:</b> ${Number(bet.payout).toFixed(2)}
                  </span>
                  <div className="current-fight">
                    <span>{bet.fav_name}</span>
                    <span> vs. </span>
                    <span>{bet.under_name}</span>
                  </div>
                  <span className="date">
                    {moment(bet.date_aired).format("MMMM Do YYYY, h:mm a")}
                  </span>
                  <hr />
                </div>
              );
            })}
          </div>
          <button
            onClick={() => {
              setToggleBets(false);
              postPreviousBets(prevBets);
              removeCurrentBets(prevBets);
              setPrevBets([]);
              getCurrentBets();
            }}
          >
            See prev Bets
          </button>
        </div>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          width: 300,
          height: 300,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <div className="bet-list">
          <h1>Previous Bets</h1>
          <div className="scroll">
            {dbPrevBets.map((bet, index) => {
              return (
                <div key={index} className="bet">
                  <span>
                    Pick: {bet.pick_name} <b>{bet.winner ? "Won" : "Lost"}</b>
                  </span>
                  <span>
                    <b>Bet:</b> ${Number(bet.amount).toFixed(2)}
                  </span>
                  <span>
                    <b>Payout:</b> ${Number(bet.payout).toFixed(2)}
                  </span>
                  <div className="current-fight">
                    <span>{bet.fav_name}</span>
                    <span> vs. </span>
                    <span>{bet.under_name}</span>
                  </div>
                  <span className="date">{bet.date_aired}</span>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => {
              setToggleBets(true);
            }}
          >
            See current Bets
          </button>
        </div>
      </Box>
    );
  }
};

export default BetList;
