import React from "react";
import moment from "moment";
import axios from "axios";
import { useState, useEffect } from "react";

const BettingSlip = ({ betslip, removeBet, getCurrentBets, getTotal }) => {
  const [payouts, setPayouts] = useState([]);
  const [activeBets, setActiveBets] = useState([]);

  useEffect(() => {
    setActiveBets(betslip);
  }, [betslip]);

  const calculatePayout = (amount, odds, index) => {
    console.log(amount);
    console.log(odds);
    let totalPayout = 0;
    let decimal;
    if (odds < 0) {
      decimal = 100 / Math.abs(odds) + 1;
      totalPayout = amount * decimal;
    } else {
      decimal = odds / 100 + 1;
      totalPayout = amount * decimal;
    }

    console.log(totalPayout);
    activeBets[index].amount = amount;
    activeBets[index].payout = totalPayout;
    let copy = [...payouts];
    copy.push(betslip[index]);
    setPayouts(copy);
    console.log(betslip[index]);
  };

  const handleClick = (fight) => {
    //add to currentBets table with axios
    axios
      .post("/current/bets", fight)
      .then((data) => {
        console.log(data);
        getCurrentBets();
        deductFunds(fight.amount);
        removeBet(fight);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deductFunds = (amount) => [
    axios
      .put("/wallet/deduct", { amount: amount })
      .then((data) => {
        console.log(data);
        getTotal();
      })
      .catch((err) => {
        console.log(err);
      }),
  ];

  const handleRemove = (fight) => {
    removeBet(fight);
  };

  return (
    <div className="scroll">
      {activeBets.map((fight, index) => {
        console.log(fight);
        return (
          <div key={index}>
            <div>
              <span className="date">
                {moment(fight.date).format("MMMM Do YYYY, h:mm:ss a")}
              </span>
              <div className="betslip-fighter">
                <span>{fight.fav.name}</span>
                <span>{fight.fav.odds}</span>
              </div>
              <div className="betslip-fighter">
                <span>{fight.under.name}</span>
                <span>{fight.under.odds}</span>
              </div>
            </div>
            <div>
              <span>
                <b>Pick: </b>
                {fight.pick.name}
              </span>
              <input
                type="text"
                placeholder="Amount"
                name="amount"
                onChange={(e) => {
                  calculatePayout(e.target.value, fight.pick.odds, index);
                }}
              />
              <input
                type="button"
                value="Place Bet"
                onClick={() => {
                  handleClick(fight);
                }}
              />
              <input
                type="button"
                value="Remove"
                onClick={() => {
                  handleRemove(fight);
                }}
              />
              <span>
                {fight.payout ? `$${Number(fight.payout).toFixed(2)}` : ""}
              </span>
            </div>
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
};

export default BettingSlip;
