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
