const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = `uploads/${file.mimetype.split("/")[0]}`;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.split(" ").join("-"));
  },
});

const upload = multer({ storage });

module.exports = upload;
