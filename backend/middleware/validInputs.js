exports.validPassword = async (req, res, next) => {
  try {
    const passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{12,}$");
    if (passwordRegex.test(req.body.password)) {
      next();
    } else {
      return res.status(401).json({ error: "Le mot de passe doit contenir au moins 12 caractères dont une majuscule, une minuscule et un chiffre" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};