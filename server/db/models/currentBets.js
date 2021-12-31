const db = require("../pool.js");

module.exports = {
  getBets: () => {
    return db.pool.query(`select * from currentbets`);
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
  }) => {
    return db.pool.query(
      `insert into currentbets(wallet_id,fav_name,fav_odds,under_name,under_odds,pick_name,pick_odds,amount,payout,date_aired)
      values(1,'${fav_name}',${fav_odds},'${under_name}',${under_odds},'${pick_name}',${pick_odds},${amount},${payout},'${date_aired}')`
    );
  },

  removeBet: (id) => {
    return db.pool.query(`delete from currentbets where id = ${id}`);
  },
};
