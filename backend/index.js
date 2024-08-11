const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const morgon = require("morgan");
const authrouter = require("./routes/authRoute");

//configure env
dotenv.config();

//databse config
connectDb();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgon("dev"));

//PORT
const PORT = process.env.PORT;

//routes
app.use("/api/v1/auth", authrouter);

app.get("/", (req, res) => {
  res.send("<h1>Welcome Ravi This is Ecommerce Home Page</h1>");
});

app.listen(PORT, () => {
  console.log(`this port run on ${PORT}`);
});
