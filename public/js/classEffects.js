document.addEventListener("mouseover", (e) => {
  if (
    e.target.id.startsWith("eliminate-scene") ||
    e.target.id.startsWith("eliminate-submenu")
  ) {
    e.target.classList.add("fa-beat");
  }
});

document.addEventListener("mouseout", (e) => {
  if (
    e.target.id.startsWith("eliminate-scene") ||
    e.target.id.startsWith("eliminate-submenu")
  ) {
    e.target.classList.remove("fa-beat");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".navigation li");

  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remover clase active de todos los items
      menuItems.forEach((i) => i.classList.remove("active"));

      // Agregar clase active al item clickeado
      this.classList.add("active");
    });
  });
});
