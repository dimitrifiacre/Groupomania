const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const likeRoutes = require("./routes/like");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/like", likeRoutes);
app.use("/img", express.static(path.join(__dirname, "images")));

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