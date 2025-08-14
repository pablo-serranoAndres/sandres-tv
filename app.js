const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const partialsRoutes = require("./routes/partials");
const uploadsRoutes = require("./routes/uploads");
const stickRoutes = require("./routes/stick");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/uploads/image",
  express.static(path.join(__dirname, "uploads", "image"))
);

app.use(express.urlencoded({ extended: true })); // Middleware para leer datos de formularios
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/new-project", (req, res) => {
  res.render("form", {
    titulo: "Nuevo proyecto",
    error: "null",
  }); // busca views/form.ejs
});

app.use("/partial", partialsRoutes);
app.use("/upload", uploadsRoutes);
app.use("/stick", stickRoutes);

module.exports = app;
