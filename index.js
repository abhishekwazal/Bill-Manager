const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const connectDb = require("./config/connectDb.js");

dotenv.config();
connectDb();

const app = express();
app.use(express.json());
app.use(cors());

port = 8000 || process.env.PORT;

app.use("/api/v1/users", require("./routes/userRoutes"));

app.use("/api/v1/transaction", require("./routes/transactionRoutes"));

app.listen(port, () => {
  console.log(`app listen on ${port}`);
});
