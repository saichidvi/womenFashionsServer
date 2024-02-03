const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Material = require("./routes/Material.js");
const Cart = require("./routes/Cart.js");
const cors = require("cors");
dotenv.config();

// Create an Express.js instance
const app = express();

app.use(express.json());
app.use(cors());

//connect to the data base
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Data base connected.");
  })
  .catch((err) => {
    console.log(err);
  });

// Define a route handler for the default route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api/material", Material);
app.use("/api/cart", Cart);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
