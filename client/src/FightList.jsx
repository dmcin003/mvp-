import React from "react";
import moment from "moment";

const FightList = ({ fights, addToBetSlip, setView, setClickedFighter }) => {
  const handleClick = (fight) => {
    //pass function down to update betslip;
    addToBetSlip(fight);
  };

  return (
    <div className="scroll">
      {fights.favs.map((fight, index) => {
        let fav;
        let under;
        if (fights.favs[index].odds < fights.unders[index].odds) {
          fav = fights.favs[index];
          under = fights.unders[index];
        } else {
          fav = fights.unders[index];
          under = fights.favs[index];
        }

        return (
          <div key={index}>
            <div className="fight">
              <div
                className="fighter"
                onClick={() => {
                  handleClick({
                    fav: fav,
                    under: under,
                    pick: fav,
                    amount: null,
                    payout: null,
                    date: fights.dates[index],
                  });
                }}
              >
                <div>{fav.name}</div>
                <div className="odds">{fav.odds}</div>
              </div>
              <div>
                <a
                  className="stats-link"
                  href="#"
                  onClick={() => {
                    setView("stats");
                    setClickedFighter(fav.name);
                    console.log(fav.name);
                  }}
                >
                  see stats
                </a>
              </div>
              <b>VS.</b>
              <div
                className="fighter"
                onClick={() => {
                  handleClick({
                    fav: fav,
                    under: under,
                    pick: under,
                    amount: null,
                    payout: null,
                    date: fights.dates[index],
                  });
                }}
              >
                <div>{under.name}</div>
                <div className="odds">{under.odds}</div>
              </div>
              <div>
                <a
                  className="stats-link"
                  href="#"
                  onClick={() => {
                    setView("stats");
                    setClickedFighter(under.name);
                    console.log(under.name);
                  }}
                >
                  see stats
                </a>
              </div>
            </div>
            <p className="fight-date">
              {moment(fights.dates[index]).format("MMMM Do YYYY, h:mm a")}
            </p>
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
};

export default FightList;
