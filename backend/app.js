const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(cors());

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