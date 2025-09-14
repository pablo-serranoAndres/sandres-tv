const fs = require("fs");
const path = require("path");

const getSummayJSON = async () => {
  const filePath = path.join(__dirname, "..", "uploads", `categories.json`);
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    let projects = [];

    for (let i = 0; i < jsonData.length; i++) {
      const categorieItems = jsonData[i].items;
      for (let j = 0; j < categorieItems.length; j++) {
        projects.push(categorieItems[j]);
      }
    }

    return projects;
  } catch (err) {
    console.error("Error leyendo o parseando el JSON:", err);
    return null;
  }
};

const getAllJSON = async () => {
  const filePath = path.join(__dirname, "..", "uploads", `categories.json`);
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error("Error leyendo o parseando el JSON:", error);
    return null;
  }
};

const getProjectJSONById = async (idProject) => {
  const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    "json",
    `${idProject}.json`
  );
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error("Error leyendo o parseando el JSON:", error);
    return null;
  }
};

exports.getAllProjects = async () => {
  const projects = await getSummayJSON();
  if (projects === null) {
    return [
      {
        id: "",
        title: "",
      },
    ];
  }
  return projects;
};

const eliminateContent = (name) => {
  const filePath = path.join(__dirname, "..", `${name}`);

  fs.promises
    .access(filePath)
    .then(() => {
      return fs.promises.unlink(filePath);
    })
    .then(() => {
      // console.log("Archivo eliminado correctamente");
    })
    .catch((error) => {
      if (error.code === "ENOENT") {
        // console.log("Archivo no existe, omite eliminación");
      } else {
        console.log("Error eliminando", error);
      }
    });
};

const eliminateSubmenuContent = (submenu) => {
  const scenes = submenu.scenes;
  const submenus = submenu.submenus;

  if (submenu.video != "") eliminateContent(submenu.video);
  if (submenu.image != "") eliminateContent(submenu.image);

  if (scenes.length > 0) {
    for (let i = 0; i < scenes.length; i++) {
      eliminateSceneContent(scenes[i]);
    }
  }
  if (submenus.length > 0) {
    for (let i = 0; i < submenus.length; i++) {
      eliminateSubmenuContent(submenus[i]);
    }
  }
};

const eliminateSceneContent = (scene) => {
  const video = scene.video;
  const image = scene.image;

  if (video) eliminateContent(video);
  if (image) eliminateContent(image);
};

const eliminateFromCategoriesJSON = async (idDelete, categorie) => {
  const categories = await getAllJSON();

  const categorieJSON = categories.find((cat) => cat.name === categorie);

  if (categorieJSON) {
    categorieJSON.items = categorieJSON.items.filter(
      (item) => item.id != idDelete
    );
  }

  const filePath = path.join(__dirname, "..", `uploads`, "categories.json");

  fs.writeFile(filePath, JSON.stringify(categories, null, 2), (err) => {
    if (err) {
      console.error("Error al guardar el JSON:", err);
    }
  });
};

exports.deleteProjectById = async (idDelete) => {
  const project = await getProjectJSONById(idDelete);

  const scenes = project.scenes;
  const submenus = project.submenus;

  if (project.image != "") eliminateContent(project.image);
  if (project.video != "") eliminateContent(project.video);

  for (let i = 0; i < scenes.length; i++) {
    eliminateSceneContent(scenes[i]);
  }

  if (submenus.length > 0) {
    for (let i = 0; i < submenus.length; i++) {
      eliminateSubmenuContent(submenus[i]);
    }
  }
  const jsonPath = path.join("uploads", "json", `${project.id}.json`);
  eliminateContent(jsonPath);
  eliminateFromCategoriesJSON(project.id, project.categorie);
};
