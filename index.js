const app = require("./app.js");
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor corriendo en puerto 3000");
});
