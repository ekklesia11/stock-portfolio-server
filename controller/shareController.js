const db = require("../models/db");

const insertQuery = {
  stockClass: `insert into stock_class(class) values(?)`,
  userClass: `insert into user_class(stock_class_id, user_id) values(?, ?)`,
};

const insertStockClass = (newClass, user) => {
  return new Promise(async (resolve, reject) => {
    await db.beginTransaction(async (err) => {
      if (err) {
        console.log(err.message);
        reject(err.message);
      }

      await db.query(
        `select * from stock_class where class=?`,
        [newClass],
        async (err, res) => {
          if (err) console.log(err.message);
          if (!res.length) {
            await db.query(
              insertQuery.stockClass,
              [newClass],
              async (err, res) => {
                if (err) {
                  db.rollback((err) => {
                    if (err) reject(err);
                  });
                }

                console.log("result", res);
                db.commit();
                resolve(res);
              }
            );
            // await db.query(
            //   insertQuery.userClass,
            //   [res.insertId, user],
            //   (err, res) => {
            //     if (err) {
            //       db.rollback((err) => {
            //         if (err) reject(err);
            //       });
            //     }

            //     console.log("user class table result", res);
            //   }
            // );
          } else {
            resolve(res);
          }
        }
      );
    });
  });
};

module.exports = {
  insertStockClass,
};
