import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import FightList from "./FightList.jsx";
import BettingSlip from "./BettingSlip.jsx";
import Wallet from "./Wallet.jsx";
import BetList from "./BetList.jsx";
import EventResults from "./EventResults.jsx";
const App = () => {
  const [fights, setFights] = useState({ favs: [], unders: [], dates: [] });
  const [betslip, setBetSlip] = useState([]);
  const [wallet, setWallet] = useState({ total: 0 });
  const [prevBets, setPrevBets] = useState([]);
  const [currentBets, setcurrentBets] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    getTotal();
    getCurrentBets();
    getOddsList();
    getResults();
    () => {
      setTimeout(checkWinners, 3000);
    };
  }, []);

  useEffect(() => {
    // removeFromCurrentBets();
  }, [prevBets]);

  const removeFromCurrentBets = () => {
    let newCurrentBets = [];
    let copyCurrent = [...currentBets];
    for (let i = 0; i < currentBets.length; i++) {
      for (let j = 0; j < prevBets.length; j++) {
        if (currentBets[i].pick_name === prevBets[j].pick_name) {
          copyCurrent.splice(i, 1);
        }
      }
    }
    setcurrentBets(copyCurrent);
  };

  const checkWinners = () => {
    axios
      .get("/mma/event/results/220")
      .then(({ data }) => {
        console.log(data.Fights);
        console.log(currentBets);
        let finished = data.Fights.map((fight) => {
          if ((fight.Status = "Final")) {
            return fight;
          }
        });
        let winners = [];
        for (let i = 0; i < finished.length; i++) {
          if (finished[i].Fighters) {
            if (finished[i].Fighters[0]) {
              if (finished[i].Fighters[0].Winner === true) {
                winners.push(finished[i].Fighters[0]);
              }
            }
            if (finished[i].Fighters[1]) {
              if (finished[i].Fighters[1].Winner === true) {
                winners.push(finished[i].Fighters[1]);
              }
            }
          }
        }

        let prevBets = [];
        for (let i = 0; i < winners.length; i++) {
          for (let j = 0; j < currentBets.length; j++) {
            if (currentBets[j].pick_name.includes(winners[i].LastName)) {
              let prevBet = currentBets[j];
              prevBet.Winner = true;

              prevBets.push(prevBet);
            }
          }
        }
        setPrevBets(prevBets);
        console.log(prevBets);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOddsList = () => {
    axios
      .get("/mma/fight/odds")
      .then(({ data }) => {
        let dates = data.map((fight) => {
          return fight.commence_time;
        });

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
  };

  const getResults = () => {
    axios
      .get("/mma/event/results/220")
      .then(({ data }) => {
        // console.log(data);
        let copy = [...results];
        copy.push(data);
        setResults(copy);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const getCurrentBets = () => {
    axios
      .get("/current/bets")
      .then(({ data }) => {
        setcurrentBets(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTotal = () => {
    axios
      .get("/wallet/total")
      .then(({ data }) => {
        // console.log(data[0]);
        setWallet({ total: data[0].total });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <h3 className="text-muted">MVP</h3>
          </div>
          <ul className="nav navbar-nav">
            <li className="active">
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Event results</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="jumbotron">
        <div className="list-container">
          <h1>Upcoming Fights</h1>
          <FightList fights={fights} addToBetSlip={addToBetSlip} />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h1>Betting Slip</h1>
            <BettingSlip
              betslip={betslip}
              removeBet={removeBet}
              getCurrentBets={getCurrentBets}
              getTotal={getTotal}
            />
          </div>
          <div className="col-md-4">
            <h1>Wallet</h1>
            <Wallet wallet={wallet} getTotal={getTotal} />
          </div>
          <div className="col-md-4">
            <h1>Bet List</h1>
            <BetList currentBets={currentBets} prevBets={prevBets} />
          </div>
        </div>
        <hr></hr>
        <footer>
          <p>MVP demo | rfe6 in the house!</p>
        </footer>
      </div>
      <div className="container">
        <EventResults results={results} />
      </div>
    </div>
  );
};

export default App;
