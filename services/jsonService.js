const fs = require("fs");
const path = require("path");

const readJSON = async (file) => {
  const filePath = path.join(__dirname, "..", "uploads", `${file}.json`);
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    let projects = [];

    if (file === "categories") {
      for (let i = 0; i < jsonData.length; i++) {
        const categorieItems = jsonData[i].items;
        for (let j = 0; j < categorieItems.length; j++) {
          projects.push(categorieItems[j]);
        }
      }
    }

    for (let i = 0; i < jsonData.length; i++) {
      projects.push(jsonData[i]);
    }

    // const projects = jsonData.flatMap((category) => category.items || []);
    return projects;
  } catch (err) {
    console.error("Error leyendo o parseando el JSON:", err);
    return null;
  }
};

exports.getAllProjectsByType = (type) => {
  const projects = readJSON(type);
  console.log(projects);
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
