const multer = require("multer");
const { v4: uuidV4 } = require("uuid");

const MimeTypes = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

const fileFilter = (req, file, callback) => {
  if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
    callback(null, true);
  } else {
    return callback(new Error("Le format du fichier n'est pas correct"), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const randomPart = uuidV4();
    const extension = MimeTypes[file.mimetype];

    callback(null, randomPart + "-" + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage, fileFilter }).single("image_url");