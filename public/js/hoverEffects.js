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
