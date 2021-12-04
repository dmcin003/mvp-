import React from "react";
import moment from "moment";
import { useState, useEffect } from "react";

const BettingSlip = ({ betslip }) => {
  const [payouts, setPayouts] = useState([]);

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
    betslip[index].payout = totalPayout;
    let copy = [...payouts];
    copy.push(betslip[index]);
    setPayouts(copy);
    console.log(betslip[index]);
  };

  const handleClick = (payout) => {
    console.log(payout);
  };

  return (
    <div>
      This is my betting slip
      <div>
        {betslip.map((fight, index) => {
          console.log(fight);
          return (
            <div key={index}>
              <div>
                <span>
                  {moment(fight.date).format("MMMM Do YYYY, h:mm:ss a")}
                </span>
                <div>
                  <span>{fight.fav.name}</span>
                  <span>{fight.fav.odds}</span>
                </div>
                <div>
                  <span>{fight.under.name}</span>
                  <span>{fight.under.odds}</span>
                </div>
              </div>
              <div>
                <span>{fight.pick.name}</span>
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
                    handleClick(fight.payout);
                  }}
                />
                <span>{fight.payout ? `${fight.payout}` : ""}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BettingSlip;
