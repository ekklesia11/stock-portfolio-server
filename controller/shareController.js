const db = require("../models/db");

const getQuery = {
  stockClass: `select * from stock_class where class=?`,
};

const insertQuery = {
  stockClass: `insert into stock_class(class) values(?)`,
  userClass: `insert into user_class(stock_class_id, user_id) values(?, ?)`,
};

const insertStockClass = (newClass, user) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) {
        console.log(err.message);
        reject(err.message);
      }

      db.query(getQuery.stockClass, [newClass], (err, res) => {
        if (err) console.log(err.message);
        if (!res.length) {
          db.query(insertQuery.stockClass, [newClass], (err, res) => {
            if (err) {
              db.rollback((err) => {
                if (err) reject(err);
              });
            }

            console.log("result", res);
            db.query(
              insertQuery.userClass,
              [res.insertId, user],
              (err, res) => {
                if (err) {
                  db.rollback((err) => {
                    if (err) reject(err);
                  });
                }

                console.log("new class added", res);
              }
            );

            db.commit();
            resolve(res);
          });
        } else {
          // db.query(
          //   insertQuery.userClass,
          //   [res.insertId, user],
          //   (err, res) => {
          //     if (err) {
          //       db.rollback((err) => {
          //         if (err) reject(err);
          //       });
          //     }

          //     console.log("exist class added", res);
          //   }
          // );

          // db.commit();

          console.log(res);
          resolve(res);
        }
      });
    });
  });
};

module.exports = {
  insertStockClass,
};
