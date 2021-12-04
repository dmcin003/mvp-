import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import FightList from "./FightList.jsx";
import BettingSlip from "./BettingSlip.jsx";
const App = () => {
  const [fights, setFights] = useState({ favs: [], unders: [], dates: [] });
  const [betslip, setBetSlip] = useState([]);

  useEffect(() => {
    axios
      .get("/mma/fight/odds")
      .then(({ data }) => {
        let dates = data.map((fight) => {
          return fight.commence_time;
        });
        console.log("🚀 ~ file: App.jsx ~ line 15 ~ dates ~ dates", dates);

        let fighters1 = data.map((fight) => {
          let fighter1 = {
            name: fight.bookmakers[0].markets[0].outcomes[1].name,
            odds: fight.bookmakers[0].markets[0].outcomes[1].price,
          };
          // console.log(fighter1);
          return fighter1;
        });
        let fighters2 = data.map((fight) => {
          let fighter2 = {
            name: fight.bookmakers[0].markets[0].outcomes[0].name,
            odds: fight.bookmakers[0].markets[0].outcomes[0].price,
          };
          // console.log(fighter2);
          return fighter2;
        });
        setFights({ favs: fighters1, unders: fighters2, dates: dates });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addToBetSlip = (fight) => {
    let copy = [...betslip];
    copy.push(fight);
    setBetSlip(copy);
  };

  const removeBet = (fight) => {
    console.log("remove me");
    let copy = [...betslip];
    let index = copy.indexOf(fight);
    copy.splice(index, 1);
    setBetSlip(copy);
  };

  return (
    <div>
      <h1>Upcoming Fights</h1>
      <FightList fights={fights} addToBetSlip={addToBetSlip} />

      <h1>Betting Slip</h1>
      <BettingSlip betslip={betslip} removeBet={removeBet} />
    </div>
  );
};

export default App;
