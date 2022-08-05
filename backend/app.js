const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Le serveur a été lancé sur le port ${port}`);
});

module.exports = app;