const { runSelectAll, runSelectOne } = require("../utils/db");
const { toArray, normalize, toNumber } = require("../utils/queryHelpers");

async function fetchTransactions(rawQuery) {
  const pageSize = 10;

  const pageNum = toNumber(rawQuery.page) || 1;
  const safePage = pageNum < 1 ? 1 : pageNum;
  const offset = (safePage - 1) * pageSize;

  const conditions = [];
  const params = [];

  const { q } = rawQuery;
  if (q && q.trim() !== "") {
    const pattern = `%${normalize(q)}%`;
    conditions.push("(LOWER(customer_name) LIKE ? OR LOWER(phone_number) LIKE ?)");
    params.push(pattern, pattern);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const dataSql = `SELECT * FROM transactions ${whereClause} ORDER BY date DESC LIMIT ? OFFSET ?;`;
  const dataParams = [...params, pageSize, offset];

  const countSql = `SELECT COUNT(*) AS total FROM transactions ${whereClause};`;
  const countParams = [...params];

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
