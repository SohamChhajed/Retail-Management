const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const DB_PATH = path.join(__dirname, "..", "..", "retail_sales.db");

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Failed to connect to SQLite ", err.message);
  } else {
    console.log("Connected to SQLite ", DB_PATH);
  }
});
function runSelectAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function runSelectOne(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

module.exports = {
  db,
  runSelectAll,
  runSelectOne,
};
