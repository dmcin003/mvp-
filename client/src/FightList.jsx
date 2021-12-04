import React from "react";
import moment from "moment";

const FightList = ({ fights, addToBetSlip }) => {
  const handleClick = (fight) => {
    //pass function down to update betslip;
    addToBetSlip(fight);
  };

  return (
    <ul>
      This is my fight list
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
          <li key={index}>
            <div>
              <b>
                {moment(fights.dates[index]).format("MMMM Do YYYY, h:mm:ss a")}
              </b>
              <label
                onClick={() => {
                  handleClick({
                    fav: fav,
                    under: under,
                    pick: fav,
                    payout: null,
                    date: fights.dates[index],
                  });
                }}
              >
                Favorite
                <span>{fav.name}</span>
                <span>{fav.odds}</span>
              </label>
            </div>
            <div>
              <label
                onClick={() => {
                  handleClick({
                    fav: fav,
                    under: under,
                    pick: under,
                    payout: null,
                    date: fights.dates[index],
                  });
                }}
              >
                Underdog
                <span>{under.name}</span>
                <span>{under.odds}</span>
              </label>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default FightList;
