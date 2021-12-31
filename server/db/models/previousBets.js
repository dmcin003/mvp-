const db = require("../pool.js");

module.exports = {
  getBets: () => {
    return db.pool.query(`select * from previousbets`);
  },

  addBet: ({
    fav_name,
    fav_odds,
    under_name,
    under_odds,
    pick_name,
    pick_odds,
    amount,
    payout,
    date_aired,
    winner,
  }) => {
    return db.pool.query(
      `insert into previousbets(wallet_id,fav_name,fav_odds,under_name,under_odds,pick_name,pick_odds,amount,payout,winner,date_aired)
      values(1,'${fav_name}',${fav_odds},'${under_name}',${under_odds},'${pick_name}',${pick_odds},${amount},${payout},${winner},'${date_aired}')
      `
    );
  },
};
