const db = require("../models/db");

const insertQuery = {
  stockClass: `
    insert into stock_class(class) values(?)
  `,
};

const insertStockClass = async (newClass) => {
  return await db.beginTransaction(async (err) => {
    if (err) console.log(err.message);
    return await db.query(
      `select * from stock_class where class=?`,
      [newClass],
      async (err, res) => {
        if (err) console.log(err.message);
        if (!res.length) {
          await db.query(insertQuery.stockClass, [newClass], (err, res) => {
            if (err) {
              db.rollback((err) => {
                if (err) throw err;
              });
            }
            // console.log("result", res);
            db.commit();
            return res;
          });
        } else {
          return "exist class";
        }
      }
    );
  });
};

module.exports = {
  insertStockClass,
};
