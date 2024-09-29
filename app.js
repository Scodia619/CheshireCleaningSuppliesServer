const express = require("express");
const { customErrors, prismaErrors } = require("./errors");
const cors = require("cors");
const ApiRouter = require('./Routes/ApiRouter');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", ApiRouter);

app.use(customErrors);
app.use(prismaErrors);

module.exports = app;