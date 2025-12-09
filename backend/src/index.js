const express = require("express");
const cors = require("cors");
const transactionRoutes = require("./routes/transactions.routes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("api is running");
});

app.use("/api/retail/transactions", transactionRoutes);
app.listen(PORT, () => {
  console.log(`backend on http://localhost:${PORT}`);
});
