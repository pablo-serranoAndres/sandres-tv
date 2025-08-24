document.addEventListener("DOMContentLoaded", () => {
  const navigation = document.querySelector(".navigation");
  if (!navigation) return;

  navigation.addEventListener("click", async (e) => {
    switch (e.target.id) {
      case "admin-page":
        loadPartial("main-page");
        break;
      case "new-project":
        loadPartial("new-project-form");
        break;
      case "edit-project":
        loadPartial("project-list?type=categories");
        break;
      case "edit-featured":
        loadPartial("project-list?type=featured");
        break;

      default:
        break;
    }
  });
});

const loadPartial = async (url) => {
  const container = document.getElementById("content");
  container.innerHTML = "";

  try {
    const response = await fetch(`/partial/${url}`);
    const content = await response.text();
    container.innerHTML = content;
  } catch (err) {
    container.innerHTML = "<p>Error cargando contenido.</p>";
  }
};
