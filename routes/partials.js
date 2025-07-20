const express = require("express");
const router = express.Router();
const partialControllers = require("../controllers/partialsControllers");

router.get("/new-scene", partialControllers.newScene);
router.get("/new-submenu", partialControllers.newSubmenu);

module.exports = router;
