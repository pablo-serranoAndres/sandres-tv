const { getAllProjectsByType } = require("../services/jsonService");
const { getCardsValues } = require("../services/mainPanelService");

exports.mainPanel = async (req, res) => {
  const cardsValues = await getCardsValues();

  const cards = [
    { title: "Proyectos", value: cardsValues.projectsCount, simbol: "" },
    { title: "Videos", value: cardsValues.videosCount, simbol: "" },
    { title: "Fotos", value: cardsValues.imagesCount, simbol: "" },
    {
      title: "Espacio empleado",
      value: cardsValues.spaceCount,
      simbol: "MB",
    },
  ];
  res.render("partials/admin-panel", { cards });
};

exports.newProjectForm = (req, res) => {
  res.render("partials/new-project-form");
};

exports.showProjectList = async (req, res) => {
  const type = req.query.type;
  console.log(type);

  const projects = await getAllProjectsByType(type);

  if (type === "featured") {
    const title = "destacados";
    res.render("partials/featured-project-list", { projects, title });
  }

  res.render("partials/project-list", { projects });
};

exports.editProjectForm = (req, res) => {
  res.render("partials/edit-project", { projects });
};
exports.featuredProjectForm = (req, res) => {
  const featuredProjects = getAllFeaturedProjects();

  res.render("partials/featured-projects", { featuredProjects });
};

exports.newScene = (req, res) => {
  const id = req.query.id;
  const name = req.query.name;

  res.render("partials/new-scene", { id, name });
};

exports.newSubmenu = (req, res) => {
  const id = req.query.id;
  const name = req.query.name;

  res.render("partials/new-submenu", { id, name });
};
