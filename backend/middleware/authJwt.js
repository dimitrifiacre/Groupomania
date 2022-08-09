const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const sessionToken = req.cookies.sessionToken;
    const decodedToken = jwt.verify(sessionToken, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId };
    next();
  } catch (error) {
    res.clearCookie().status(401).json({ error: "Requête non authentifiée" });
  }
};