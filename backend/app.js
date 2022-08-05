const express = require("express");
const app = express();
require("dotenv").config();

const authRoutes = require("./routes/auth");

// Routes
app.use("/api/auth", authRoutes);

// Connexion à la db
const { sequelize } = require("./models");
sequelize
  .authenticate()
  .then(() => console.log("Connexion à la base de donnée réussie"))
  .catch((error) => console.log("Connexion à la base de donnée échouée : " + error));

// Écoute sur un port
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Le serveur a été lancé sur le port ${port}`);
});