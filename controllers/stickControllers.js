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
// exports.getAllImages = (req, res) => {
//   const items = req.body;

//   res.attachment("images.zip");

//   const archive = archiver("zip", { zlib: { level: 9 } });
//   archive.pipe(res);

//   items.forEach((item) => {
//     const safeName = path.basename(item.src);
//     const filePath = path.join(
//       __dirname,
//       "..",
//       "uploads",
//       "image",
//       `${safeName}.jpg`
//     );
//     if (fs.existsSync(filePath)) {
//       archive.file(filePath, { name: `${safeName}.jpg` });
//     }
//   });

//   archive.finalize();
// };

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
