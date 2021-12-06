import React, { useState, useEffect } from "react";
import moment from "moment";

const BetList = ({ currentBets, prevBets }) => {
  const [toggleBets, setToggleBets] = useState(true);

  if (toggleBets) {
    return (
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
                  {moment(bet.date_aired).format("MMMM Do YYYY, h:mm:ss a")}
                </span>
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
    );
  } else {
    return (
      <div className="bet-list">
        <h1>Previous Bets</h1>
        {prevBets.map((bet, index) => {
          return (
            <div key={index}>
              {bet.pick_name}
              {bet.amount}
              {bet.Winner ? "Winner" : ""}
              <div>
                <span>{bet.fav_name}</span>
                vs.
                <span>{bet.under_name}</span>
              </div>
              {moment(bet.date).format("MMMM Do YYYY, h:mm:ss a")}
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
    );
  }
};

export default BetList;
