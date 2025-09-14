const {
  getAllProjects,
  deleteProjectById,
} = require("../services/jsonService");
const { getCardsValues } = require("../services/mainPanelService");

const alertToChangeMessage =
  "¿Estás seguro de que quieres continuar? Asegúrate de guardar tus cambios antes de seguir.";
const alertToDeleteMessage =
  "¡Cuidado! Si borras esto, no podrás recuperarlo. ¿Seguro que quieres continuar?";

exports.userCheck = (req, res) => {
  const current = req.query.current;
  const wantedUrl = req.query.wantedUrl;
  const messageType = req.query.messageType;

  switch (messageType) {
    case "alertToChange":
      alertMessage = alertToChangeMessage;
      break;
    case "alertToDelete":
      alertMessage = alertToDeleteMessage;
      break;

    default:
      break;
  }

  res.render("partials/modal", { current, wantedUrl, alertMessage });
};

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
  const type = req.params.type;
  console.log(type);
  const projects = await getAllProjects();

  if (projects.length > 0) {
    switch (type) {
      case "edit-project":
        res.render("partials/project-list", { projects });
        break;
      case "edit-featured":
        const title = "destacados";
        res.render("partials/featured-project-list", { projects, title });
        break;
      case "delete-project":
        res.render("partials/delete-project-list", { projects });
        break;

      default:
        break;
    }
  }
};
// exports.showFeaturedProjectList = async (req, res) => {
//   const projects = await getAllProjects();

//   const title = "destacados";
//   res.render("partials/featured-project-list", { projects, title });
// };

exports.deleteProjectList = async (req, res) => {
  try {
    const idDelete = req.query.idDelete;
    deleteProjectById(idDelete);

    return res
      .status(200)
      .json({ status: "ok", message: "Proyecto eliminado" });
  } catch (error) {
    console.error(err);
    return res
      .status(500)
      .json({ status: "error", message: "Error al eliminar proyecto" });
  }
};

exports.editProjectForm = (req, res) => {
  res.render("partials/edit-project", { projects });
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
