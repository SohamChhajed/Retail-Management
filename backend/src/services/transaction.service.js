const { runSelectAll, runSelectOne } = require("../utils/db");
const { toArray, normalize, toNumber } = require("../utils/queryHelpers");
async function fetchTransactions(rawQuery) {
  const pageSize = 10;

  const pageNum = toNumber(rawQuery.page) || 1;
  const safePage = pageNum < 1 ? 1 : pageNum;
  const offset = (safePage - 1) * pageSize;

  const conditions = [];
  const params = [];

  const {
    q,
    region,
    gender,
    ageMin,
    ageMax,
    category,
    tags,
    paymentMethod,
    dateFrom,
    dateTo,
  } = rawQuery;

  if (q && q.trim() !== "") {
    const pattern = `%${normalize(q)}%`;
    conditions.push("(LOWER(customer_name) LIKE ? OR LOWER(phone_number) LIKE ?)");
    params.push(pattern, pattern);
  }

  const regions = toArray(region).map(normalize);
  if (regions.length > 0) {
    const placeholders = regions.map(() => "?").join(", ");
    conditions.push(`LOWER(customer_region) IN (${placeholders})`);
    params.push(...regions);
  }
  const genders = toArray(gender).map(normalize);
  if (genders.length > 0) {
    const placeholders = genders.map(() => "?").join(", ");
    conditions.push(`LOWER(gender) IN (${placeholders})`);
    params.push(...genders);
  }
  const minAge = toNumber(ageMin);
  const maxAge = toNumber(ageMax);
  if (minAge !== null) {
    conditions.push("age >= ?");
    params.push(minAge);
  }
  if (maxAge !== null) {
    conditions.push("age <= ?");
    params.push(maxAge);
  }

  const categories = toArray(category).map(normalize);
  if (categories.length > 0) {
    const placeholders = categories.map(() => "?").join(", ");
    conditions.push(`LOWER(product_category) IN (${placeholders})`);
    params.push(...categories);
  }

  const tagFilters = toArray(tags).map(normalize);
  if (tagFilters.length > 0) {
    tagFilters.forEach((tag) => {
      conditions.push("LOWER(tags) LIKE ?");
      params.push(`%${tag}%`);
    });
  }

  const payments = toArray(paymentMethod).map(normalize);
  if (payments.length > 0) {
    const placeholders = payments.map(() => "?").join(", ");
    conditions.push(`LOWER(payment_method) IN (${placeholders})`);
    params.push(...payments);
  }

  if (dateFrom) {
    conditions.push("date >= ?");
    params.push(dateFrom);
  }
  if (dateTo) {
    conditions.push("date <= ?");
    params.push(dateTo);
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
