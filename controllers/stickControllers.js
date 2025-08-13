const fs = require("fs");
const path = require("path");

exports.getAllCategories = (req, res) => {
  const folder = path.join(__dirname, "..", "uploads", "categories.json");

  fs.access(folder, (err) => {
    if (err) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    res.sendFile(folder);
  });
};

exports.getAllImages = (req, res) => {};

exports.getProjectById = (req, res) => {
  const folder = path.join(
    __dirname,
    "..",
    "uploads",
    "json",
    `${req.params.id}.json`
  );

  fs.access(folder, (err) => {
    if (err) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    res.sendFile(folder);
  });
};

exports.getVideoById = (req, res) => {};
