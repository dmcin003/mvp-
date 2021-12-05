const db = require("../pool.js");

module.exports = {
  addMoney: (total) => {
    return db.pool.query(`update wallet set total=total+${total} where id=1`);
  },

  getMoney: () => {
    return db.pool.query("SELECT total,id from wallet");
  },

  deductMoney: (amount) => {
    return db.pool.query(`update wallet set total=total-${amount} where id=1`);
  },
};

// `insert into wallet(total) values(${total})`
