const express = require("express");
const router = express.Router();
const partialControllers = require("../controllers/partialsControllers");

router.get("/main-page", partialControllers.mainPanel);
router.get("/new-project-form", partialControllers.newProjectForm);

router.get("/project-list", partialControllers.showProjectList);
router.get(
  "/featured-projects-list",
  partialControllers.showFeaturedProjectList
);

router.get("/edit-project-form", partialControllers.editProjectForm);

router.get("/new-scene", partialControllers.newScene);
router.get("/new-submenu", partialControllers.newSubmenu);

router.get("/user-check", partialControllers.userCheck);
module.exports = router;
