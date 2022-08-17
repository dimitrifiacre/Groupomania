const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.authJwt = async (req, res, next) => {
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

module.exports.checkJwt = (req, res, next) => {
  try {
    const sessionToken = req.cookies.sessionToken;
    const decodedToken = jwt.verify(sessionToken, process.env.SECRET_TOKEN);
    if (decodedToken) {
      res.status(200).json(decodedToken.userId);
      next();
    } else {
      return res.status(401).json({ error: error.message });
    }
  } catch (error) {
    res.clearCookie().status(401).json({ error: "Requête non authentifiée" });
  }
};