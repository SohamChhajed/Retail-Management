const { runSelectAll, runSelectOne } = require("../utils/db");
const { toNumber } = require("../utils/queryHelpers");
async function fetchTransactions(rawQuery) {
  const pageSize = 10; // fixed 

  const pageNum = toNumber(rawQuery.page) || 1;
  const safePage = pageNum < 1 ? 1 : pageNum;
  const offset = (safePage - 1) * pageSize;

  const dataSql = "SELECT * FROM transactions ORDER BY date DESC LIMIT ? OFFSET ?;";
  const dataParams = [pageSize, offset];

  const countSql = "SELECT COUNT(*) AS total FROM transactions;";
  const countParams = [];

  const [rows, countRow] = await Promise.all([
    runSelectAll(dataSql, dataParams),
    runSelectOne(countSql, countParams),
  ]);

  const total = countRow?.total || 0;
  const totalPages = total === 0 ? 0 : Math.ceil(total / pageSize);

  return {
    items: rows,
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

module.exports = { fetchTransactions };
