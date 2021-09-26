function sqlAction(sql, value) {
  return new Promise((resolve, reject) => {
    global.dbPool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, value, (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
          connection.release();
        });
      }
    });
  }).catch((err) => {
    console.error('sql action error', err);
  });
}

module.exports = { sqlAction };
