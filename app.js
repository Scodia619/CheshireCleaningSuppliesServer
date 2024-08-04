const express = require("express");
const cors = require("cors");
const ApiRouter = require("./Routes/ApiRouter");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", ApiRouter);

module.exports = app;