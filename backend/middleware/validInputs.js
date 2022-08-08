exports.validPassword = async (req, res, next) => {
  try {
    if (req.body.password.length >= 8) {
      next();
    } else {
      return res.status(401).json({ error: "Le mot de passe doit contenir au moins 8 caractères" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};