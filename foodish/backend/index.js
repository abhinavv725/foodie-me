const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT;
const mongoDB = require("./db");
var cors = require("cors");

// Middleware to use req.body is required
app.use(cors());
mongoDB();

app.get("/", (req, res) => {
  res.send("hello world");
});

// It is important if we want to use app.use middleware
app.use(express.json());
// Middleware to use routes
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api", require("./Routes/MyOrderData"));

app.listen(port, () => {
  console.log(`Backend connected at port ${port}`);
});
