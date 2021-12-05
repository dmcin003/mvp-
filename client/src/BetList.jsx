import React, { useState, useEffect } from "react";
import moment from "moment";

const BetList = ({ currentBets, prevBets }) => {
  const [toggleBets, setToggleBets] = useState(true);

  if (toggleBets) {
    return (
      <div>
        <h1>Current Bets</h1>
        {currentBets.map((bet, index) => {
          return (
            <div key={index}>
              {bet.pick_name}
              {bet.amount}
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
            setToggleBets(false);
          }}
        >
          See prev Bets
        </button>
      </div>
    );
  } else {
    return (
      <div>
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
