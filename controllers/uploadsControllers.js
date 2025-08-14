const fs = require("fs");
const path = require("path");

exports.getImageById = (req, res) => {
  const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    "image",
    req.params.id
  );

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error al enviar la imagen:", err);
      res.status(404).send("Imagen no encontrada");
    }
  });
};

exports.handleFile = (req, res) => {
  const file = req.file;

  if (!file) {
    return res.json({
      status: 400,
      message: "No ha llegado ningún archivo",
    });
  }
  return res.json({
    status: 200,
    message: "¡Archivo almacenado correctamente!",
    path: file.path,
  });
};

exports.handleJson = (req, res) => {
  const jsonData = req.body;
  const titleRAW = jsonData.title || "";
  const fileName = `${titleRAW.toLowerCase().split(" ").join("-")}.json`;
  const folder = path.join(__dirname, "..", "uploads", "json");
  const filePath = path.join(folder, fileName);

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error("Error al guardar el JSON:", err);
      return res
        .status(500)
        .json({ status: 500, message: "Error al guardar el archivo JSON" });
    } else {
      return res.json({ status: 200, message: "todo ok" });
    }
  });
};

exports.handleCategories = (req, res) => {
  const folder = path.join(__dirname, "..", "uploads");
  const fileName = "categories.json";
  const filePath = path.join(folder, fileName);

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  fs.writeFile(filePath, JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      console.log("Error al guardar las categorias", err);
      return res;
    } else {
      return res.json({ status: 200, message: "todo ok" });
    }
  });
};
