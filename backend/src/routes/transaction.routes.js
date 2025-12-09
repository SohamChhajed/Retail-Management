const express = require("express");
const { listTransactions } = require("../controller/transactions.controller");
const router = express.Router();
router.get("/", listTransactions);

module.exports = router;
