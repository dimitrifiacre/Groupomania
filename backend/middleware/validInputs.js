exports.validEmail = async (req, res, next) => {
  try {
    let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");
    if (emailRegExp.test(req.body.email)) {
      next();
    } else {
      return res.status(401).json({ error: "L'adresse email n'est pas valide" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};