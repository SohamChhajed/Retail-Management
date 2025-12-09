const { fetchTransactions } = require("../services/transactions.service");

async function listTransactions(req, res) {
  try {
    const queryParams = req.query; 
    const result = await fetchTransactions(queryParams);
    res.json(result);
  } catch (err) {
    console.error("error :", err);
    res.status(500).json({ message: "error" });
  }
}

module.exports = { listTransactions };
