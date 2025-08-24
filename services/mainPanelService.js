const fs = require("fs");
const path = require("path");

async function getDirectorySize(directory) {
  const files = await fs.promises.readdir(directory, { withFileTypes: true });
  let total = 0;

  for (const file of files) {
    const fullPath = path.join(directory, file.name);
    if (file.isDirectory()) {
      total += await getDirectorySize(fullPath);
    } else {
      const stats = await fs.promises.stat(fullPath);
      total += stats.size;
    }
  }

  return total;
}
fromBytesToGygas = (bytes) => {
  return (bytes / 1024 ** 3).toFixed(2);
};

const measureStorage = () => {
  return Promise.all([
    getDirectorySize(path.join(__dirname, "..", "uploads", "image")),
    getDirectorySize(path.join(__dirname, "..", "uploads", "video")),
  ]).then(([imageSize, videoSize]) => fromBytesToGygas(imageSize + videoSize));
};

countFiles = (dir) => {
  const directory = path.join(__dirname, "..", "uploads", dir);

  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) {
        return reject(err);
      }
      resolve(files.length);
    });
  });
};

exports.getCardsValues = async () => {
  const [projectsCount, videosCount, imagesCount, spaceCount] =
    await Promise.all([
      countFiles("json"),
      countFiles("video"),
      countFiles("image"),
      measureStorage(),
    ]);

  return { projectsCount, videosCount, imagesCount, spaceCount };
};
