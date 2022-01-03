import React from "react";
import axios from "axios";
import _ from "underscore";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import FightList from "./FightList.jsx";
import BettingSlip from "./BettingSlip.jsx";
import Wallet from "./Wallet.jsx";
import BetList from "./BetList.jsx";
import EventResults from "./EventResults.jsx";
import FighterStats from "./FighterStats.jsx";
import ResponsiveAppBar from "./MUI/NavBar.jsx";

const App = () => {
  const [fights, setFights] = useState({ favs: [], unders: [], dates: [] });
  const [betslip, setBetSlip] = useState([]);
  const [wallet, setWallet] = useState({ total: 0 });
  const [previousBets, setPreviousBets] = useState([]);
  const [prevBets, setPrevBets] = useState([]);
  const [dbPrevBets, setdbPrevBets] = useState([]);
  const [currentBets, setcurrentBets] = useState([]);
  const [results, setResults] = useState([]);
  const [view, setView] = useState("Home");
  const [fightersInfo, setFightersInfo] = useState([]);
  const [clickedFighter, setClickedFighter] = useState("");
  const [yearsToCheck, setYearsToCheck] = useState([]);
  const [eventIdsToCheck, setEventIdsToCheck] = useState([]);

  useEffect(() => {
    getTotal();
    getCurrentBets();
    getdbPrevBets();
    getOddsList();
    getResults();
    getFightersInfo();
  }, []);

  useEffect(() => {
    // removeFromCurrentBets();
    getYearsFromCurrentBets();
  }, [currentBets]);

  useEffect(() => {
    getEventIds();
  }, [yearsToCheck]);

  useEffect(() => {
    checkWinners();
  }, [eventIdsToCheck]);

  useEffect(() => {
    let bets = _.uniq(previousBets);

    setPrevBets(bets);
  }, [previousBets]);

  const getFightersInfo = () => {
    axios
      .get("/fighters/stats")
      .then(({ data }) => {
        console.log(data);
        setFightersInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getdbPrevBets = () => {
    axios
      .get("/previous/bets")
      .then(({ data }) => {
        setdbPrevBets(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getYearsFromCurrentBets = () => {
    let years = currentBets.map((bet) => {
      return bet.date_aired.substring(0, 4);
    });
    years = _.uniq(years);
    setYearsToCheck(years);
  };

  const getEventIds = () => {
    let eIds;
    let eventIds = [];
    yearsToCheck.map((year) => {
      axios
        .get(`/mma/schedule/${year}`)
        .then(({ data }) => {
          let ids = data.map((event) => {
            return event.EventId;
          });

          if (ids.length) {
            eIds = eventIds.concat(ids);
          } else {
            eIds = ids;
          }
          setEventIdsToCheck(eIds);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const checkWinners = () => {
    eventIdsToCheck.map((id) => {
      axios
        .get(`/mma/event/results/${id}`)
        .then(({ data }) => {
          let finished = data.Fights.map((fight) => {
            if ((fight.Status = "Final")) {
              return fight;
            }
          });

          let fights = [];
          for (let i = 0; i < finished.length; i++) {
            if (finished[i].Fighters) {
              if (finished[i].Fighters[0]) {
                if (finished[i].Fighters[0].Winner === true) {
                  let fight = {
                    win: finished[i].Fighters[0],
                    lost: finished[i].Fighters[1],
                  };
                  fights.push(fight);
                }
              }
              if (finished[i].Fighters[1]) {
                if (finished[i].Fighters[1].Winner === true) {
                  let fight = {
                    win: finished[i].Fighters[1],
                    lost: finished[i].Fighters[0],
                  };
                  fights.push(fight);
                }
              }
            }
          }

          for (let i = 0; i < fights.length; i++) {
            for (let j = 0; j < currentBets.length; j++) {
              if (
                fights[i].win.FirstName + " " + fights[i].win.LastName ===
                  currentBets[j].pick_name &&
                (fights[i].lost.FirstName + " " + fights[i].lost.LastName ===
                  currentBets[j].fav_name ||
                  fights[i].lost.FirstName + " " + fights[i].lost.LastName ===
                    currentBets[j].under_name)
              ) {
                currentBets[j].winner = true;
              }
              if (
                fights[i].lost.FirstName + " " + fights[i].lost.LastName ===
                  currentBets[j].pick_name &&
                (fights[i].win.FirstName + " " + fights[i].win.LastName ===
                  currentBets[j].fav_name ||
                  fights[i].win.FirstName + " " + fights[i].win.LastName ===
                    currentBets[j].under_name)
              ) {
                currentBets[j].winner = false;
              }
            }
          }

          let prevBets = currentBets.map((bet) => {
            if (bet.winner === true || bet.winner === false) {
              return bet;
            }
          });

          prevBets = _.uniq(prevBets);

          for (let i = 0; i < prevBets.length; i++) {
            if (prevBets[i] !== undefined) {
              setPreviousBets((previousBets) => [prevBets[i], ...previousBets]);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
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

  const depositMoney = (amount) => {
    axios
      .put("/wallet/total", { total: amount })
      .then((data) => {
        console.log(data);
        getTotal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (view === "Event Results") {
    return (
      <div className="container">
        <ResponsiveAppBar setView={setView} />

        <div className="jumbotron bg-dark text-white">
          <div className="list-container">
            <h1>Event Results of Previous Bets</h1>
            <EventResults results={results} />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <BettingSlip
                betslip={betslip}
                removeBet={removeBet}
                getCurrentBets={getCurrentBets}
                getTotal={getTotal}
              />
            </div>
            <div className="col-md-4">
              <Wallet
                wallet={wallet}
                getTotal={getTotal}
                depositMoney={depositMoney}
              />
            </div>
            <div className="col-md-4">
              <BetList
                currentBets={currentBets}
                prevBets={prevBets}
                setPrevBets={setPrevBets}
                getCurrentBets={getCurrentBets}
                dbPrevBets={dbPrevBets}
                depositMoney={depositMoney}
              />
            </div>
          </div>
          <hr></hr>
          <footer>
            <p>MVP demo | rfe6 in the house!</p>
          </footer>
        </div>
      </div>
    );
  }

  if (view === "stats") {
    return (
      <div className="container">
        <ResponsiveAppBar setView={setView} />

        <div className="jumbotron bg-dark text-white">
          <div className="list-container">
            <h1>Stats</h1>
            <FighterStats
              fightersInfo={fightersInfo}
              clickedFighter={clickedFighter}
            />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <BettingSlip
                betslip={betslip}
                removeBet={removeBet}
                getCurrentBets={getCurrentBets}
                getTotal={getTotal}
              />
            </div>
            <div className="col-md-4">
              <Wallet
                wallet={wallet}
                getTotal={getTotal}
                depositMoney={depositMoney}
              />
            </div>
            <div className="col-md-4">
              <BetList
                currentBets={currentBets}
                prevBets={prevBets}
                setPrevBets={setPrevBets}
                getCurrentBets={getCurrentBets}
                dbPrevBets={dbPrevBets}
                depositMoney={depositMoney}
              />
            </div>
          </div>
          <hr></hr>
          <footer>
            <p>MVP demo | rfe6 in the house!</p>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <ResponsiveAppBar setView={setView} />

      <div className="jumbotron bg-dark text-white">
        <div className="list-container">
          <h1>Upcoming Fights</h1>
          {fights.favs[0] ? (
            ""
          ) : (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
          <FightList
            fights={fights}
            addToBetSlip={addToBetSlip}
            setView={setView}
            setClickedFighter={setClickedFighter}
          />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <BettingSlip
              betslip={betslip}
              removeBet={removeBet}
              getCurrentBets={getCurrentBets}
              getTotal={getTotal}
            />
          </div>
          <div className="col-md-4">
            <Wallet
              wallet={wallet}
              getTotal={getTotal}
              depositMoney={depositMoney}
            />
          </div>
          <div className="col-md-4">
            <BetList
              currentBets={currentBets}
              prevBets={prevBets}
              setPrevBets={setPrevBets}
              getCurrentBets={getCurrentBets}
              dbPrevBets={dbPrevBets}
              depositMoney={depositMoney}
            />
          </div>
        </div>
        <hr></hr>
        <footer>
          <p>MVP demo | rfe6 in the house!</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
