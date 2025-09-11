const fs = require("fs");
const path = require("path");

const readJSON = async () => {
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

exports.getAllProjects = () => {
  const projects = readJSON();
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
