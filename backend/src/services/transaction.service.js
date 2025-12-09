const { runSelectAll, runSelectOne } = require("../utils/db");
const { toNumber } = require("../utils/queryHelpers");
async function fetchTransactions(rawQuery) {
  const pageSize = 10;
  const rows = await runSelectAll(
    "SELECT * FROM transactions ORDER BY date DESC LIMIT ?;",
    [pageSize]
  );

  const countRow = await runSelectOne("SELECT COUNT(*) AS total FROM transactions;", []);
  const total = countRow?.total || 0;

  return {
    items: rows,
    total,
    page: 1,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

module.exports = { fetchTransactions };
