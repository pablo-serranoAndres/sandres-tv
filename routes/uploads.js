const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerConfig");
const uploadControllers = require("../controllers/uploadsControllers");

router.post("/image", upload.single("file"), uploadControllers.handleFile);
router.post("/video", upload.single("file"), uploadControllers.handleFile);
router.post("/audio", upload.single("file"), uploadControllers.handleFile);
router.post("/json", upload.single("file"), uploadControllers.handleJson);

module.exports = router;
