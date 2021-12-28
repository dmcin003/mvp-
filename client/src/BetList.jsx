import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import moment from "moment";

const BetList = ({ currentBets, prevBets }) => {
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

          <div className="bet">
            <span>
              Pick: {aldoBet.pick_name} <b>Winner</b>
            </span>
            <span>
              <b>Bet:</b> ${Number(aldoBet.amount).toFixed(2)}
            </span>
            <span>
              <b>Payout:</b> ${Number(aldoBet.payout).toFixed(2)}
            </span>
            <div className="current-fight">
              <span>{aldoBet.fav_name}</span>
              <span> vs. </span>
              <span>{aldoBet.under_name}</span>
            </div>
            <span className="date">{aldoBet.date_aired}</span>
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
