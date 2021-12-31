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
}) => {
  const [toggleBets, setToggleBets] = useState(true);

  let aldoBet = {
    amount: 50,
    date_aired: "Decemeber 5th, 2021",
    fav_name: "Rob Font",
    fav_odds: -140,
    payout: 110,
    pick_name: "Jose Aldo",
    pick_odds: 120,
    under_name: "Jose Aldo",
    under_odds: 120,
  };

  const postPreviousBets = (prevBets) => {
    if (prevBets.length > 0) {
      prevBets.map((bet) => {
        axios
          .post("/previous/bets", bet)
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
      // setPrevBets([]);
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
          {dbPrevBets.map((bet, index) => {
            return (
              <div key={index} className="bet">
                <span>
                  Pick: {bet.pick_name} <b>Winner</b>
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
