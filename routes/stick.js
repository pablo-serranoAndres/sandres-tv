const express = require("express");
const router = express.Router();
const stickControllers = require("../controllers/stickControllers");

router.get("/categories", stickControllers.getAllCategories);
router.get("/images", stickControllers.getAllImages);
router.get("/project/:id", stickControllers.getProjectById);
router.get("/video", stickControllers.getVideoById);

module.exports = router;
