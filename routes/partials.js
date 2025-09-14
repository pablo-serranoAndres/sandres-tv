const express = require("express");
const router = express.Router();
const partialControllers = require("../controllers/partialsControllers");

router.get("/admin-page", partialControllers.mainPanel);
router.get("/new-project", partialControllers.newProjectForm);

router.get("/show-project-list/:type", partialControllers.showProjectList);

// router.get("/edit-project", partialControllers.showProjectList);
// router.get("/edit-featured", partialControllers.showProjectList);
router.delete("/delete-project", partialControllers.deleteProjectList);

router.get("/new-scene", partialControllers.newScene);
router.get("/new-submenu", partialControllers.newSubmenu);

router.get("/user-check", partialControllers.userCheck);
module.exports = router;
